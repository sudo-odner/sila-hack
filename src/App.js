import './styles/App.scss';
import Header from './components/Header';
import Lectures from './components/Lectures';
import {BrowserRouter, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import CleanView from './components/CleanView';
import CreateView from './components/CreateView';
import React, {useState} from 'react';
import LectureView from './components/LectureView';
import GlosView from './components/GlosView';
import EditLectureView from "./components/EditLectureView"
import server_url from "./site"
import { useNavigate } from 'react-router';

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


function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  let id = searchParams.get('id')

  const add_lecture = async (uids) => {
    console.log(uids)
    let res = []
    for (let i = 0; i < uids.length; i++) {
      // appends stuff to form data to send to python
      let data = await (await fetch(server_url+`get-laptop-info/?id=${uids[i]}`, {
        method: 'GET',

        // 👇 Set headers manually for single file upload
        headers: {
          // 'content-type': 'multipart/form-data',
          'Accept': '*/*',
          'Access-Control-Allow-Origin': '*',
        },
      })).json()
      Array(data['deffects'].map((v)=>{return JSON.parse(v)}))
      data = {uid: uids[i], title: data['title'], deffects: data['deffects']}
      res.push(data)
      console.log(res)
    }
    setLectures(res.concat(lectures))
  }
  
  const nav = useNavigate()

  const [lectures, setLectures] = useStoredState('lectures', [{"uid":"276d0d219c2e45ee904d5fa4ef638c49","title":"HP 1023","deffects":["{\"id\": \"158aee387e004020a932ab68988c320c\", \"description\": \"disassembled_laptop\"}","{\"id\": \"043c31a36f5547c3a985b44477e15a7d\", \"description\": \"disassembled_laptop\"}","[{\"cords\": [213, 331, 333, 558], \"description\": \"disassembled_laptop\", \"score\": 0.8291016221046448}, {\"cords\": [523, 712, 681, 765], \"description\": \"disassembled_laptop\", \"score\": 0.7168760299682617}]"]}]
  )
  const [removeList, setRemoveList] = useStoredState('removelist', [])

  return (
    <div className="App">
      <div className={'left '+(window.location.pathname==="/" ?'aaal':'')}>
        <Header/>
        <Lectures nav={nav} lectures={lectures} removeList={removeList}/>
      </div>
      <div className={'right '+(window.location.pathname==="/" ?'aaar':'')}>
          <Routes>
            <Route path="/" element={<CleanView/>} />
            <Route path="/add" element={<CreateView nav={nav} lectures={lectures} add_lecture={add_lecture}/>} />
            <Route path="/lecture/" element={<LectureView setLectures={setLectures} lectures={lectures} nav={nav} id={id}/>} />
            <Route path="/edit_lecture/:id" element={<EditLectureView setLectures = {setLectures} lectures={lectures} nav={nav}/>} />
            <Route path="/glos/:id" element={<GlosView lectures={lectures} removeList={removeList} setRemoveList={setRemoveList} nav={nav}/>} />
          </Routes>
      </div>
      {/* <GlosView/> */}
    </div>
  );
}

export default App;
