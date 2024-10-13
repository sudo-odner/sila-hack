// стилизация
import './styles/App.scss';

// базовые модули
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import React, {useState} from 'react';

// ссылка на сервер
import server_url from "./site"

// импортирование вьюшек и компонентов
import LectureView from './components/LectureView';
import GlosView from './components/GlosView';
import EditLectureView from "./components/EditLectureView"
import CleanView from './components/CleanView';
import CreateView from './components/CreateView';
import Header from './components/Header';
import Lectures from './components/Lectures';

// модификация для сохранения стейта в локальном хранилище браузера
function useStoredState(key, defaultValue) {
  // 👇 Load stored state into regular react component state
  const [state, setState] = useState(() => {
    const storedState = localStorage.getItem(key);
    // console.log(storedState)
    if (storedState) {
      // 🚩 Data is stored as string so need to parse
      return JSON.parse(storedState);
    }

    // No stored state - load default value.
    // It could be a function initializer or plain value.
    return defaultValue;
  });

  // 👇 Keeps the exact same interface as setState - value or setter function.
  const setValue = (value) => {
    const valueToStore = value;
    localStorage.setItem(key, JSON.stringify(valueToStore));
    setState(valueToStore);
  };

  // as const tells TypeScript you want tuple type, not array.
  return [state, setValue] ;
}

// основная Функция приложения
function App() {
  // получение выбранного параметра id
  const [searchParams, _] = useSearchParams()
  let id = searchParams.get('id')
  // функция для навигации
  const nav = useNavigate()
  // снимки
  const [lectures, setLectures] = useStoredState('lectures', [{"uid":"276d0d219c2e45ee904d5fa4ef638c49","title":"HP 1023","deffects":["{\"id\": \"158aee387e004020a932ab68988c320c\", \"description\": \"disassembled_laptop\"}","{\"id\": \"043c31a36f5547c3a985b44477e15a7d\", \"description\": \"disassembled_laptop\"}","[{\"cords\": [213, 331, 333, 558], \"description\": \"disassembled_laptop\", \"score\": 0.8291016221046448}, {\"cords\": [523, 712, 681, 765], \"description\": \"disassembled_laptop\", \"score\": 0.7168760299682617}]"]}]
  )
  // снимки с ошибкой, которые отправили на доработку
  const [removeList, setRemoveList] = useStoredState('removelist', [])

  // функция по фетчу данных о сканированных снимках и реализации сохранение в Local Storage
  const add_lecture = async (uids) => {
    // создаем пустой список для заполнения данными
    let res = []
    // идем по загруженным снимкам
    for (let i = 0; i < uids.length; i++) {
      // получаем информацию в виде Json
      let data = await (await fetch(server_url+`get-laptop-info/?id=${uids[i]}`, {
        method: 'GET',
        // 👇 Настраиваем заголовки
        headers: {
          'Accept': '*/*',
          'Access-Control-Allow-Origin': '*',
        },
      })).json()
      // преобразовываем списки деффектов внутри из Json строки
      Array(data['deffects'].map((v)=>{return JSON.parse(v)})) 
      // генерируем объект для последующего сохранение в Local Storage
      data = {uid: uids[i], title: data['title'], deffects: data['deffects']}
      // добавляем в финальный результат
      res.push(data)
    }
    // подгружаем новые снимки в Local Storage
    setLectures(res.concat(lectures))
  }

  return (
    <div className="App">
      {/* Левая половина (отображение только в мобильной версии на главной странице - скрывается при переходе) */}
      <div className={'left '+(window.location.pathname==="/" ?'aaal':'')}>
        {/* Логотим */}
        <Header/>
        {/* Сайдбар с загруженными нами снимками */} 
        <Lectures nav={nav} lectures={lectures} removeList={removeList}/>
      </div>
      {/* Правая половина, не отображаем на главной странице в случае мобильной версии  */} 
      <div className={'right '+(window.location.pathname==="/" ?'aaar':'')}>
          <Routes>
            {/* Заполнение пустого пространства на главной странице */} 
            <Route path="/" element={<CleanView/>} />
            {/* Загрузка снимков */} 
            <Route path="/add" element={<CreateView nav={nav} lectures={lectures} add_lecture={add_lecture}/>} />
            {/* Окрытый снимок */} 
            <Route path="/lecture/" element={<LectureView setLectures={setLectures} lectures={lectures} nav={nav} id={id}/>} />
            {/* Изменения снимка */} 
            <Route path="/edit_lecture/:id" element={<EditLectureView setLectures = {setLectures} lectures={lectures} nav={nav}/>} />
            {/* Просмотор деффектов */} 
            <Route path="/glos/:id" element={<GlosView lectures={lectures} removeList={removeList} setRemoveList={setRemoveList} nav={nav}/>} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
