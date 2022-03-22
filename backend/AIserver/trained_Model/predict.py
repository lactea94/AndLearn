import pickle
import numpy as np
import tensorflow as tf
from data import preprocess
from models.encoder import CNN_Encoder
from models.decoder import RNN_Decoder
from string import ascii_letters
from string import digits
import secrets
import time

def expect(img_url):
    # def evaluate(image):
    #     hidden = decoder.reset_state(batch_size=1)

    #     temp_input = tf.expand_dims(preprocess.load_image(image)[0], 0)
    #     img_tensor_val = image_features_extract_model(temp_input)
    #     img_tensor_val = tf.reshape(img_tensor_val, (img_tensor_val.shape[0],
    #                                                 -1,
    #                                                 img_tensor_val.shape[3]))

    #     features = encoder(img_tensor_val)
    #     dec_input = tf.expand_dims([tokenizer.word_index["<start>"]], 0)
    #     result = []

    #     for i in range(max_length):
    #         predictions, hidden, attention_weights = decoder(dec_input,
    #                                                         features,
    #                                                         hidden)

    #         predicted_id = tf.random.categorical(predictions, 1)[0][0].numpy()
    #         result.append(tokenizer.index_word[predicted_id])

    #         if tokenizer.index_word[predicted_id] == "<end>":
    #             return result

    #         dec_input = tf.expand_dims([predicted_id], 0)

    #     return result

    start = time.time()

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
    # image_url = "https://tensorflow.org/images/surf.jpg"
    image_url = img_url
    image_extension = image_url[-4:]
    string_pool = ascii_letters + digits
    image_name = ''.join(secrets.choice(string_pool) for _ in range(10))
    image_path = tf.keras.utils.get_file(image_name + image_extension, origin=image_url)

    skip = [
        'a', 'an', 'of', 'on', 'the',
        'is', 'in', 'this', 'are',
        '<end>', '<unk>', 'and', 'that',
    ]
    word_dic = dict()
    for _ in range(50):
        # result = evaluate(image_path)
        
        hidden = decoder.reset_state(batch_size=1)

        temp_input = tf.expand_dims(preprocess.load_image(image_path)[0], 0)
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

            predicted_id = tf.random.categorical(predictions, 1)[0][0].numpy()
            result.append(tokenizer.index_word[predicted_id])

            if tokenizer.index_word[predicted_id] == "<end>":
                break

            dec_input = tf.expand_dims([predicted_id], 0)

        for word in result:
            if word in skip: continue
            if not word in word_dic.keys():
                word_dic[word] = 1
            else:
                word_dic[word] += 1
    word_list = [k for k, v in word_dic.items() if v > 15]
    print("time :", time.time() - start)
    return word_list

if __name__ == "__main__":
    print(expect("https://www.tensorflow.org/tutorials/load_data/images_files/output_oV9PtjdKKWyI_0.png"))