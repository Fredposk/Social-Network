import React from "react";
import ProfilePic from "./ProfilePic";

const Logoinside = ({ name, picture }) => {
    return (
        <div className="flex items-center mt-2 ml-4 ">
            <div className="">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 m-3 transform rotate-180 cursor-pointer hover:opacity-75 md:w-10 md:h-10"
                    viewBox="0 0 24 24"
                >
                    <path d="M24 22h-24l12-20z" />
                </svg>
            </div>

            <div className="flex items-center space-x-6 ">
                <div className="text-xl italic font-light text-gray-500">/</div>
                <img
                    className="object-cover w-8 h-8 rounded-full shadow "
                    src={`${picture}`}
                    alt="user Profile Picture"
                />
                <div className="tracking-wider text-md md:text-lg">{name}</div>
                <div className="px-1 py-2 ml-2 border border-gray-200 rounded shadow cursor-pointer">
                    <svg
                        className="w-4 h-4 transform rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M.7 9.3l4.8-4.8 1.4 1.42L2.84 10l4.07 4.07-1.41 1.42L0 10l.7-.7zm18.6 1.4l.7-.7-5.49-5.49-1.4 1.42L17.16 10l-4.07 4.07 1.41 1.42 4.78-4.78z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Logoinside;