import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import axios from "./axios";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link, HashRouter } from "react-router-dom";
import Logoinside from "./Logoinside";
import { motion } from "framer-motion";
import Findusers from "./Findusers";

const hoverVariants = {
    hidden: {},
    visible: {
        y: -4,
        color: "#000000",
        duration: 0.4,
    },
};

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
            <div className="">
                <Logoinside name={name} picture={profileImg} />
                {/* <ProfilePic img={profileImg} size={`20rem`} /> */}
                <div className="mt-4 mb-2 text-gray-500 border-b border-gray-300 text-md ">
                    <div className="flex ml-6 space-x-5">
                        <Link to="/">
                            <motion.div
                                variants={hoverVariants}
                                whileHover="visible"
                                className="border-b border-black cursor-pointer"
                            >
                                Overview
                            </motion.div>
                        </Link>
                        <motion.div
                            variants={hoverVariants}
                            whileHover="visible"
                            className="border-b border-transparent cursor-pointer"
                        >
                            Chat
                        </motion.div>
                        <motion.div
                            variants={hoverVariants}
                            whileHover="visible"
                            className="border-b border-transparent cursor-pointer"
                        >
                            Online
                        </motion.div>
                        <motion.div
                            variants={hoverVariants}
                            whileHover="visible"
                            className="border-b border-transparent cursor-pointer"
                        >
                            Friends
                        </motion.div>

                        <Link to="/find/users">
                            <motion.div
                                variants={hoverVariants}
                                whileHover="visible"
                                className="border-b border-transparent cursor-pointer"
                            >
                                Find People
                            </motion.div>
                        </Link>
                    </div>
                </div>

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
                    exact
                    path="/find/users"
                    render={() => (
                        <Findusers
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
