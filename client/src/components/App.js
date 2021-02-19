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
    const [currentTab, setTab] = useState("");
    const [feed, setFeed] = useState("");

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
                                className={`border-b border-transparent   ${
                                    currentTab === "/" ? "border-black" : ""
                                } cursor-pointer`}
                            >
                                Overview
                            </motion.div>
                        </Link>
                        <motion.div
                            variants={hoverVariants}
                            whileHover="visible"
                            className={`border-b border-transparent ${
                                currentTab === "/chat" ? "border-black" : ""
                            } cursor-pointer`}
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
                        <Link to="/friends">
                            <motion.div
                                variants={hoverVariants}
                                whileHover="visible"
                                className={`border-b border-transparent ${
                                    currentTab == "/friends"
                                        ? "border-black"
                                        : ""
                                } cursor-pointer`}
                            >
                                Friends
                            </motion.div>
                        </Link>

                        <Link to="/find/users">
                            <motion.div
                                variants={hoverVariants}
                                whileHover="visible"
                                className={`border-b border-transparent ${
                                    currentTab == "/find/users"
                                        ? "border-black"
                                        : ""
                                } cursor-pointer`}
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
                            updateLocation={updateLocation}
                            feed={feed}
                            updateFeed={updateFeed}
                        />
                    )}
                />
                <Route
                    exact
                    path="/find/users"
                    render={() => <Findusers updateLocation={updateLocation} />}
                />
                <Route
                    exact
                    path="/friends"
                    render={() => <Friends updateLocation={updateLocation} />}
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
