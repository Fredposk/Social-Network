import { useState } from "react";
import Uploader from "./Uploader";

const ProfilePic = ({ img }) => {
    const [uploader, setUploader] = useState(false);

    return (
        <div>
            {uploader && <Uploader />}
            <img
                width="100px"
                src={`${img}`}
                alt="user Profile Picture"
                onClick={() => setUploader(!uploader)}
            />
        </div>
    );
};

export default ProfilePic;
