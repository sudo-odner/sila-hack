import requests

class LaptopNeuroDataSource:

    #Запрос на сервер
    def sendLaptop(self, id, callback, title):
        filePath = f"image_src/{id}.jpg"
        with open(filePath, 'rb') as file:
            files = {'file': (filePath, file, 'image/jpg')}
            response = requests.post("http://213.173.108.217:10989/ml/upload-image/", files=files)
            callback(
                id,
                response.json()["data"],
                title
            )