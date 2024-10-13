import os
import uuid
import aiofiles
from ultralytics import YOLO
from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.post("/ml/upload-image/")
async def create_upload_file(file: UploadFile):
    # Логируем начало загрузки видео
    print("Start upload-image handler")
    imageUUID = uuid.uuid4()
    absPath = os.path.abspath("")
    fileType = file.filename.split(".")[-1]
    pathDict = f"{absPath}/transportImage"
    pathImage = f"{pathDict}/{imageUUID}.{fileType}"

    # Создаем директорию, если она не существует
    if not os.path.exists(pathDict):
        os.makedirs(pathDict)

    # Асинхронно открываем файл для записи
    async with aiofiles.open(pathImage, 'wb') as f:
        # Читаем контент файла асинхронно
        content = await file.read()
        # Записываем контент файла асинхронно
        await f.write(content)

    model = YOLO('model/v3.pt')
    titlePredictV1 = ['Adhesive-residue', 'Adhesive-residue-with-sticker', 'Damaged screen', 'Scratch', 'button-is-missing']
    titlePredictV2 = ['broken_button', 'broken_pixel', 'chip', 'disassembled_laptop', 'lock', 'missing_button', 'missing_screw', 'scratch']
    titlePredictV3 = ['Сломанная кнопка ', 'Битый пиксель', 'Скол', 'Отсутствие задней крышки', 'Замок', 'Отсутствие клавиши', 'Отсутствие болтика', 'Царапины']

    results = model.predict(pathImage, imgsz=640, conf=0.25, iou=0.45)
    json_result: list[dict] = list()

    # Process results list
    for result in results:
        for data in result.boxes.data:
            cords = (int(data[0].item()), int(data[1].item()), int(data[2].item()), int(data[3].item()))
            info = titlePredictV3[int(data[5].item())]
            score = data[4].item()
            json_data = dict()
            json_data["cords"] = cords
            json_data["description"] = info
            json_data["score"] = score
            json_result.append(json_data)

    if os.path.exists(pathImage):
        os.remove(pathImage)

    print("End upload-image handler")
    return {"status": 1, "data": json_result}
