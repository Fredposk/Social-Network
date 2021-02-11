import axios from "axios";
import { useState } from "react";

const Uploader = ({ picUpdate }) => {
    const [filename, setFileName] = useState(null);

    const sendUpload = async () => {
        const fd = new FormData();
        fd.append("file", filename);
        try {
            const newPic = await axios.post("/userdata/profile/picture", fd);
            picUpdate(newPic);
            //  ///
        } catch (error) {
            console.log("error in uploading image");
        }
    };

    return (
        <div>
            <input
                onChange={(e) => setFileName(e.target.files[0])}
                type="file"
            />
            <button onClick={sendUpload}>Upload</button>
            {/* <button
                onClick={() => {
                    picUpdate("banana");
                }}
            >
                change
            </button> */}
        </div>
    );
};

export default Uploader;
