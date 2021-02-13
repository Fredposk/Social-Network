import BioEditor from "./BioEditor";
import React, { useState, useEffect } from "react";
import Uploader from "./Uploader";

const Profile = ({ profileInfo, img, picUpdate, bio, updateBio }) => {
    const [uploader, setUploader] = useState(false);

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex items-center mt-4 ml-6">
                    <img
                        className="object-cover w-16 h-16 rounded-full shadow-lg "
                        src={`${img}`}
                        alt="user Profile Picture"
                    />
                    <div className="flex flex-col ml-6 space-y-2">
                        <div className="text-2xl font-bold text-gray-800 uppercase ">
                            {profileInfo}
                        </div>
                        <div className="pb-1 border-b border-gray-100">
                            {" "}
                            {bio}
                        </div>
                    </div>
                </div>

                {/* buttons and editor */}
                <div className="flex items-center mt-4 mr-8">
                    <BioEditor bio={bio} updateBio={updateBio} />
                    <div>
                        <button
                            className="px-5 py-3 text-sm leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                            onClick={() => setUploader(!uploader)}
                        >
                            change picture
                        </button>

                        {uploader && <Uploader picUpdate={picUpdate} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
