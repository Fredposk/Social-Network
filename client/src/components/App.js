import { useState, useEffect } from "react";

import axios from "./axios";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import Logoinside from "./Logoinside";
import { motion } from "framer-motion";
import Findusers from "./Findusers";
import Friends from "./Friends";
import NavBar from "./NavBar";
import Chat from "./Chat";

const App = () => {
    const [profileImg, setProfileImg] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [currentTab, setTab] = useState("");
    const [feed, setFeed] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(async () => {
        const userData = await axios.get("/userdata");
        const { avatar_url, name, bio, feed } = userData.data.details.rows[0];
        setProfileImg(avatar_url);
        setName(name);
        setBio(bio);
        setFeed(feed);
    }, []);

    const newPic = (item) => {
        setProfileImg(item.data.newPic.rows[0].avatar_url);
    };

    const updateBio = (item) => {
        setBio(item.data.bio.rows[0].bio);
    };

    const updateLocation = (item) => {
        setTab(item);
    };

    const updateFeed = (item) => {
        setFeed(item);
    };

    const activatedarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Router>
            <div
                className={`h-screen ${darkMode ? "bg-gray-400" : "bg-white "}`}
            >
                <Logoinside
                    name={name}
                    picture={profileImg}
                    activatedarkMode={activatedarkMode}
                    darkMode={darkMode}
                />
                <NavBar darkMode={darkMode} currentTab={currentTab} />

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
                            updateLocation={updateLocation}
                            feed={feed}
                            updateFeed={updateFeed}
                            darkMode={darkMode}
                        />
                    )}
                />
                <Route
                    exact
                    path="/find/users"
                    render={() => (
                        <Findusers
                            updateLocation={updateLocation}
                            darkMode={darkMode}
                        />
                    )}
                />
                <Route
                    exact
                    path="/friends"
                    render={() => (
                        <Friends
                            updateLocation={updateLocation}
                            darkMode={darkMode}
                        />
                    )}
                />
                <Route
                    exact
                    path="/chat"
                    render={() => (
                        <Chat
                            updateLocation={updateLocation}
                            darkMode={darkMode}
                        />
                    )}
                />

                <Route
                    path="/user/:id"
                    render={(props) => (
                        <OtherProfile
                            updateLocation={updateLocation}
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
