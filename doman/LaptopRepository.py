import uuid
from data.media.LaptopMediaDataSource import LaptopMediaDataSource
from data.neuro.LaptopNeuroDataSource import LaptopNeuroDataSource
from data.database.LaptopDatabaseDataSource import LaptopDatabaseDataSource
from data.docs.LaptopDocsDataSource import LaptopDocsDataSource
import json

class LaptopRepository:

    # Инициализация data sources
    laptopMediaDataSource = LaptopMediaDataSource()
    laptopNeuroDataSource = LaptopNeuroDataSource()
    laptopDatabaseDataSource = LaptopDatabaseDataSource()
    laptopDocsDataSource = LaptopDocsDataSource()

    def uploadLaptopImage(self, image, title):
        generatedId = str(uuid.uuid4()).replace("-","")
        self.laptopMediaDataSource.saveImage(id=generatedId, file=image, callback=self.saveImageCallback, title=title)
        return generatedId

    #Сохраняет картинку и данные
    def saveLaptopDataCallback(self, id, data, title):

        diffects = data
        for i in range(len(diffects)):

            defId = str(uuid.uuid4()).replace("-","")

            preparedData = diffects[i]

            self.laptopMediaDataSource.cropImage(preparedData["cords"], id, defId)

            self.laptopDatabaseDataSource.saveDeffectData(id, {
                "id":defId,
                "description":preparedData["description"]
            }, title=title)

        self.laptopDatabaseDataSource.saveDeffectData(laptopId = id, data = data, title=title)

    #Делает запрос на сервер
    def saveImageCallback(self, generatedId, title):
        self.laptopNeuroDataSource.sendLaptop(generatedId, self.saveLaptopDataCallback, title)

    #Генерация docx
    def getDocxFile(self, id):
        laptopJson = self.fetchLaptopData(id)

        self.laptopDocsDataSource.createDocx(laptopJson, id)


    # Подгрузка данных только об одном ноутбуке
    def fetchLaptopData(self, id):
        return self.laptopDatabaseDataSource.getLaptopData(id)

    #Генерация pdf
    def getPdfFile(self, id):
        laptopJson = self.fetchLaptopData(id)

        self.laptopDocsDataSource.createPdf(laptopJson, id)

