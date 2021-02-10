import axios from "axios";
import { useState } from "react";

const Uploader = () => {
    const [filename, setFileName] = useState(null);

    const sendUpload = async () => {
        const fd = new FormData();
        fd.append("file", filename);
        // fd.append("_csrf", csrfToken);
        try {
            axios.post("/userdata/profile/picture", fd);
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
        </div>
    );
};

export default Uploader;
