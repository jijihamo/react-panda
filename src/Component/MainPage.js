import React, { useState, useEffect } from 'react';
import List from "./Post/List.js";
import axios from "axios";

import { DropdownButton, Dropdown } from "react-bootstrap";

function MainPage() {

    const [PostList, setPostList] = useState("");
    const [Sort, setSort] = useState("최신순");
    const [SearchTerm, setSearchTerm] = useState("");
    const [Skip, setSkip] = useState(0);
    const [LoadMore, setLoadMore] = useState(true);

    const SearchHandler = (e) => {
        getPostList();
    }

    const getPostLoadMore = () => {
        let body = {
            sort: Sort,
            searchTerm: SearchTerm,
            skip: Skip,
        };

        axios
            .post("/api/post/list", body)
            .then((response) => {                
                if (response.data.success) {
                    setPostList([...PostList , ...response.data.postList]);
                    setSkip(Skip + response.data.postList.length);
                    if (response.data.postList.length < 5) {
                        setLoadMore(false);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getPostList = () => {

        setSkip(0);

        let body = {
            sort: Sort,
            searchTerm: SearchTerm,
            skip: 0,
        };

        axios
            .post("/api/post/list", body)
            .then((response) => {                
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                    setSkip(response.data.postList.length);
                    if (response.data.postList.length <= 5) {
                        setLoadMore(false);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(()=> {

        let body = {
            sort: Sort,
            searchTerm: SearchTerm,
        }

        axios
            .post("/api/post/list", body)
            .then((response) => {                
            if (response.data.success) {
                setPostList([...PostList, ...response.data.postList]);
                setSkip(Skip + response.data.postList.length);
                if (response.data.postList.length < 5) {
                    setLoadMore(false);
                }
            }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [Sort]); 

    return (
        <div>
            <DropdownButton
                variant="outline-secondary"
                title={Sort}
                id="input-group-dropdown-1"
                >
                <Dropdown.Item onClick={()=>setSort("최신순")}>최신순</Dropdown.Item>
                <Dropdown.Item onClick={()=>setSort("인기순")}>인기순</Dropdown.Item>
            </DropdownButton>
            <input type="text" value={SearchTerm} onChange={(e)=>setSearchTerm(e.currentTarget.value)}
                onKeyDown={(e)=>{if(e.keyCode === 13) SearchHandler()}}/>
            <List PostList={PostList}/>
            {LoadMore && (<button style={{ marginBottom: "10vh" }} onClick={()=>getPostList()}>더 불러오기</button>)}
        </div>
    )
}

export default MainPage;