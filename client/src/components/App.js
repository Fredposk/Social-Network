import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import Logo from "../Logo";
import axios from "./axios";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";

const App = () => {
    const [profileImg, setProfileImg] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    useEffect(async () => {
        const userData = await axios.get("/userdata");
        const { avatar_url, name, bio } = userData.data.details.rows[0];
        setProfileImg(avatar_url);
        setName(name);
        setBio(bio);
    }, []);

    const newPic = (item) => {
        setProfileImg(item.data.newPic.rows[0].avatar_url);
    };

    const updateBio = (item) => {
        setBio(item.data.bio.rows[0].bio);
    };

    return (
        <Router>
            <div>
                <Logo />
                <h1>Welcome {name}</h1>
                <ProfilePic img={profileImg} size={`20rem`} />
                <br />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Profile
                            profileInfo={name}
                            img={profileImg}
                            picUpdate={newPic}
                            bio={bio}
                            updateBio={updateBio}
                        />
                    )}
                />
                <Route
                    path="/user/:id"
                    render={(props) => (
                        <OtherProfile
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
            </div>
        </Router>
    );
};

export default App;
