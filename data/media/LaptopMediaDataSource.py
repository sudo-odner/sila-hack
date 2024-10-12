from PIL import Image

class LaptopMediaDataSource:
     def saveImage(self, id, file, callback, title):
        file_location = f"image_src/{id}.jpg"
        with open(file_location, "wb") as f:
          f.write(file)
          callback(id, title)

     def cropImage(self, cropParams, id, outId):
         image = Image.open(f'image_src/{id}.jpg')
         crop_area = (cropParams[0], cropParams[1], cropParams[2], cropParams[3])
         cropped_image = image.crop(crop_area)
         cropped_image.save(f'out_image/{outId}.jpg')