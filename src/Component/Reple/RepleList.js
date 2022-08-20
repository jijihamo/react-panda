import React, { useState, useEffect } from 'react';
import axios from "axios";
import RepleContent from './RepleContent';

function RepleList(props) {
    
    const [repleList, setrepleList] = useState([]);

    useEffect(() => {
        let body = {
            postId: props.postId,
        };

        axios.post("/api/reple/getReple", body).then((response) => {
            if (response.data.success) {
                setrepleList([...response.data.repleList]);
            }
        });
    });

    return (
        <div>
            {repleList.map((reple, idx) => {
                return <RepleContent reple={reple} key={idx}/>;
            })}
        </div>
    );
}

export default RepleList;