import React, { useState, useEffect } from "react";
import axios from "./axios";
import { motion } from "framer-motion";
import FriendButton from "./FriendButton";
import { Link } from "react-router-dom";

const pageEnter = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "tween", delay: 0.2, duration: 0.4 },
    },
};

const OtherProfile = (props) => {
    const [profileImg, setProfileImg] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [otherId, setId] = useState("");
    const [Friends, setFriends] = useState("");

    useEffect(async () => {
        props.updateLocation("/find/users");

        const user = props.match.params.id;
        setId(user);
        const result = await axios.get(`/api/user/${user}`);

        const { avatar_url, name, bio, id } = result.data.user;
        setProfileImg(avatar_url);
        setName(name);
        setBio(bio);
        setFriends(result.data.friendsList);

        if (id === result.data.requester) {
            props.history.push("/");
        }
    }, []);
    return (
        <motion.div
            variants={pageEnter}
            initial="hidden"
            animate="visible"
            className="flex items-center"
        >
            <div className="inline-flex w-1/2 mt-6 ml-6 ">
                <div className="flex items-center w-2/3">
                    <div>
                        <img
                            className="object-cover w-32 rounded-lg shadow-md h-44 "
                            src={`${profileImg}`}
                            alt="profile picture of ${img}"
                        />
                    </div>
                    <div className="flex flex-col w-1/2 ml-6 space-y-2">
                        <div className="text-sm font-semibold text-gray-600">
                            {bio}
                        </div>
                        <div className="inline-block text-lg text-blue-600 uppercase ">
                            {name}
                        </div>
                        <div className="text-center max-w-max">
                            <FriendButton id={otherId} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-1/2 mt-6 border-l border-gray-400">
                {Friends &&
                    Friends.map((user, index) => {
                        return (
                            <div
                                key={index}
                                className="inline-flex w-2/3 px-12 mt-6 mb-2 ml-6 space-y-3 transition duration-500 ease-in-out hover:opacity-75"
                            >
                                <Link to={`/user/${user.id}`}>
                                    <div className="flex items-center ">
                                        <div>
                                            <img
                                                className="object-cover w-24 h-24 rounded-lg shadow-md "
                                                src={`${user.avatar_url}`}
                                                alt="profile picture of {`${img}`}"
                                            />
                                        </div>
                                        <div className="flex flex-col ml-6 space-y-2 break-words">
                                            <div className="text-blue-600 uppercase text-md">
                                                {user.name}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}{" "}
            </div>
        </motion.div>
    );
};

export default OtherProfile;
