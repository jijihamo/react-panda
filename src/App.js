import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";
import firebase from './firebase.js';

import Heading from "./Component/Heading";
import MainPage from "./Component/MainPage";
import Upload from "./Component/Post/Upload";
import PostArea from './Component/Post/PostArea';
import Edit from "./Component/Post/Edit";
import MyPage from './Component/User/MyPage';

import Login from './Component/User/Login';
import Register from './Component/User/Register';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log("userInfo: ", userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser())
      }
    });
  }, []);

  return (
    <div className="App">
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* Post, Reple */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<PostArea />} />
        <Route path="/edit/:postNum" element={<Edit />} />

        {/* User */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
