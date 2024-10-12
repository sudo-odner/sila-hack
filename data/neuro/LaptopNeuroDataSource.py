

class LaptopNeuroDataSource:

    def sendLaptop(self, id, callback):
        filePath = f"image_src/{id}.jpg"
        with open(filePath, 'rb') as file:
            files = {'file': (filePath, file, 'image/jpg')}
          #  response = requests.post("http://127.0.0.1:8000", files=files)
            callback(
                id,
                [
                    {
                        "cords":(10, 10, 40, 40),
                        "description":"sdfsdfsdfdsf",
                        "score":"12"
                    },
                    {
                        "cords": (10, 10, 40, 40),
                        "description": "sdfsdfsdfdsf",
                        "score": "12"
                    },
                ]
            )