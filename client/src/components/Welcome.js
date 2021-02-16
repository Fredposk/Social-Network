import Reg from "./Reg";
import Login from "./Login";
import Logo from "../Logo";
import Topwelcome from "./Topwelcome";
import { useState } from "react";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    visible: {
        color: "#000000",
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            staggerChildren: 1,
            duration: 2,
            repeatDelay: 2,
        },
    },
};

function Welcome() {
    const [dropDown, setDropDown] = useState(false);
    const [dropDown1, setDropDown1] = useState(false);

    return (
        <div className="flex flex-col justify-start h-screen bg-gray-100">
            <Topwelcome />
            <Logo />
            <div className="flex flex-col items-center justify-center mt-4">
                <motion.div
                    variants={container}
                    animate="visible"
                    className="font-black leading-tight tracking-tight text-center text-9xl"
                >
                    <motion.div
                        variants={container}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400"
                    >
                        Network.
                    </motion.div>
                    <motion.div
                        variants={container}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-indigo-600"
                    >
                        Meet.
                    </motion.div>
                    <motion.div
                        variants={container}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-400"
                    >
                        Develop.
                    </motion.div>
                </motion.div>
            </div>

            <div className="flex items-center justify-center mt-4 ">
                <div
                    onClick={() => setDropDown(!dropDown)}
                    className="px-5 py-3 mr-2 text-sm tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                >
                    Register now
                </div>

                <div
                    onClick={() => setDropDown1(!dropDown1)}
                    className="px-5 py-3 ml-2 text-sm tracking-wider text-gray-700 uppercase transition duration-500 ease-in-out bg-transparent border border-gray-300 rounded shadow cursor-pointer hover:text-black hover:border-black"
                >
                    Find out more
                </div>
            </div>
            <div className="inline-flex items-center justify-center mt-3">
                <div> {dropDown && <Login />}</div>
                <div>{dropDown1 && <Reg />}</div>
            </div>
        </div>
    );
}

export default Welcome;
