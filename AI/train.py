import collections
import random
import tensorflow as tf
import matplotlib.pyplot as plt
import time
import numpy as np
import pickle

from tqdm import tqdm
from config import config

from models.decoder import RNN_Decoder
from models.encoder import CNN_Encoder
from data import preprocess
from utils import utils

# config 저장
utils.save_config()

# 변수값 설정
top_k = 5000
BATCH_SIZE = 64
BUFFER_SIZE = 1000
embedding_dim = 256
units = 512
vocab_size = top_k + 1
features_shape = 2048
attention_features_shape = 64
EPOCHS = 20

# 이미지 및 캡션 경로 호출
PATH, annotation_file = preprocess.get_path_caption(config)

# 훈련 세트 크기 제한
train_captions, img_name_vector = preprocess.limit_train_set(PATH, annotation_file)

# InceptionV3 초기화 및 Imagenet 가중치 로드
image_features_extract_model = preprocess.initialize_and_load_weights()

# 캡션 전처리 및 토큰화하기
tokenizer, cap_vector, max_length = preprocess.tokenize_captions(top_k, train_captions)

# 토크나이저 저장
pickle_src = "./datasets/tokenizer.pkl"
with open(pickle_src, "wb") as f:
  pickle.dump(tokenizer, f)

# 변수 외부 저장
params = {
  "top_k": top_k,
  "BATCH_SIZE": BATCH_SIZE,
  "BUFFER_SIZE": BUFFER_SIZE,
  "embedding_dim": embedding_dim,
  "units": units,
  "vocab_size": vocab_size,
  "features_shape": features_shape,
  "attention_features_shape": attention_features_shape,
  "EPOCHS": EPOCHS,
  "max_length": max_length
}

params_src = "./datasets/params.pkl"
with open(params_src, "wb") as f:
  pickle.dump(params, f)


# InceptionV3에서 추출된 특성 캐시하기
# Get unique images
encode_train = sorted(set(img_name_vector))

# Feel free to change batch_size according to your system configuration
image_dataset = tf.data.Dataset.from_tensor_slices(encode_train)
image_dataset = image_dataset.map(
  preprocess.load_image, num_parallel_calls=tf.data.AUTOTUNE).batch(16)

for img, path in tqdm(image_dataset):
  batch_features = image_features_extract_model(img)
  batch_features = tf.reshape(batch_features,
                              (batch_features.shape[0], -1, batch_features.shape[3]))

  for bf, p in zip(batch_features, path):
    path_of_feature = p.numpy().decode("utf-8")
    np.save(path_of_feature, bf.numpy())

##############################

# 데이터를 훈련 및 테스트로 분할하기
img_to_cap_vector = collections.defaultdict(list)
for img, cap in zip(img_name_vector, cap_vector):
  img_to_cap_vector[img].append(cap)

# Create training and validation sets using an 80-20 split randomly.
img_keys = list(img_to_cap_vector.keys())
random.shuffle(img_keys)

slice_index = int(len(img_keys)*0.8)
img_name_train_keys, img_name_val_keys = img_keys[:slice_index], img_keys[slice_index:]

img_name_train = []
cap_train = []
for imgt in img_name_train_keys:
  capt_len = len(img_to_cap_vector[imgt])
  img_name_train.extend([imgt] * capt_len)
  cap_train.extend(img_to_cap_vector[imgt])

img_name_val = []
cap_val = []
for imgv in img_name_val_keys:
  capv_len = len(img_to_cap_vector[imgv])
  img_name_val.extend([imgv] * capv_len)
  cap_val.extend(img_to_cap_vector[imgv])

print(len(img_name_train), len(cap_train), len(img_name_val), len(cap_val))

# 훈련을 위한 tf.data 데이터세트 생성하기
num_steps = len(img_name_train) // BATCH_SIZE

# Load the numpy files
def map_func(img_name, cap):
  img_tensor = np.load(img_name.decode("utf-8")+".npy")
  return img_tensor, cap

dataset = tf.data.Dataset.from_tensor_slices((img_name_train, cap_train))

# Use map to load the numpy files in parallel
dataset = dataset.map(lambda item1, item2: tf.numpy_function(
          map_func, [item1, item2], [tf.float32, tf.int32]),
          num_parallel_calls=tf.data.AUTOTUNE)

# Shuffle and batch
dataset = dataset.shuffle(BUFFER_SIZE).batch(BATCH_SIZE)
dataset = dataset.prefetch(buffer_size=tf.data.AUTOTUNE)

encoder = CNN_Encoder(embedding_dim)
decoder = RNN_Decoder(embedding_dim, units, vocab_size)

optimizer = tf.keras.optimizers.Adam()
loss_object = tf.keras.losses.SparseCategoricalCrossentropy(
    from_logits=True, reduction="none")


def loss_function(real, pred):
  mask = tf.math.logical_not(tf.math.equal(real, 0))
  loss_ = loss_object(real, pred)

  mask = tf.cast(mask, dtype=loss_.dtype)
  loss_ *= mask

  return tf.reduce_mean(loss_)

# 체크포인트
checkpoint_path = "./checkpoints/train"
ckpt = tf.train.Checkpoint(encoder=encoder,
                           decoder=decoder,
                           optimizer=optimizer)
ckpt_manager = tf.train.CheckpointManager(ckpt, checkpoint_path, max_to_keep=5)

start_epoch = 0
if ckpt_manager.latest_checkpoint:
  start_epoch = int(ckpt_manager.latest_checkpoint.split("-")[-1])
  # restoring the latest checkpoint in checkpoint_path
  ckpt.restore(ckpt_manager.latest_checkpoint)


# 훈련하기
# adding this in a separate cell because if you run the training cell
# many times, the loss_plot array will be reset
loss_plot = []

@tf.function
def train_step(img_tensor, target):
  loss = 0

  # initializing the hidden state for each batch
  # because the captions are not related from image to image
  hidden = decoder.reset_state(batch_size=target.shape[0])

  dec_input = tf.expand_dims([tokenizer.word_index["<start>"]] * target.shape[0], 1)

  with tf.GradientTape() as tape:
      features = encoder(img_tensor)

      for i in range(1, target.shape[1]):
          # passing the features through the decoder
          predictions, hidden, _ = decoder(dec_input, features, hidden)

          loss += loss_function(target[:, i], predictions)

          # using teacher forcing
          dec_input = tf.expand_dims(target[:, i], 1)

  total_loss = (loss / int(target.shape[1]))

  trainable_variables = encoder.trainable_variables + decoder.trainable_variables

  gradients = tape.gradient(loss, trainable_variables)

  optimizer.apply_gradients(zip(gradients, trainable_variables))

  return loss, total_loss


for epoch in range(start_epoch, EPOCHS):
    start = time.time()
    total_loss = 0

    for (batch, (img_tensor, target)) in enumerate(dataset):
        batch_loss, t_loss = train_step(img_tensor, target)
        total_loss += t_loss

        if batch % 100 == 0:
            average_batch_loss = batch_loss.numpy()/int(target.shape[1])
            print(f"Epoch {epoch+1} Batch {batch } Loss {average_batch_loss:.4f}")
    # storing the epoch end loss value to plot later
    loss_plot.append(total_loss / num_steps)

    if epoch % 5 == 0:
      ckpt_manager.save()

    print(f"Epoch {epoch+1} Loss {total_loss/num_steps:.6f}")
    print(f"Time taken for 1 epoch {time.time()-start:.2f} sec\n")

plt.plot(loss_plot)
plt.xlabel("Epochs")
plt.ylabel("Loss")
plt.title("Loss Plot")
plt.show()
