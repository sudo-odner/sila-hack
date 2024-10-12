from docx import Document
from docx.shared import Inches

class LaptopDocsDataSource:

    def createDocx(self, data, id):
        doc = Document()
        print(data)
        doc.add_heading(data["data"]["title"], level=1)

        # Добавляем описание (description)
        doc.add_paragraph(data["data"]["description"])

        # Добавляем изображение
        image_path = f'image_src/{id}.jpg'  # путь к вашему изображению
        doc.add_picture(image_path, width=Inches(4.0))
        doc.save(f'docx_output/{id}.docx')
