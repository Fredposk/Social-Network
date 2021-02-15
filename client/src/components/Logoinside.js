import axios from "./axios";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const Logoinside = ({ name, picture }) => {
    const logOut = async () => {
        try {
            await axios.get("/logout");
        } catch (error) {
            console.log("error logging out");
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center mt-2 ml-4 ">
                <motion.div className="">
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 m-3 transform rotate-180 cursor-pointer hover:opacity-75 md:w-10 md:h-10"
                        viewBox="0 0 24 24"
                    >
                        <path d="M24 22h-24l12-20z" />
                    </motion.svg>
                </motion.div>

                <div className="flex items-center space-x-6 ">
                    <div className="text-xl italic font-light text-gray-500">
                        /
                    </div>
                    <img
                        className="object-cover w-8 h-8 rounded-full shadow "
                        src={`${picture}`}
                        alt="user Profile Picture"
                    />
                    <div className="tracking-wider text-md md:text-lg">
                        {name}
                    </div>
                    <div className="px-1 py-2 ml-2 text-gray-500 transition duration-500 border border-gray-200 rounded shadow cursor-pointer hover:border-black hover:text-black">
                        <svg
                            className="w-4 h-4 transform rotate-90 fill-current "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M.7 9.3l4.8-4.8 1.4 1.42L2.84 10l4.07 4.07-1.41 1.42L0 10l.7-.7zm18.6 1.4l.7-.7-5.49-5.49-1.4 1.42L17.16 10l-4.07 4.07 1.41 1.42 4.78-4.78z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex mr-6 space-x-2">
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
                    onClick={logOut}
                    className="px-5 py-2 text-sm tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                >
                    {" "}
                    Sign out
                </div>
            </div>
        </div>
    );
};

export default Logoinside;
