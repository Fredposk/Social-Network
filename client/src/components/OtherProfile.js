import React, { useState, useEffect } from "react";
import axios from "./axios";
import { motion } from "framer-motion";
import FriendButton from "./FriendButton";

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

    useEffect(async () => {
        props.updateLocation("/find/users");

        const user = props.match.params.id;
        setId(user);
        const result = await axios.get(`/api/user/${user}`);
        const { avatar_url, name, bio, id } = result.data.user;
        setProfileImg(avatar_url);
        setName(name);
        setBio(bio);

        if (id === result.data.requester) {
            props.history.push("/");
        }
    }, []);

    return (
        <motion.div variants={pageEnter} initial="hidden" animate="visible">
            <div className="inline-flex w-2/3 p-12 mt-6 ml-6 ">
                <div className="flex items-center ">
                    <div>
                        <img
                            className="object-cover w-32 h-32 rounded-lg shadow-md "
                            src={`${profileImg}`}
                            alt="profile picture of {`${img}`}"
                        />
                    </div>
                    <div className="inline-flex flex-col w-1/2 ml-6 space-y-2">
                        <div className="font-semibold text-gray-800">{bio}</div>
                        <div className="text-lg text-blue-600 uppercase ">
                            {name}
                        </div>
                        <div className="text-center max-w-max">
                            <FriendButton id={otherId} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Here I might do a button to go back to search list sending the the previouos search back as a prop??? */}
            {/* <button>Back</button> */}
            {/* here */}
        </motion.div>
    );
};

export default OtherProfile;
