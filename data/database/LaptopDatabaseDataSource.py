import json

import json

class LaptopDatabaseDataSource:

    def saveDeffectData(self, laptopId, data):
        with open('core/database.txt', 'r') as file:
            fileBytes = file.read()
            dictDatabase = json.loads(fileBytes)
            print(dictDatabase)
            try:
                deffects = dictDatabase[laptopId]
                jsonDeffect = json.dumps(data)
                deffects.append(jsonDeffect)
                dictDatabase[laptopId] = deffects
            except:
                deffects = []
                jsonDeffect = json.dumps(data)
                deffects.append(jsonDeffect)
                dictDatabase[laptopId] = deffects

            with open('core/database.txt', 'w') as outFile:
                outFile.write(json.dumps(dictDatabase))

    # def saveLaptopData(self, id, data):
    #     with open('core/database.txt', 'r') as file:
    #         fileBytes = file.read()
    #         dictDatabase = json.loads(fileBytes)
    #         print(dictDatabase)
    #         laptopDatabase = dictDatabase["database"]
    #         preparedData = {
    #             "laptop_id":id,
    #             "data":data
    #         }
    #         jsonPreparedData = json.dumps(preparedData)
    #         laptopDatabase.append(jsonPreparedData)
    #         dictDatabase["database"] = laptopDatabase



    def getLaptopData(self, id):
        with open('core/database.txt', 'r') as file:
            fileBytes = file.read()
            dictDatabase = json.loads(fileBytes)
            laptopDatabase = dictDatabase[id]
            print(laptopDatabase)
            return laptopDatabase

