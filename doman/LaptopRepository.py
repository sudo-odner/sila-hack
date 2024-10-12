import uuid
from data.media.LaptopMediaDataSource import LaptopMediaDataSource
from data.neuro.LaptopNeuroDataSource import LaptopNeuroDataSource
from data.database.LaptopDatabaseDataSource import LaptopDatabaseDataSource


class LaptopRepository:
    laptopMediaDataSource = LaptopMediaDataSource()
    laptopNeuroDataSource = LaptopNeuroDataSource()
    laptopDatabaseDataSource = LaptopDatabaseDataSource()


    def uploadLaptopImage(self, image):
        generatedId = str(uuid.uuid4())
        self.laptopMediaDataSource.saveImage(id=generatedId, file=image, callback=self.saveImageCallback)

    def saveLaptopDataCallback(self, id, data):
        self.laptopDatabaseDataSource.saveLaptopData(id = id, data = data)
        print(data)

    def saveImageCallback(self, generatedId):
        self.laptopNeuroDataSource.sendLaptop(generatedId, self.saveLaptopDataCallback)


    def fetchLaptopData(self, id):
        return self.laptopDatabaseDataSource.getLaptopData(id)
