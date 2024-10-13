import json

import json

class LaptopDatabaseDataSource:

    def saveDeffectData(self, laptopId, data, title):
        with open('core/database.txt', 'r') as file:
            fileBytes = file.read()
            dictDatabase = json.loads(fileBytes)
            try:
                deffects = dictDatabase[laptopId]["deffects"]
                jsonDeffect = json.dumps(data)
                deffects.append(jsonDeffect)
                dictDatabase[laptopId] = {
                    "title":dictDatabase[laptopId]["title"],
                    "deffects":deffects
                }
            except:
                deffects = []
                jsonDeffect = json.dumps(data)
                deffects.append(jsonDeffect)
                dictDatabase[laptopId] = {
                    "title": title,
                    "deffects": deffects
                }
            with open('core/database.txt', 'w') as outFile:
                outFile.write(json.dumps(dictDatabase))


    def getLaptopData(self, id):
        with open('core/database.txt', 'r') as file:
            fileBytes = file.read()
            dictDatabase = json.loads(fileBytes)
            laptopDatabase = dictDatabase[id]
            return laptopDatabase

