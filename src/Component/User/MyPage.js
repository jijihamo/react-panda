import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';

function MyPage() {

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [CurrentImage, setCurrentImage] = useState("");

    useEffect(() => {
        if (user.isLoading && !user.accessToken) {
            navigate("/login");
        } else {
            setCurrentImage(user.photoURL);
        }
    }, [user]);

    return (
        <div>
            <form
                style={{
                    width: "50%",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "2rem",
                }}
            >
                <label>
                    <input type="file" accept="image/*" style={{ display: "none" }} />
                    <Avatar
                        size="100"
                        round={true}
                        src={CurrentImage}
                        style={{ border: "1px solid #c6c6c6", cursor: "pointer" }}
                    />
                </label>
            </form>
        </div>
    )
}

export default MyPage;