import React from "react";

const Logo = () => {
    const getGit = async () => {
        window.location.replace(
            "https://github.com/login/oauth/authorize?client_id=72f26d442e09c7e4185a"
        );
    };
    return (
        <div className="flex items-center justify-between mt-3">
            <div className="flex items-center ml-40 cursor-pointer hover:opacity-80">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 m-3 transform rotate-180 "
                    viewBox="0 0 24 24"
                >
                    <path d="M24 22h-24l12-20z" />
                </svg>
                <div className="text-2xl font-semibold tracking-wider md:text-2-xl">
                    NetCode
                </div>
            </div>
            <div className="flex mr-24 space-x-2">
                <div className="px-2 py-1 text-gray-700 transition duration-500 border rounded shadow cursor-pointer border-gray-50 hover:shadow-md hover:border-black">
                    Careers
                </div>
                <div className="px-2 py-1 text-gray-700 transition duration-500 border rounded shadow cursor-pointer border-gray-50 hover:shadow-md hover:border-black">
                    Blog
                </div>
                <div className="px-2 py-1 text-gray-700 transition duration-500 border rounded shadow cursor-pointer border-gray-50 hover:shadow-md hover:border-black">
                    Feedback
                </div>
                <div
                    onClick={getGit}
                    className="px-5 py-3 text-sm leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                >
                    Login
                </div>
            </div>
        </div>
    );
};

export default Logo;
