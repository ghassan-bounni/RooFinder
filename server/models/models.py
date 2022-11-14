# Import Mask RCNN
from models.mrcnn.config import Config
from models.mrcnn import utils
import models.mrcnn.model as modellib
from models.mrcnn import visualize
from models.mrcnn.model import log
from tensorflow.keras.models import load_model
import numpy as np
import skimage
import os
import cv2


class MrcnnConfig(Config):

    NAME = "Roof_Segmentation"

    NUM_CLASSES = 2  # background + 1 class

    GPU_COUNT = 1
    IMAGES_PER_GPU = 1

    IMAGE_MAX_DIM = 512
    IMAGE_MIN_DIM = 512

    DETECTION_MIN_CONFIDENCE = 0.85
    USE_MINI_MASK = False


class MaskRCNN:

    def __init__(self):
        self.inference_config = MrcnnConfig()
        self.model = modellib.MaskRCNN(
            mode='inference', config=self.inference_config, model_dir="models\logs")
        self.model.load_weights("models/mask_rcnn.h5", by_name=True)
        self.model.keras_model._make_predict_function()

    def detect(self, imgpath, scale):

        image, shape = self.load_img(imgpath)

        r = self.model.detect([image])[0]

        if not np.any(r["masks"]):
            return imgpath.split("/")[-1]

        imgpath = "/".join(imgpath.split("/")[:-1])+"/masked_" + \
            imgpath.split("/")[-1]

        cropped_images, data = self.crop_image(image, imgpath, r, shape, scale)

        image = self.apply_masks(image, r["masks"])
        skimage.io.imsave(imgpath, image)

        for index, img in enumerate(data):
            skimage.io.imsave(img["path"], cropped_images[index])
        return cropped_images, {
            "masked_img": imgpath,
            "cropped":  data
        }

    def load_img(self, imgpath):

        image = skimage.io.imread(imgpath)
        shape = image.shape
        # If grayscale. Convert to RGB for consistency.
        if image.ndim != 3:
            image = skimage.color.gray2rgb(image)
         # If has an alpha channel, remove it for consistency
        if image.shape[-1] == 4:
            image = image[..., :3]

        image = self.resize_img(image)

        return image, shape

    def resize_img(self, img, shape=(512, 512)):
        # rescale the image
        resized_image = skimage.transform.resize(
            img.astype(np.uint8), shape, anti_aliasing=True)
        rescaled_image = 255*resized_image
        image = rescaled_image.astype(np.uint8)
        return image

    def apply_masks(self, image, masks):
        N = masks.shape[-1]
        masked_image = image.copy()

        for i in range(N):
            mask = masks[:, :, i]
            masked_image = visualize.apply_mask(
                masked_image, mask, color=(.02, .84, .84))

        return masked_image

    def crop_image(self, image, path, r, shape, scale):
        path, _ = os.path.splitext(path)
        filename = path.split("/")[-1]
        data = []
        images = []
        for index, roi in enumerate(r['rois']):
            roi_cropped = self.crop(image, roi)
            mask_cropped = self.crop(r['masks'], roi)
            area = self.calculate_area(mask_cropped, scale, shape)
            images.append(roi_cropped)
            data.append({
                "name": filename+"_"+str(index),
                "area": area,
                "path": "static/cropped/"+filename+"_"+str(index)+".png"
            })
        return images, data

    def crop(self, image, roi):
        roi_cropped = image[int(roi[0]):int(
            roi[2]), int(roi[1]):int(roi[3])]
        return roi_cropped

    def calculate_area(self, mask, scale, shape):
        scale = float(scale) * (shape[0] / 512)
        area = int(np.sum(mask) * scale)
        return area


class TypeClassifier:
    def __init__(self):
        self.model = load_model("models/classifier.h5")

    def infer_type(self, image):
        resized = cv2.resize(image, (224, 224), interpolation=cv2.INTER_AREA)
        result = self.model.predict([[resized]], steps=1)[0]
        prediction = np.argmax(result, axis=-1)
        types = ["Brick", "Concrete", "Steel"]
        prediction = types[prediction]
        return prediction
