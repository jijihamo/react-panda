import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Avatar from "react-avatar";

import { PostDiv, Post, BtnDiv, } from "../../Style/PostDetailCSS.js";

function Detail(props) {

    let params = useParams();
    let navigate = useNavigate();
    const user = useSelector((state)=>state.user);

    const DeleteHandler = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            let body = {
                postNum : params.postNum,
            };
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigate("/");
                    }
                })
                .catch((err) => {
                    alert("게시글 삭제에 실패하였습니다.");
                });
        } else {
            alert("취소");
        }
    }

    useEffect(() => {
        console.log(props.PostInfo);
    }, [props.PostInfo])

    return (
        <PostDiv>
            <Post>
                <h1>{props.PostInfo.title}</h1>
                <div className="author">
                    {props.PostInfo.author.displayName}
                    <Avatar
                        size="20"
                        round={true}
                        src={props.PostInfo.author.photoURL}
                        style={{ border: "1px solid #c6c6c6" }}
                    />
                </div>
                {props.PostInfo.image ? <img src={`http://localhost:5000/${props.PostInfo.image}`} alt="" style={{ width: "100%", height: "auto" }} /> : null}
                <p>{props.PostInfo.content}</p>
            </Post>
            { user.uid === props.PostInfo.author.uid && (
            <BtnDiv>
                <Link to={`/edit/${props.PostInfo.postNum}`}>
                    <button className="edit">수정</button>
                </Link>
                <button className="delete" onClick={() => DeleteHandler()}>
                    삭제
                </button>
            </BtnDiv>
            )}
        </PostDiv>
    )
}

export default Detail;