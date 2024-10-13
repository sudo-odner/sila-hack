<img width="100%" alt="image" src="https://github.com/user-attachments/assets/f8650d61-b505-4eea-b03c-23e05a5262c1">

# Описание сайта

Приложение разработано при помощи [Create React App](https://github.com/facebook/create-react-app).

### Деплой

Сайт размещен здесь: [http://213.173.108.217:10991](http://213.173.108.217:10991)

## Как развернуть приложение:

### `npm install`
Загрузка необходимых модулей для работы приложения.

### `npm start`

Запуск приложения в development моде.\
Откройте [http://localhost:3000](http://localhost:3000) чтобы увидеть в браузере.

Страница обновляется при изменениях.\
Могут появится логи недочетов в консоли.


## Архитектура приложения
&nbsp;. \
└── public \
&emsp;&emsp;&emsp;├── index.html \
&emsp;&emsp;&emsp;├── logo.png \
&emsp;&emsp;&emsp;├── manifest.json \
└── src \
&emsp;&emsp;&emsp;&ensp;// компоненты и вьюшки \
&emsp;&emsp;&emsp;└── components \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├── CleanView.js  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├── CreateView.js \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; // Вьюшка для изменения данных снимка \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├──  EditLectureView.js \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; // Иконка файла для загрузки \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├──  FileIcon.js \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; // Загрузка снимка \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├──  FileUI.js \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; // Вьюшка деффектов снимка с возможностью пожаловаться на ошибку  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; и отправить на доработку нейронке \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├──  GlosView.js \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; // Шапка сайта \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├──  Header.js \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; // Элемент списка снимков на боковой панели \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├──  LectureElement.js \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; // Боковая панель с снимками и поиском/фильтрами \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├──  Lectures.js \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; // Загрузка снимков с серийным номером \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├──  LectureUpload.js \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; // Вьюшка загруженного снимка с возможностью просмотром деффектов, \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; изменения серийного номера и удаления снимка \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├──  LectureView.js \
&emsp;&emsp;&emsp; // Папка с используемыми шрифтами \
&emsp;&emsp;&emsp;└──  font  \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; ├── etc .. \
&emsp;&emsp;&emsp;&ensp;// SVG иконки \
&emsp;&emsp;&emsp;└──   icons \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; ├── etc .. \
&emsp;&emsp;&emsp;&ensp;// SCSS файлы для стилизации \
&emsp;&emsp;&emsp;└──   styles  \
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; ├── etc .. \
&emsp;&emsp;&emsp;&ensp;// приложение  
&emsp;&emsp;&emsp;├──  App.js \
&emsp;&emsp;&emsp;&ensp;// стартовый файл \
&emsp;&emsp;&emsp;├──  index.js \
&emsp;&emsp;&emsp;&ensp;// константа проекта - ссылка на Api \
&emsp;&emsp;&emsp;├──  site.js  
