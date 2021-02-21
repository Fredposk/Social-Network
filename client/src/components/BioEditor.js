// import React, { useState } from "react";
import axios from "./axios";

const BioEditor = ({ bio, updateBio, darkMode }) => {
    const handleSave = async (item) => {
        try {
            const data = await axios.post("/userdata/profile/bio", {
                newBio: item,
            });
            return updateBio(data);
        } catch (error) {
            console.log("error updating bio");
        }
    };

    return (
        <div className="">
            <button
                className={`flex items-center ${
                    darkMode
                        ? "text-black hover:border-white border-black hover:text-white"
                        : "text-gray-700 border-gray-300 "
                } justify-between px-5 py-3 text-sm leading-3 tracking-wider hover:text-gray-100 hover:border-blue-800 hover:bg-blue-800  uppercase transition duration-500 ease-in-out bg-transparent border  rounded shadow cursor-pointer `}
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
