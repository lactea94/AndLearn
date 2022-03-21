import argparse

parser = argparse.ArgumentParser()

parser.add_argument("--PATH", type=str, default="./datasets/images/")
parser.add_argument("--annotation_file", type=str, default="./datasets/captions.json")
config = parser.parse_args()
