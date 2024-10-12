import React, { useEffect, useState, useReducer } from "react";
import site_url from '../site'
import "../styles/lecture.scss"
import ContentLoader from "react-content-loader";


function LectureElement({id, nav, title, description, removeList}) {
    const func = ()=>{fetch(site_url+"get_image/?id="+id, {
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
                setImg(<div  className="lecImgWrapper"><img className="lecImg" src={URL.createObjectURL(blob)} alt=""/></div>)
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
    const [descriptionCounts, setDescriptionCounts] = useState()

    useEffect(()=>
    {func();forceUpdate();
        let counts = {}
        description.slice(0, -1).forEach(item => {
            if (!removeList.includes(item.id)){
            item = JSON.parse(item)
            const description_ = item.description;
            counts[description_] = (counts[description_] || 0) + 1;}
          });
          setDescriptionCounts(counts);
      
    }, [id])



    return <div onClick={()=>{func();nav('/lecture?id='+id)}} className="lecWrapper" key={id}>
        {img}
        <div className="lecDesc">
            <div className="lecTitle">{title}</div>
            <div className="lecShort light-text"></div>
            <div className="lecThemeDate light-text">
                {/* {theme} · {date} */}{descriptionCounts? Object.entries(descriptionCounts).map((e)=>(`${e[0]} x${ e[1]}`)): <></>}
            </div>
        </div>

        {/* <div className="lecActions">
            <div className="lecLike"></div>
            <div className="lecShort light-text">{short_desc}</div>
            <div className="lecThemeDate light-text">
                {theme} · {date}
            </div>
        </div> */}
    </div>
}

export default LectureElement;