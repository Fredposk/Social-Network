import React, { useState } from "react";
import axios from "./axios";

const BioEditor = ({ bio, updateBio }) => {
    const handleSave = async (item) => {
        const data = await axios.post("/userdata/profile/bio", {
            newBio: item,
        });
        return updateBio(data);
    };

    return (
        <div className="">
            <button
                className="flex items-center justify-between px-5 py-3 text-sm leading-3 tracking-wider text-gray-700 uppercase transition duration-500 ease-in-out bg-transparent border border-gray-300 rounded shadow cursor-pointer hover:text-black hover:border-black"
                onClick={() => handleSave(bio)}
            >
                SAVE{" "}
                <svg
                    className="w-3 h-3 ml-2 fill-current "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                </svg>
            </button>
        </div>
    );
};

export default BioEditor;
