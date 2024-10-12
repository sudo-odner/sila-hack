import React, {useEffect, useState, useReducer} from "react";
import { useParams } from "react-router-dom";
import Clear from "../icons/CloseBig.svg"
import "../styles/glosview.scss"
import site_url from "../site"
import ContentLoader from "react-content-loader";


function El({id, title, remove}) {


    const func = ()=>{fetch(site_url+"deffect_photo/?id="+id, {
        method: 'GET',
          
        // 👇 Set headers manually for single file upload
        headers: {
          // 'content-type': 'multipart/form-data',
          'Accept': 'image/png',
          "ngrok-skip-browser-warning": "1",
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((res) => {console.log(res);return res.blob()})
        .then((blob) => {console.log(blob);
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                // console.log(base64data);
                setImg(<div  className="big lecImgWrapper"><img className="lecImg" src={URL.createObjectURL(blob)} alt=""/></div>)
}
        })
        .catch((err) => console.error(err));
    }
    const [img, setImg] = useState(<ContentLoader speed={2}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb" className="lecImgWrapper"> 
                <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
            </ContentLoader>)
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(()=>
    {func();forceUpdate()}, [id])

    return <div className="lecWrapper" key={id}>
        {img}
        <div className="lecDesc">
            {/* <div className="lecTitle"></div> */}
            <div className="lecShort light-text">{title}</div>
            {/* <div className="lecThemeDate light-text">
                {/* {theme} · {date}{description} 
            </div> */}
            <div className="lecActions">
            {/* <div className="lecKeep">Оставить</div> */}
            <div className="lecError" onClick={()=>{remove(id)}}>Ошибка</div>
        </div>
        </div>

        
    </div>
}


function GlosView({lectures, nav, removeList, setRemoveList}){

    function remove(id_) {
        console.log(removeList)
        setRemoveList([...removeList, id_])
    }

    const {id} = useParams();
    let lecture = lectures.filter(lec=>{console.log(lec.uid, id);return lec.uid === id})[0]
    console.log(lecture, id)
    const [chosen_id, setId] = useState(-1);
    const deffects = lecture.deffects.slice(0, -1).map((e)=>JSON.parse(e))
    // const [removeList, setRemoveList] = useState([])
    console.log(deffects)

    let view = deffects.map((v, key) => {
        if (((chosen_id === -1) || (key === Number(chosen_id))) && (!removeList.includes(v.id))) {
            console.log(v)
            return <El id={v.id} title={v.description} remove={remove}/>
            
        } else {
            return <></>
        }
    })

    useEffect(()=>{

        if (id >= lectures.length || id < 0) {
          nav('/')
          return
        }
    })
    if (id >= lectures.length || id < 0) {
        nav('/')
        return
    }
    

    return <div className="container">
        <div className="topBarWrapper">
            <div onClick={()=>{(chosen_id === -1) ? nav(-1) : setId(-1)}} className="close"><img src={Clear}/></div>
            <div className="addTitle ">{lecture.title}</div>
            <div className="spacer"/>
        </div>
        <div className="dictView">{view}</div>
    </div>
}

export default GlosView;