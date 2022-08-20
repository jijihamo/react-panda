import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Detail from "./Detail";
import axios from "axios";

import RepleArea from "../Reple/RepleArea";

import { SpinnerDiv } from "../../Style/PostDetailCSS.js";
import { Spinner } from "react-bootstrap";

function PostArea() {

    const [PostInfo, setPostInfo] = useState({});
    const [Flag, setFlag] = useState(false);

    let params = useParams();

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

    return (
        <div>
            {Flag ? (
                <>
                    <Detail PostInfo={PostInfo} />
                    <RepleArea postId={PostInfo._id}/>
                </>
            ) : (
                <SpinnerDiv>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </SpinnerDiv>
            )
            }
            
        </div>
    )
}

export default PostArea;