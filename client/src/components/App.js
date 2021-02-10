import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import Logo from "../Logo";
import axios from "./axios";

const App = () => {
    const [profileImg, setProfileImg] = useState("");
    const [name, setName] = useState("");

    useEffect(async () => {
        const userData = await axios.get("/userdata");
        const { avatar_url, name } = userData.data.details.rows[0];
        // console.log(avatar_url, name);
        setProfileImg(avatar_url);
        setName(name);
    }, []);

    return (
        <div>
            <Logo />
            <h1>Here is the app page {name}</h1>
            <ProfilePic img={profileImg} />
        </div>
    );
};

export default App;
