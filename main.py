# This is a sample Python script.
from fastapi import FastAPI, UploadFile
import os
from doman.LaptopRepository import LaptopRepository


# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

app = FastAPI()

laptopRepository = LaptopRepository()

UPLOAD_DIRECTORY = "uploaded_images"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@app.post("/upload-image")
async def upload_image(file: UploadFile):
    preparedFile = await file.read()
    laptopRepository.uploadLaptopImage(preparedFile)
