import { useState } from "react";

const ProfilePic = ({ img, size }) => {
    return (
        <div>
            <img width={`${size}`} src={`${img}`} alt="user Profile Picture" />
        </div>
    );
};

export default ProfilePic;
