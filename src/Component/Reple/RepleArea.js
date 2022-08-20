import React from 'react';
import RepleUpload from './RepleUpload';
import RepleList from './RepleList';
import { RepleAreaDiv, RepleUploadDiv } from '../../Style/RepleCSS';
import { useSelector } from "react-redux";

function RepleArea(props) {

  const user = useSelector((state) => state.user);
  
  return (
    <RepleAreaDiv>
      <RepleUploadDiv>
        {user.accessToken && <RepleUpload postId={props.postId} />}
      </RepleUploadDiv>
        <RepleList postId={props.postId} />
    </RepleAreaDiv>
  )
}

export default RepleArea;