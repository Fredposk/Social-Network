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
        <div className="relative mt-2">
            <div className="fixed flex items-center px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md left-6 focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent">
                <input
                    onChange={(e) => setFileName(e.target.files[0])}
                    type="file"
                />
                <button
                    className="px-2 py-1 text-sm leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-blue-800 border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                    onClick={sendUpload}
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default Uploader;
