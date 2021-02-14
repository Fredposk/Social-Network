import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import Logo from "../Logo";
import axios from "./axios";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import Logoinside from "./Logoinside";
import { motion } from "framer-motion";

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
                    <div className="flex ml-3 space-x-5">
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ yoyo: 4, duration: 0.4, delay: 0.4 }}
                            className="border-b border-black"
                        >
                            Overview
                        </motion.div>
                        <div className="border-b border-transparent">Chat</div>
                        <div className="border-b border-transparent">
                            Online
                        </div>
                        <div className="border-b border-transparent">
                            Friends
                        </div>
                        <div className="border-b border-transparent">Find</div>
                        <div className="border-b border-transparent">
                            People
                        </div>

                        <div className="border-b border-transparent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                            </svg>
                        </div>
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
