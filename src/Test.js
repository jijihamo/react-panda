import React, { useState } from "react";

function Test() {

    const [Content, setContent] = useState("");
    const [ContentList, setContentList] = useState([]);

    const onSubmit = () => {
        let arrList = [...ContentList];
        arrList.push(Content);
        setContentList(arrList);
        setContent("");
    }

    return (
        <div>
            <h1>kkirix</h1>
            {ContentList.map((content, idx) => {
                return (<div key={idx}>{content}</div>)
            })}
            <br/>
            <input type="text" value={Content} onChange={(e)=>{setContent(e.currentTarget.value)}}/>
            <button onClick={()=>{onSubmit();}}>제출</button>
        </div>
    )    
}

export default Test;