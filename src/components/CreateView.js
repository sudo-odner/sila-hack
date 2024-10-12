import React, {useRef, useState} from "react";
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

    const[isLoading, setLoading] = useState(false)

    const handleUploadClick = () => {
        if (!file) {
            console.log('Необходимо добавить файл')
          return;
        }
        setLoading(true)
        let formData = new FormData();
        formData.append('file', file)
        // 👇 Uploading the file using the fetch API to the server
        fetch(server_url+`upload-image/?title=${title}`, {
          method: 'POST',
          body: formData,

          // 👇 Set headers manually for single file upload
          headers: {
            // 'content-type': 'multipart/form-data',
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
          },
        })
          .then((res) => res.json())
          .then((data) => {console.log("Uploaded:", data); add_lecture(data);setLoading(false);nav("/")})
          .catch((err) => {console.error(err);setLoading(false)});
      };


  const fileRef = useRef();
  const [file, setFile] = useState("");
  // const [lecFile, setLecFile] = useState("")
  // const [FIO, setFIO] = useState("")
  const [title, setTitle] = useState("")
  // const [theme, setTheme] = useState("")

  return (
    <div className="createViewContainer">
      {isLoading? <div style={{display: "flex", flexDirection: "row", height: "100vh",alignItems: "center", justifyContent: "space-around"}}>Загружаем лекцию..</div> : [<div className="topBarWrapper">
        <div onClick={()=>{nav('/')}} className="close"><img src={Clear}/></div>
        <div className="addTitle ">Добавить Снимок</div>
        <div className="c"/>
        </div>,
      
      <div className="container">
        <FileUI file={file} setFile={setFile} fileRef={fileRef}/>
        <div className="input">
            Серийный номер
            <input onChange = {(e)=>{setTitle(e.target.value)}}placeholder="Введите серийный номер"/>
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
