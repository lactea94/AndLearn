import tensorflow as tf
import shutil
import os


# Download image files
image_folder = "/images/"
if not os.path.exists(os.path.abspath(".") + image_folder):
  image_zip = tf.keras.utils.get_file("train2017.zip",
                                      cache_subdir=os.path.abspath("."),
                                      origin="http://images.cocodataset.org/zips/train2017.zip",
                                      extract=True)
  os.remove(image_zip)
  shutil.move("./train2017", "./datasets/images")