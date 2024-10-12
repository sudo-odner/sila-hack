import React, {useRef, useReducer, useState, useEffect} from "react";
import addIcon from "../icons/Add.svg";
import SearchIcon from "../icons/SearchIcon.svg"
import Settings from "../icons/Settings.svg"
import Clear from "../icons/CloseBig.svg"
import site_url from "../site"

import "../styles/lectureview.scss"
import FileUI from "./FileUI";
import FileLecture from "./LectureUpload";
import { useParams } from "react-router-dom";

function LectureView({setLectures, lectures, nav}) {
  let {id} = useParams();
  let lecture = lectures.filter(lec=>{console.log(lec.uid, id);return lec.uid === id})[0]
  const [isG, setG] = useState(false)
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  console.log(lecture, id)
  const [img_, setImg] = useState(<img alt="" src={""}/>)
  const [title, setTitle] = useState(lecture.title)
  useEffect(()=>
    {
        if (id >= lectures.length || id < 0) {
            nav('/')
            return
        }
        if (!isG) {
            fetch(site_url+"get_image/?id="+lecture.uid, {
                method: 'GET',
                headers: {
                    'Accept': 'image/png',
                    "ngrok-skip-browser-warning": "1",
                    'Access-Control-Allow-Origin': '*',
                },
      })
        .then((res) => res.blob())
        .then((blob) => {
            setImg(<img alt="" src={URL.createObjectURL(blob)}/>)
            setG(true)
            })
        .catch((err) => console.error(err));
        }
    }, [id]
  )
  if (id >= lectures.length || id < 0) {
    nav('/')
    return
}

  
  return (<div className="lectureViewContainer">
      <div className="topBarWrapper">
        <div onClick={()=>{nav(`/lecture?id=${id}`)}} className="close c"><img src={Clear}/></div>
        {/* <div className="input-"><input className="addTitle " onChange={(e)=>{setTitle(e.target.value)}} defaultValue={title}/> */}
        {/* </div> */}
        <div className="spacer"/>
      </div>
      
      <div className="container">
        <div className="imgWrapper" >{img_}</div>
        <div className="upinfo">
            <div className="up">
                <div className="input-">
                  <div>Серийный номер</div>
                  <input className="fio"   onChange={(e)=>{setTitle(e.target.value)}} defaultValue={title}/>
                </div>
                {/* <div className="input-"><div>Тема</div><input className="theme"  onChange={(e)=>{setTheme(e.target.value)}} defaultValue={theme}/> */}
                
            </div>
        </div>
        {/* <textarea  onChange={(e)=>{setShort(e.target.value)}} defaultValue={short}></textarea> */}
        <div onClick={()=>{
            
            lecture.title = title
            lectures[lectures.find((el) => el === lecture)] = lecture
            setLectures(lectures)
            nav(`/lecture/?id=${id}`)}}className="glosWrapper button">Сохранить изменения</div>
            <div onClick={()=>{
              lectures.splice(id, 1)
                nav(`/`)
                forceUpdate()}}className="remove button">Удалить</div>
     </div>
     </div>
  );
}

export default LectureView;
