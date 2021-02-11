import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
import React, { useState, useEffect } from "react";
import Uploader from "./Uploader";

const Profile = ({ profileInfo, img, picUpdate, bio, updateBio }) => {
    const [uploader, setUploader] = useState(false);

    return (
        <div>
            I am the profile component for {profileInfo} <br />
            {bio}
            <ProfilePic img={img} size={`50px`} />
            <p className="bg-red-400 " onClick={() => setUploader(!uploader)}>
                tiny camera thing to click
            </p>
            {uploader && <Uploader picUpdate={picUpdate} />}
            <BioEditor bio={bio} updateBio={updateBio} />
        </div>
    );
};

export default Profile;
