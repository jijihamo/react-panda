import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ListDiv, ListItem } from "../../Style/ListCSS";
import axios from "axios";
import Avatar from "react-avatar";

function List(props) {

  const [postList, setPostList] = useState([]);


  useEffect(()=> {
    axios
      .post("/api/post/list")
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
    <ListDiv>
      <h3>List!</h3>
      {postList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/post/${post.postNum}`}>
              <p className="title">{post.title}</p>
              <Avatar
                size="20"
                round={true}
                src={post.author.photoURL}
                style={{ border: "1px solid #c6c6c6" }}
              />
              <p className="auth">{post.author.displayName}</p>
              <p>{post.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
    </>
  )
}

export default List;