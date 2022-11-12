from tensorflow.python.keras.backend import set_session
from flask import Flask, request, jsonify, url_for, send_from_directory
import os
import shutil
import sys
from models.models import MaskRCNN
import tensorflow

app = Flask(__name__)
UPLOAD_FOLDER = "static/"
ROOT_DIR = "/server/"
sys.path.append(ROOT_DIR)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
graph = tensorflow.compat.v1.get_default_graph()
session = tensorflow.compat.v1.Session()

set_session(session)
model = MaskRCNN()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/api/segment", methods=["POST"])
def segment():
    global graph
    global session
    with graph.as_default():
        set_session(session)
        clear_static("static")
        image = request.files["image"]
        scale = request.form.get("scale")
        imgpath = os.path.join(
            app.config['UPLOAD_FOLDER'], image.filename)
        request.files["image"].save(imgpath)
        response = model.detect(imgpath, scale)

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
    """Run the Flask app."""
    app.run(port=int(os.environ.get('PORT', 8000)), debug=True)


if __name__ == "__main__":
    main()
