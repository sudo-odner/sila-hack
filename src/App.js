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

  const add_lecture = (uid)=>{
    console.log(uid)

    const func_ = () => {fetch(server_url+"get-laptop-info/?id="+uid, {
      method: 'GET',
        
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': 'application/json',
        "ngrok-skip-browser-warning": "1",
        'Access-Control-Allow-Origin': '*',
        "accept": "*/*"
      },
    })
      .then((res) => {
        console.log(res);
        return res.json()
      })
      .then((data) => {
          console.log(data)
          Array(data['deffects'].map((v)=>{return JSON.parse(v)}))
          setLectures([...lectures, {uid: uid, title: data['title'], deffects: data['deffects']}])
        }

      )
      .catch((err) => console.error(err));
    
    
  }
  func_()
    
  }
  const nav = useNavigate()

  const [lectures, setLectures] = useStoredState('lectures', [])

  return (
    <div className="App">
      <div className={'left '+(window.location.pathname==="/" ?'aaal':'')}>
        <Header/>
        <Lectures nav={nav} lectures={lectures}/>
      </div>
      <div className={'right '+(window.location.pathname==="/" ?'aaar':'')}>
          <Routes>
            <Route path="/" element={<CleanView/>} />
            <Route path="/add" element={<CreateView nav={nav} lectures={lectures} add_lecture={add_lecture}/>} />
            <Route path="/lecture/" element={<LectureView setLectures={setLectures} lectures={lectures} nav={nav} id={id}/>} />
            <Route path="/edit_lecture/:id" element={<EditLectureView setLectures = {setLectures} lectures={lectures} nav={nav}/>} />
            <Route path="/glos/:id" element={<GlosView lectures={lectures} nav={nav}/>} />
          </Routes>
      </div>
      {/* <GlosView/> */}
    </div>
  );
}

export default App;
