import tensorflow as tf
import collections
import random
import json

# 이미지 및 캡션 경로 호출
def get_path_caption(config):
    return config.PATH, config.annotation_file


# 훈련 세트 크기 제한
def limit_train_set(PATH, annotation_file):
    with open(annotation_file, "r") as f:
        captions = json.load(f)

    # Group all captions together having the same image ID.
    image_path_to_caption = collections.defaultdict(list)
    for val in captions["annotations"]:
        caption = f"<start> {val['caption']} <end>"
        image_path = PATH + "%012d.jpg" % (val["image_id"])
        image_path_to_caption[image_path].append(caption)

    image_paths = list(image_path_to_caption.keys())
    random.shuffle(image_paths)

    train_image_paths = image_paths[:20] # 여기 고치면 됨

    train_captions = []
    img_name_vector = []

    for image_path in train_image_paths:
        caption_list = image_path_to_caption[image_path]
        train_captions.extend(caption_list)
        img_name_vector.extend([image_path] * len(caption_list))

    # print(train_captions[0])
    # Image.open(img_name_vector[0]).show()

    return train_captions, img_name_vector


# InceptionV3로 이미지 전처리
def load_image(image_path):
    img = tf.io.read_file(image_path)
    img = tf.image.decode_jpeg(img, channels=3)
    img = tf.image.resize(img, (299, 299))
    img = tf.keras.applications.inception_resnet_v2.preprocess_input(img)
    
    return img, image_path


# InceptionV3 초기화 및 Imagenet 가중치 로드
def initialize_and_load_weights():
    image_model = tf.keras.applications.InceptionResNetV2(include_top=False, weights="imagenet")

    new_input = image_model.input
    hidden_layer = image_model.layers[-1].output

    image_features_extract_model = tf.keras.Model(new_input, hidden_layer)
    
    return image_features_extract_model


# 캡션 전처리 및 토큰화하기
def tokenize_captions(top_k, train_captions):
    tokenizer = tf.keras.preprocessing.text.Tokenizer(num_words=top_k,
                                                    oov_token="<unk>",
                                                    filters='!"#$%&()*+.,-/:;=?@[\]^_`{|}~')
    tokenizer.fit_on_texts(train_captions)

    tokenizer.word_index["<pad>"] = 0
    tokenizer.index_word[0] = "<pad>"

    # Create the tokenized vectors
    train_seqs = tokenizer.texts_to_sequences(train_captions)

    # Pad each vector to the max_length of the captions
    # If you do not provide a max_length value, pad_sequences calculates it automatically
    cap_vector = tf.keras.preprocessing.sequence.pad_sequences(train_seqs, padding="post")

    # Calculates the max_length, which is used to store the attention weights
    max_length = max(len(t) for t in train_seqs)

    return tokenizer, cap_vector, max_length

