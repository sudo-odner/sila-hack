import React, {useState} from "react";
import FileIcon from "../components/FileIcon";

export default function FileUI(
  {fileRef,
  file,
  setFile}
) {
  const [fileName, setFileName] = useState("")
  const [fileType, setFileType] = useState("")
  const [im, setIm] = useState("")
  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // let reader = new FileReader();
      let array = []
      console.log( )
      Array.from(event.target.files).map((f) => {
        let new_ = {}
        new_['name'] = f.name
        new_['type'] = f.type.split("/")
        if (f.type.split("/")[0] !== "image") {
          let ext = f.name.split(".").pop() + " file";
          new_['type'] = ext;
        }
        new_["im"] = URL.createObjectURL(f)
        new_["file"] = f
        array.push(new_)
      })
      console.log(array)

      setFile(array)
    }
  };

  let fileUI = (
    <div className="uploadbutton" onClick={() => fileRef.current.click()}>
      <FileIcon />
      <div style={{width:"100%", marginTop: "0.5em", textAlign: "center"}}>Нажмите для загрузки</div>
      <input
        accept='image/*'
        ref={fileRef}
        onChange={onFileChange}
        multiple={true}
        type="file"
        hidden
      />
    </div>
  );
  if (file) {
    let alt = "";
    let fileType = file[0].type[0]
    if (fileType !== "image") {
      console.log();
      alt = (
        <div className="altimg" onClick={() => fileRef.current.click()}>
          <h3 className="alt">{fileType}</h3>
          <p className="filename">{fileName}</p>
        </div>
      );
    }
    fileUI = (
      <div className="uploaded">
        {alt === "" ? (
          <img src={file[0].im} alt="error" onClick={() => fileRef.current.click()} />
        ) : (
          alt
        )}
        <div className="changebutton">
          <input
            accept='image/*'
            ref={fileRef}
            onChange={onFileChange}
            multiple={true}
            type="file"
            hidden
          />
          <p className="uploadeddesc">{file.length} imgs loaded</p>
        </div>
      </div>
    );
  }
  return fileUI;
}
