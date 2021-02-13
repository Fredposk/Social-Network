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
        <div className="relative">
            <div className="absolute rounded shadow right-8 top-2">
                <input
                    onChange={(e) => setFileName(e.target.files[0])}
                    type="file"
                />
                <button onClick={sendUpload}>Upload</button>
            </div>
        </div>
    );
};

export default Uploader;
