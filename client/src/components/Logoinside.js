import axios from "./axios";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const picEnter = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            delay: 0.3,
            duration: 0.4,
        },
    },
};

const Logoinside = ({ name, picture, activatedarkMode, darkMode }) => {
    const logOut = async () => {
        try {
            await axios.get("/logout");

            setTimeout(() => {
                window.location.replace("/welcome");
            }, 500);
        } catch (error) {
            console.log("error logging out");
        }
    };

    return (
        <div className="flex items-center justify-between ">
            <motion.div
                variants={picEnter}
                initial="hidden"
                animate="visible"
                className="flex items-center mt-2 ml-4 "
            >
                <motion.div className="">
                    <Link to="/">
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 m-3 transform rotate-180 cursor-pointer hover:opacity-75 md:w-10 md:h-10"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 22h-24l12-20z" />
                        </motion.svg>
                    </Link>
                </motion.div>

                <div className="flex items-center space-x-6 ">
                    <div
                        className={`text-xl italic ${
                            darkMode ? "text-black" : "text-gray-500"
                        } font-light `}
                    >
                        /
                    </div>
                    <img
                        className="object-cover w-8 h-8 rounded-full shadow "
                        src={`${picture}`}
                        alt="user Profile Picture"
                    />
                    <div className="tracking-wider text-black text-md md:text-lg">
                        {name}
                    </div>
                    <div
                        onClick={activatedarkMode}
                        className={`px-1 py-2 ml-2 ${
                            darkMode
                                ? "text-black border-black hover:border-white hover:text-white"
                                : "text-gray-500 border-gray-200 hover:border-black hover:text-black"
                        }   transition duration-500 border  rounded shadow cursor-pointer  `}
                    >
                        <svg
                            className="w-4 h-4 transform rotate-90 fill-current "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M.7 9.3l4.8-4.8 1.4 1.42L2.84 10l4.07 4.07-1.41 1.42L0 10l.7-.7zm18.6 1.4l.7-.7-5.49-5.49-1.4 1.42L17.16 10l-4.07 4.07 1.41 1.42 4.78-4.78z" />
                        </svg>
                    </div>
                </div>
            </motion.div>
            <div className="flex mr-6 space-x-2">
                <div
                    className={`px-2 py-1  ${
                        darkMode
                            ? "text-black hover:border-white border-black hover:text-white "
                            : "text-gray-600 hover:border-black border-gray-50 hover:text-black"
                    }  transition duration-500 border rounded shadow cursor-pointer   hover:shadow-md `}
                >
                    Careers
                </div>
                <div
                    className={`px-2 py-1  ${
                        darkMode
                            ? "text-black hover:border-white border-black hover:text-white "
                            : "text-gray-600 hover:border-black border-gray-50 hover:text-black"
                    }  transition duration-500 border rounded shadow cursor-pointer   hover:shadow-md `}
                >
                    Blog
                </div>
                <div
                    className={`px-2 py-1  ${
                        darkMode
                            ? "text-black hover:border-white border-black hover:text-white "
                            : "text-gray-600 hover:border-black border-gray-50 hover:text-black"
                    }  transition duration-500 border rounded shadow cursor-pointer   hover:shadow-md `}
                >
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
