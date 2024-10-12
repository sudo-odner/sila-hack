# This is a sample Python script.
import pypandoc
import urllib3
from fastapi import FastAPI, UploadFile
import os
from doman.LaptopRepository import LaptopRepository
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
from docx2pdf import convert



# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

app = FastAPI()

urllib3.disable_warnings()
origins = ["*"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"],
                   allow_headers=["*"])

laptopRepository = LaptopRepository()

UPLOAD_DIRECTORY = "uploaded_images"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@app.post("/backend/upload-image")
async def upload_image(
        file: UploadFile,
        title: str
):
    preparedFile = await file.read()
    return laptopRepository.uploadLaptopImage(preparedFile, title)


@app.get("/backend/get-laptop-info")
async def getLaptopInfo(id:str):
    return laptopRepository.fetchLaptopData(id)

@app.get("/backend/get_image")
async def getImage(id: str):
    return FileResponse(f"image_src/{id}.jpg", media_type="image/png", filename=f"{id}.jpg")

@app.get("/backend/get_docs")
async def getDocs(id: str):
    laptopRepository.getDocxFile(id)
    return FileResponse(f"docx_output/{id}.docx", media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", filename=f"{id}.docx")


@app.get("/backend/deffect_photo")
async def getDeffetPhoto(id:str):
    return FileResponse(f"out_image/{id}.jpg", media_type="image/png", filename=f"{id}.jpg")