import axios from "axios";
import { useState } from "react";

const Uploader = ({ picUpdate, closeUploader }) => {
    const [filename, setFileName] = useState(null);
    const [saveSpin, setSaveSpin] = useState(false);
    const sendUpload = async () => {
        const fd = new FormData();
        fd.append("file", filename);
        try {
            setSaveSpin(true);
            const newPic = await axios.post("/userdata/profile/picture", fd);
            picUpdate(newPic);
            setTimeout(() => {
                setSaveSpin(false);
            }, 500);
            closeUploader(false);
            //  ///
        } catch (error) {
            console.log("error in uploading image");
        }
    };

    return (
        <div className="">
            <div className="fixed flex items-center px-2 py-1 mt-3 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md left-6 focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent">
                <input
                    onChange={(e) => setFileName(e.target.files[0])}
                    type="file"
                />
                <button
                    className="px-2 py-1 text-sm leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-blue-800 border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                    onClick={sendUpload}
                >
                    {saveSpin ? (
                        <svg
                            className="w-3 h-3 ml-2 fill-current animate animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4 4-4v8zm0-12V0l4 4-4 4z" />
                        </svg>
                    ) : (
                        "UPLOAD"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Uploader;
