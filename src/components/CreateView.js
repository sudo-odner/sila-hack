import React, { useRef, useState, useEffect } from "react";
import addIcon from "../icons/Add.svg";
import SearchIcon from "../icons/SearchIcon.svg";
import Settings from "../icons/Settings.svg";
import Clear from "../icons/CloseBig.svg";
import LectureElement from "./LectureElement";
import server_url from "../site";
import { PongSpinner } from "react-spinners-kit";

import "../styles/createview.scss";
import FileUI from "./FileUI";
function CreateView({ add_lecture, nav, lectures }) {
  const [isLoading, setLoading] = useState(false);
  const fileRef = useRef();
  const [loadCount, setLoadCount] = useState(0);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");

  // Функция подгрузки изображений
  const handleUploadClick = async () => {
    // проверяем наличие файлов
    if (!file) {
      console.log("Необходимо добавить файл");
      return;
    }
    // создаем загрузку
    setLoading(true);
    let res = [];
    // идем по списку файлов и загружаем каждый на сервер
    for (let i = 0; i < file.length; i++) {
      setLoadCount(i);
      // формируем Тело запроса
      const formData = new FormData();
      formData.append("file", file[i].file);
      // получаем UID от сервера
      const data = await (
        await fetch(server_url + `upload-image/?title=${title}`, {
          method: "POST",
          body: formData,
          // 👇 Set headers manually for single file upload
          headers: {
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
          },
        })
      ).json();
      // добавляем UID в наш резульат
      res.push(data);
    }
    add_lecture(res); // подгружаем информацию о сканировании и сохраняем в локальное хранилище
    setLoading(false); // загрузка закончилась
    setFile([]); // стираем файлы из памяти
    nav("/"); // навигация на домашнюю страницу
  };

  return (
    <div className="createViewContainer">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="loading"
        >
          <p>Загружено {Math.round((loadCount / file.length) * 100)} %</p>
          <div className="loadingview">
                <div
                    className="loading"
                >
                    <PongSpinner color="#C11d1d"/>
                </div>
            </div>
        </div>
      ) : (
        [
          <div className="topBarWrapper">
            <div
              onClick={() => {
                nav("/");
              }}
              className="close"
            >
              <img src={Clear} />
            </div>
            <div className="addTitle ">Добавить Снимок</div>
            <div className="c" />
          </div>,

          <div className="container">
            <FileUI file={file} setFile={setFile} fileRef={fileRef} />
            <div className="input">
              Серийный номер
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Введите серийный номер"
              />
            </div>
            <div
              className={"upload button " + (!file || !title ? "not" : "")}
              onClick={handleUploadClick}
            >
              Готово
            </div>
          </div>,
        ]
      )}
    </div>
  );
}

export default CreateView;
