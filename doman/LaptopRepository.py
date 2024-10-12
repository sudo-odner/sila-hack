import uuid
from data.media.LaptopMediaDataSource import LaptopMediaDataSource
from data.neuro.LaptopNeuroDataSource import LaptopNeuroDataSource
from data.database.LaptopDatabaseDataSource import LaptopDatabaseDataSource
from data.docs.LaptopDocsDataSource import LaptopDocsDataSource
import json

class LaptopRepository:
    laptopMediaDataSource = LaptopMediaDataSource()
    laptopNeuroDataSource = LaptopNeuroDataSource()
    laptopDatabaseDataSource = LaptopDatabaseDataSource()
    laptopDocsDataSource = LaptopDocsDataSource()

    def uploadLaptopImage(self, image, title):
        generatedId = str(uuid.uuid4()).replace("-","")
        self.laptopMediaDataSource.saveImage(id=title, file=image, callback=self.saveImageCallback)
        return title

    def saveLaptopDataCallback(self, id, data):

        diffects = data
        for i in range(len(diffects)):

            defId = str(uuid.uuid4()).replace("-","")

            preparedData = diffects[i]

            self.laptopMediaDataSource.cropImage(preparedData["cords"], id, defId)

            self.laptopDatabaseDataSource.saveDeffectData(id, {
                "id":defId,
                "description":preparedData["description"]
            })

        self.laptopDatabaseDataSource.saveDeffectData(laptopId = id, data = data)
        print(data)

    def saveImageCallback(self, generatedId):
        self.laptopNeuroDataSource.sendLaptop(generatedId, self.saveLaptopDataCallback)

    def getDocxFile(self, id):
        laptopJson = self.fetchLaptopData(id)
        preparedItem = json.loads(laptopJson)
        self.laptopDocsDataSource.createDocx(preparedItem, id)

    def fetchLaptopData(self, id):
        return self.laptopDatabaseDataSource.getLaptopData(id)


