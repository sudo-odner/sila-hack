
class LaptopMediaDataSource:
     def saveImage(self, id, file, callback):
        file_location = f"image_src/{id}.jpg"
        with open(file_location, "wb") as f:
          f.write(file)
          callback(id)
