# Sila-Hack (ml-service)

Проект включает микросервис для обработки изображений с использованием YOLO для распознавания объектов, их классификации и дополнительной верификации с использованием Random Forest.

## Структура проекта

### 1. `data/`
Директория для хранения данных, используемых для обучения и тестирования моделей. Добавлени в .gitignore

### 2. `model/`
Содержит версии моделей, начиная с первой и до текущей третьей версии. Модели обновляются по мере прогресса обучения.

### 3. `runs/`
Папка, где сохраняются все запуски обучения YOLO, включая результаты и логи.

### 4. `transportImage/`
Папка для временного хранения изображений, которые проходят обработку перед классификацией.

### 5. Основные файлы

- `service.py`: Микросервис, который принимает на вход изображение и возвращает массив с координатами вырезанных областей, а также с их классификацией и вероятностью.

- `yolo.ipynb`: Jupyter notebook с кодом для обучения YOLO на предоставленных данных.

- `checkYolo.ipynb`: Модуль для дополнительной проверки ответа YOLO с использованием модели Random Forest. Включает код для обучения и тестирования модели.

- `yolo11n.pt`: Файл с моделью YOLO 11-й версии, которая используется для предсказаний в текущем микросервисе.

### 6. Дополнительные файлы

- `.gitignore`: Список файлов и директорий, которые не должны быть добавлены в систему контроля версий Git.

- `requirements.txt`: Файл с зависимостями проекта. Для установки всех необходимых библиотек выполните:
  ```bash
  pip install -r requirements.tx
  ```
  Для запуска сервера:
  ```bash
  uvicorn service:app --host 0.0.0.0 --port 8000
  ```
