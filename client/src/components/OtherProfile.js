import React, { useState, useEffect } from "react";
import axios from "./axios";

const OtherProfile = (props) => {
    console.log(props.match.params.id);

    const [profileImg, setProfileImg] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    useEffect(async () => {
        await axios.get("api/user/:id");
    });

    return (
        <div>
            <h1>I am the other profile!!!</h1>
            <h2>I will display the other user's information including their</h2>
        </div>
    );
};

export default OtherProfile;
