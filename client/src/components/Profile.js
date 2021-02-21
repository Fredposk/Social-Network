import BioEditor from "./BioEditor";
import React, { useState, useEffect } from "react";
import Uploader from "./Uploader";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TwitterFeed from "./TwitterFeed";

const pageEnter = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", delay: 0.3, duration: 0.4 },
    },
};

let Profile = ({
    profileInfo,
    img,
    picUpdate,
    bio,
    updateBio,
    updateLocation,
    feed,
    updateFeed,
    darkMode,
}) => {
    const [uploader, setUploader] = useState(false);

    useEffect(() => {
        updateLocation(location.pathname);
    });

    const [writeBio, setwriteBio] = useState(bio);

    const closeUploader = (item) => {
        setUploader(item);
    };

    return (
        <motion.div variants={pageEnter} initial="hidden" animate="visible">
            <div className="flex justify-between ">
                <div className="flex items-center w-1/3 mt-4 ml-6">
                    <img
                        className="object-cover w-32 rounded-lg shadow-lg h-44 "
                        src={`${img}`}
                        alt="user Profile Picture"
                    />
                    <div className="flex flex-col w-4/5 ml-6 space-y-3">
                        <div className="text-2xl font-bold text-black uppercase ">
                            {profileInfo}
                        </div>

                        <textarea
                            rows="3"
                            style={{ resize: "none" }}
                            className="py-1 pl-2 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 ∫focus:border-transparent"
                            onChange={(e) => setwriteBio(e.target.value)}
                            type="text"
                            placeholder="Tell us more about yourself"
                            defaultValue={`${bio}`}
                        />
                        <div className="flex space-x-2">
                            <BioEditor
                                bio={writeBio}
                                updateBio={updateBio}
                                darkMode={darkMode}
                            />
                            <div className="">
                                <div>
                                    <button
                                        className="px-5 py-3 text-sm leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                                        onClick={() => setUploader(!uploader)}
                                    >
                                        change picture
                                    </button>
                                </div>
                                {uploader && (
                                    <Uploader
                                        picUpdate={picUpdate}
                                        closeUploader={closeUploader}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <TwitterFeed
                    feed={feed}
                    updateFeed={updateFeed}
                    darkMode={darkMode}
                />
            </div>
        </motion.div>
    );
};

export default Profile;
