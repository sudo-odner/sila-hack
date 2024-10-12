import json

import json

class LaptopDatabaseDataSource:
    def saveLaptopData(self, id, data):
        with open('core/database.txt', 'r') as file:
            fileBytes = file.read()
            dictDatabase = json.loads(fileBytes)
            print(dictDatabase)
            laptopDatabase = dictDatabase["database"]
            preparedData = {
                "id":id,
                "data":data
            }
            jsonPreparedData = json.dumps(preparedData)
            laptopDatabase.append(jsonPreparedData)
            dictDatabase["database"] = laptopDatabase
            with open('core/database.txt', 'w') as outFile:
                outFile.write(json.dumps(dictDatabase))
