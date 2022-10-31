import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

export const Write = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // console.log('state: ' + JSON.stringify(state));

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder="제목" onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>게시</h1>
          <span>
            <b>상태: </b> 임시 보관
          </span>
          <span>
            <b>보기: </b> 공개
          </span>
          <label className="file" htmlFor="file">
            사진 업로드
          </label>
          <input style={{ display: "none" }} type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          <div className="buttons">
            <button>저장</button>
            <button onClick={handleClick}>발행</button>
          </div>
        </div>
        <div className="item">
          <h1>카테고리</h1>

          <div className="cat">
            <input type="radio" checked={cat === "예술"} name="cat" id="art" value="예술" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="art">예술</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "과학"} name="cat" id="science" value="과학" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="science">과학</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "기술"} name="cat" id="technology" value="기술" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="technology">기술</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "영화"} name="cat" id="cinema" value="영화" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="cinema">영화</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "디자인"} name="cat" id="design" value="디자인" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="design">디자인</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "음식"} name="cat" id="food" value="음식" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="food">음식</label>
          </div>
        </div>
      </div>
    </div>
  );
};
