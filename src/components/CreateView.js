import React, {useRef, useState, useEffect} from "react";
import addIcon from "../icons/Add.svg";
import SearchIcon from "../icons/SearchIcon.svg"
import Settings from "../icons/Settings.svg"
import Clear from "../icons/CloseBig.svg"
import LectureElement from "./LectureElement";
import server_url from "../site";

import "../styles/createview.scss"
import FileUI from "./FileUI";
import FileLecture from "./LectureUpload";
import { useParams } from 'react-router-dom';
function CreateView({add_lecture, nav, lectures}) {

    const [isLoading, setLoading] = useState(false)
    const [loadingCount, setLoadingCount] = useState(0)
    const [array, setArray] = useState([])


  const fileRef = useRef();
  const [file, setFile] = useState("");
  // const [lecFile, setLecFile] = useState("")
  // const [FIO, setFIO] = useState("")
  const [title, setTitle] = useState("")
  // const [theme, setTheme] = useState("")


  const handleUploadClick = async () => {

    if (!file) {
      console.log('Необходимо добавить файл')
    return;
  }
  setLoading(true)
  console.log(file)
    let res = []
    for (let i = 0; i < file.length; i++) {
      const formData = new FormData();
      formData.append('file', file[i].file)
      // appends stuff to form data to send to python
      const data = await (await fetch(server_url+`upload-image/?title=${title}`, {
        method: 'POST',
        body: formData,

        // 👇 Set headers manually for single file upload
        headers: {
          // 'content-type': 'multipart/form-data',
          'Accept': '*/*',
          'Access-Control-Allow-Origin': '*',
        },
      })).json()
      res.push(data)
      console.log(res)
    }
    add_lecture(res)

    setLoading(false)
    setLoadingCount(0)
    setFile([])
    nav("/")
  }

  return (
    <div className="createViewContainer">
      {isLoading? <div style={{display: "flex", flexDirection: "row", height: "100vh",alignItems: "center", justifyContent: "space-around"}}>Загружаем снимки..</div> : [<div className="topBarWrapper">
        <div onClick={()=>{nav('/')}} className="close"><img src={Clear}/></div>
        <div className="addTitle ">Добавить Снимок</div>
        <div className="c"/>
        </div>,
      
      <div className="container">
        <FileUI file={file} setFile={setFile} fileRef={fileRef}/>
        <div className="input">
            Серийный номер
            <input onChange = {(e)=>{setTitle(e.target.value)}} placeholder="Введите серийный номер"/>
        </div>
        
       {/*  <div className="input">
            ФИО
            <input onChange = {(e)=>{setFIO(e.target.value)}}placeholder="Введите лектора"/>
        </div>
        
       <div className="input">
            Тема
            <input onChange = {(e)=>{setTheme(e.target.value)}}placeholder="Выберите тему"/>
        </div> 
        <FileLecture file={lecFile} setFile={setLecFile} /> */}
        {/* <div className={"upload button "+ ((!lecFile || !FIO || !theme || !title) ? 'not' : '')} onClick={handleUploadClick}>Готово</div> */}
        <div className={"upload button "+ ((!file || !title) ? 'not' : '')} onClick={handleUploadClick}>Готово</div>
      </div>]}
    </div>
  );
}

export default CreateView;
