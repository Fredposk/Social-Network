import React from "react";
import { motion } from "framer-motion";
import { Route, Link } from "react-router-dom";

const hoverVariants = {
    hidden: {},
    visible: {
        y: -4,
        color: "#000000",
        duration: 0.4,
    },
};

const NavBar = ({ darkMode, currentTab }) => {
    return (
        <div
            className={`mt-4 mb-1 ${
                darkMode ? "border-black" : "border-gray-300"
            }  border-b  text-md`}
        >
            <div
                className={`flex ml-6 space-x-5 ${
                    darkMode ? "text-gray-800" : "text-gray-500"
                }`}
            >
                <Link to="/">
                    <motion.div
                        variants={hoverVariants}
                        whileHover="visible"
                        className={`border-b border-transparent   ${
                            currentTab === "/" ? "border-black" : ""
                        } cursor-pointer `}
                    >
                        Overview
                    </motion.div>
                </Link>
                <motion.div
                    variants={hoverVariants}
                    whileHover="visible"
                    className={`border-b border-transparent ${
                        currentTab === "/chat" ? "border-black" : ""
                    } cursor-pointer`}
                >
                    Chat
                </motion.div>
                <motion.div
                    variants={hoverVariants}
                    whileHover="visible"
                    className={` border-b border-transparent cursor-pointer `}
                >
                    Online
                </motion.div>
                <Link to="/friends">
                    <motion.div
                        variants={hoverVariants}
                        whileHover="visible"
                        className={`border-b border-transparent ${
                            currentTab == "/friends" ? "border-black" : ""
                        }  cursor-pointer`}
                    >
                        Friends
                    </motion.div>
                </Link>

                <Link to="/find/users">
                    <motion.div
                        variants={hoverVariants}
                        whileHover="visible"
                        className={`border-b border-transparent ${
                            currentTab == "/find/users" ? "border-black" : ""
                        }  cursor-pointer`}
                    >
                        Find People
                    </motion.div>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
