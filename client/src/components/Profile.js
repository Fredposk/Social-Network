import BioEditor from "./BioEditor";
import React, { useState, useEffect } from "react";
import Uploader from "./Uploader";
import { motion } from "framer-motion";

const pageEnter = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "tween", delay: 0.2, duration: 0.4 },
    },
};

let Profile = ({
    profileInfo,
    img,
    picUpdate,
    bio,
    updateBio,
    updateLocation,
}) => {
    const [uploader, setUploader] = useState(false);

    useEffect(() => {
        updateLocation(location.pathname);
    });

    if (bio === null) {
        bio = "Tell us more about yourself";
    }

    const [writeBio, setwriteBio] = useState(bio);

    return (
        <motion.div variants={pageEnter} initial="hidden" animate="visible">
            <div className="flex justify-between">
                <div className="flex items-center mt-4 ml-6">
                    <img
                        className="object-cover w-32 rounded-lg shadow-lg h-36 "
                        src={`${img}`}
                        alt="user Profile Picture"
                    />
                    <div className="flex flex-col ml-6 space-y-3">
                        <div className="text-2xl font-bold text-gray-800 uppercase ">
                            {profileInfo}
                        </div>

                        <textarea
                            rows="3"
                            style={{ resize: "none" }}
                            className="w-4/5 py-1 pl-2 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 ∫focus:border-transparent"
                            onChange={(e) => setwriteBio(e.target.value)}
                            type="text"
                            placeholder="Tell us more about yourself"
                            defaultValue={`${bio}`}
                        />
                        <BioEditor bio={writeBio} updateBio={updateBio} />
                    </div>
                </div>

                {/* buttons and editor */}
                <div className="flex items-center mt-4 mr-8">
                    <div>
                        <button
                            className="px-5 py-3 text-sm leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                            onClick={() => setUploader(!uploader)}
                        >
                            change picture
                        </button>
                    </div>
                    {uploader && <Uploader picUpdate={picUpdate} />}
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
