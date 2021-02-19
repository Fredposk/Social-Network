// import { useState } from "react";
// import axios from "./axios";
import { motion } from "framer-motion";

const pageEnter = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.3,
        },
    },
};

const Reg = () => {
    const getGit = async () => {
        window.location.replace(
            "https://github.com/login/oauth/authorize?client_id=72f26d442e09c7e4185a"
        );
    };

    return (
        <motion.div variants={pageEnter} initial="hidden" animate="visible">
            <div className="px-4 mx-auto mt-2 space-y-2 text-sm text-center text-gray-800 md:text-lg">
                <div className="">
                    NetCode is a developer friendly social network.
                </div>
                <div className="text-gray-600">
                    A Spiced 2021 React Project.
                </div>
                <div className="text-sm text-gray-600">
                    Must have a github account to
                    <a onClick={getGit} className="font-bold cursor-pointer">
                        {" "}
                        sign up.{" "}
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default Reg;
