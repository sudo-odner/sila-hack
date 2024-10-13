<h1 align="center">Сила backend</h1>

## Tech stack
- Python
- FastAPI

## How to start
- uvicorn main:app --reload


## Architecture
Архитектура приложения на FastAPI с применением принципов чистой архитектуры предполагает разделение на несколько слоев: Data Source, Data, Domain и Presentation. Рассмотрим каждый из этих слоев подробнее в контексте описанной задачи — загрузка фотографии с фронтенда, получение метаданных через микросервис и сохранение всех данных в базу данных.
### Presentation
Этот слой отвечает за взаимодействие с пользователем (в нашем случае — с фронтендом) и обеспечивает внешнее API для приложения. Здесь находится FastAPI-эндпоинт, который принимает запросы на загрузку фотографии и отправляет ответы клиенту.
### Domain
Это слой, где содержится основная бизнес-логика приложения. Domain Layer не знает, каким образом данные сохраняются или откуда они поступают — он работает с абстракциями и интерфейсами, предоставленными другими слоями.
### Data
Data Layer отвечает за реализацию интерфейсов, предоставляемых Domain Layer, для работы с данными. Этот слой знает, как сохранять и извлекать данные из различных источников — будь то база данных, файловая система или внешние API.
### Data Source
Этот слой отвечает за физическое хранение данных и взаимодействие с внешними системами. Здесь находятся:
- Механизмы для работы с базой данных, которая хранит информацию о загруженных фотографиях и связанных с ними метаданных.
- Механизмы для работы с внешним микросервисом, который предоставляет информацию о загруженном изображении (например, анализирует фотографию на предмет распознавания объектов или генерирует метаданные).
- Механизмы для работы с файловой системой или облачными хранилищами

## Взаимодействие между слоями:
- Пользователь (фронтенд) отправляет POST-запрос на загрузку фотографии.
- Presentation Layer (FastAPI-эндпоинт) принимает запрос и файл, передает его в Domain Layer.
- В Domain Layer проверяются базовые требования к файлу (например, размер и формат), затем выполняется запрос к микросервису через Data Layer для получения метаданных.
- После получения метаданных Domain Layer передает информацию в Data Layer, который отвечает за сохранение данных в базу данных и, возможно, загрузку файла в файловую систему.
- Presentation Layer отправляет ответ клиенту о результате операции.

![CleanArchitecture](https://github.com/user-attachments/assets/18f877bc-d715-4b2f-b726-7bd932d3334a)
