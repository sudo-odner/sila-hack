from docx import Document
from docx.shared import Inches

class LaptopDocsDataSource:

    def createDocx(self, data, id):
        doc = Document()
        print(data)
        doc.add_heading(f"Протокол #{id}", level=1)

        # Добавляем описание (description)
        doc.add_paragraph('12.02.2005')

        doc.add_heading(f"Описание", level=2)

        doc.add_paragraph(f'Дефекты: {len(data["deffects"])}')
        print(data["deffects"][0])
        for i in range(len(data["deffects"])):
            doc.add_heading(f"Дефект{i+1}: Описание", level=3)
            print("$$$$$$$$$")
            print(data["deffects"])
            item = data["deffects"][0]
            print("############")
            print(item)
            doc.add_paragraph(item["description"])

        # Добавляем изображение
        image_path = f'image_src/{id}.jpg'  # путь к вашему изображению
        doc.add_picture(image_path, width=Inches(4.0))
        doc.save(f'docx_output/{id}.docx')