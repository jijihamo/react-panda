import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import ImageUpload from './ImageUpload';
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS";

function Edit() {

  const user = useSelector((state)=>state.user);

    let params = useParams();
    let navigate = useNavigate();    
    const [PostInfo, setPostInfo] = useState({});
    const [Flag, setFlag] = useState(false);
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Image, setImage] = useState(PostInfo.image);

    useEffect(()=>{
      if(!user.accessToken) {
        alert("작성자만 수정이 가능합니다.");
        navigate("/login");
      }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
    
        if (Title === "" || Content === "") {
          return alert("모든 항목을 채워주세요.");
        }
    
        let body = {
          title: Title,
          content: Content,
          postNum: params.postNum,
          image: Image,
        };
    
        axios
            .post("/api/post/edit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 수정이 완료되었습니다.");
                    navigate(`/post/${params.postNum}`);
                } else {
                    alert("글 수정에 실패하였습니다.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    useEffect(() => {
        let body = {
            postNum : params.postNum,
        };
        axios
            .post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.postList);  
                    setFlag(true);  
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params]);

    useEffect(() => {
        setTitle(PostInfo.title);
        setContent(PostInfo.content);
        setImage(PostInfo.image);
    }, [PostInfo])

  return (    
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={Title||''}
          onChange={(e)=>{
            setTitle(e.currentTarget.value)
          }}
        />
        <ImageUpload setImage={setImage}/>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={Content||''}
          onChange={(e)=>{
            setContent(e.currentTarget.value)
          }}
        />
        <UploadButtonDiv>
          <button
            className="cancel"
            onClick={(e)=>{
                e.preventDefault();
                navigate(-1);
            }}
          >
            취소
          </button>
          <button onClick={(e)=>{onSubmit(e);}}>제출</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  )
};

export default Edit;