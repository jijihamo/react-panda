import React from 'react';
import { Link } from "react-router-dom";
import { ListDiv, ListItem } from "../../Style/ListCSS";
import Avatar from "react-avatar";

import moment from "moment";
import "moment/locale/ko";

function List(props) {

  const setTime = (a, b) => {
    if (a !== b) {
      return moment(b).format('YYYY년 MMMM Do, a hh:mm');
    } else {
      return moment(a).format('YYYY년 MMMM Do, a hh:mm');
    }
  }

 return (
    <>
    <ListDiv>
      <h3>List!</h3>
      {props.PostList && props.PostList.map((post, idx) => {
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
              <p>{setTime(post.createdAt, post.updatedAt)}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
    </>
  )
}

export default List;