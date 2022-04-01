import pickle
import tensorflow as tf
from trained_Model.data import preprocess
from trained_Model.models.encoder import CNN_Encoder
from trained_Model.models.decoder import RNN_Decoder
import time
import uuid

def expect(img_url):
    start = time.time()

    # parmas_src = './datasets/params.pkl'
    parmas_src = './trained_Model/datasets/params.pkl'
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

    # checkpoint_path = "./checkpoints/train"
    checkpoint_path = "./trained_Model/checkpoints/train"
    ckpt_manager = tf.train.CheckpointManager(ckpt, checkpoint_path, max_to_keep=5)

    ckpt.restore(ckpt_manager.latest_checkpoint)
    encoder = ckpt.encoder
    decoder = ckpt.decoder


    # pickle_src = "./datasets/tokenizer.pkl"
    pickle_src = "./trained_Model/datasets/tokenizer.pkl"
    with open(pickle_src, "rb") as f:
        tokenizer = pickle.load(f)

    image_features_extract_model = preprocess.initialize_and_load_weights()


    # 원격 파일
    # image_url = "https://tensorflow.org/images/surf.jpg"
    image_url = img_url
    image_extension = image_url[-4:]
    image_name = str(uuid.uuid1())
    image_path = tf.keras.utils.get_file(image_name + image_extension, origin=image_url)

    skip = [
        'a', 'an', 'of', 'on', 'the', 'at', 'by', 'for',
        'is', 'in', 'this', 'are', 'with', 'over',
        'and', 'that', 'to', 'these', 'those',
        '<end>', '<unk>'
    ]
    word_dic = dict()
    for _ in range(50):
       
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
            predictions, hidden = decoder(dec_input, features, hidden)

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
