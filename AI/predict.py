import pickle
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from data import preprocess
from PIL import Image
from models.encoder import CNN_Encoder
from models.decoder import RNN_Decoder
from string import ascii_letters
from string import digits
import secrets

def evaluate(image):
    attention_plot = np.zeros((max_length, attention_features_shape))

    hidden = decoder.reset_state(batch_size=1)

    temp_input = tf.expand_dims(preprocess.load_image(image)[0], 0)
    img_tensor_val = image_features_extract_model(temp_input)
    img_tensor_val = tf.reshape(img_tensor_val, (img_tensor_val.shape[0],
                                                 -1,
                                                 img_tensor_val.shape[3]))

    features = encoder(img_tensor_val)

    dec_input = tf.expand_dims([tokenizer.word_index["<start>"]], 0)
    result = []

    for i in range(max_length):
        predictions, hidden, attention_weights = decoder(dec_input,
                                                         features,
                                                         hidden)

        attention_plot[i] = tf.reshape(attention_weights, (-1, )).numpy()

        predicted_id = tf.random.categorical(predictions, 1)[0][0].numpy()
        result.append(tokenizer.index_word[predicted_id])

        if tokenizer.index_word[predicted_id] == "<end>":
            return result, attention_plot

        dec_input = tf.expand_dims([predicted_id], 0)

    attention_plot = attention_plot[:len(result), :]
    return result, attention_plot

def plot_attention(image, result, attention_plot):
    temp_image = np.array(Image.open(image))

    fig = plt.figure(figsize=(10, 10))

    len_result = len(result)
    for i in range(len_result):
        temp_att = np.resize(attention_plot[i], (8, 8))
        grid_size = max(int(np.ceil(len_result/2)), 2)
        ax = fig.add_subplot(grid_size, grid_size, i+1)
        ax.set_title(result[i])
        img = ax.imshow(temp_image)
        ax.imshow(temp_att, cmap="gray", alpha=0.6, extent=img.get_extent())

    plt.tight_layout()
    plt.show()


parmas_src = './datasets/params.pkl'
with open(parmas_src, "rb") as f:
    params = pickle.load(f)
embedding_dim = params["embedding_dim"]
units = params["units"]
vocab_size = params["vocab_size"]
max_length = params["max_length"]
attention_features_shape = params["attention_features_shape"]

initial_encoder = CNN_Encoder(embedding_dim)
initial_decoder = RNN_Decoder(embedding_dim, units, vocab_size)
optimizer = tf.keras.optimizers.Adam()

ckpt = tf.train.Checkpoint(encoder=initial_encoder,
                        decoder=initial_decoder,
                        optimizer=optimizer)

checkpoint_path = "./checkpoints/train"
ckpt_manager = tf.train.CheckpointManager(ckpt, checkpoint_path, max_to_keep=5)

ckpt.restore(ckpt_manager.latest_checkpoint)
encoder = ckpt.encoder
decoder = ckpt.decoder


pickle_src = "./datasets/tokenizer.pkl"
with open(pickle_src, "rb") as f:
    tokenizer = pickle.load(f)

image_features_extract_model = preprocess.initialize_and_load_weights()


# 원격 파일
image_url = "https://www.tensorflow.org/tutorials/load_data/images_files/output_oV9PtjdKKWyI_0.png"
image_extension = image_url[-4:]
string_pool = ascii_letters + digits
image_name = ''.join(secrets.choice(string_pool) for i in range(10))
image_path = tf.keras.utils.get_file(image_name + image_extension, origin=image_url)

result, attention_plot = evaluate(image_path)
print("Prediction Caption:", " ".join(result))
plot_attention(image_path, result, attention_plot)
# opening the image
# image = Image.open(image_path)
# image.show()

# 로컬 저장 파일
# local_image_path = ".\\test.jpg"

# result, attention_plot = evaluate(local_image_path)
# print('Prediction Caption:', ' '.join(result))
# plot_attention(local_image_path, result, attention_plot)
