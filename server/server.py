from tensorflow.python.keras.backend import set_session
from flask import Flask, request, jsonify, url_for, send_from_directory
import os
import shutil
import sys
from models.models import MaskRCNN
from models.models import TypeClassifier
import tensorflow
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "static/"
ROOT_DIR = "/server/"
sys.path.append(ROOT_DIR)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
graph = tensorflow.compat.v1.get_default_graph()
session = tensorflow.compat.v1.Session()

set_session(session)
mrcnn = MaskRCNN()
classifier = TypeClassifier()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/api/segment", methods=["POST"])
@cross_origin()
def segment():
    global graph
    global session
    with graph.as_default():
        set_session(session)
        clear_static("static")
        image = request.files["image"]
        scale = request.form.get("scale")

        imgpath = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        request.files["image"].save(imgpath)

        cropped_images, response = mrcnn.detect(imgpath, scale)

        classes = [classifier.infer_type(image) for image in cropped_images]
        for index, image in enumerate(response["cropped"]):
            response["cropped"][index]["type"] = classes[index]

    return jsonify(response)


def clear_static(path):
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                clear_static(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))


def main():
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get('PORT', 5000)),
        debug=os.environ.get('DEBUG') == 1
    )


if __name__ == "__main__":
    main()
