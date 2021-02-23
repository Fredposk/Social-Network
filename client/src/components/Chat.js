import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// import axios from "./axios";
import { Link } from "react-router-dom";
// import { chatMessages, chatMessage } from "../actions";
import { socket } from "./Socket";
import { useSelector } from "react-redux";

const pageEnter = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", delay: 0.3, duration: 0.5 },
    },
};

const Chat = ({ updateLocation }) => {
    let abort;
    useEffect(() => {
        if (!abort) {
            updateLocation(location.pathname);
        }
        return () => {
            abort = true;
        };
    }, []);

    const messages = useSelector((state) => state.messages);

    const [inputField, setInputField] = useState("");

    const newMessage = () => {
        socket.emit("newMessage", { text: inputField });
        setInputField("");
    };

    const elemRef = useRef();

    return (
        <motion.div
            variants={pageEnter}
            initial="hidden"
            animate="visible"
            className=""
        >
            <div className="inline-flex flex-col border border-red-500 ">
                <div
                    ref={elemRef}
                    className="inline-flex flex-col overflow-y-auto "
                >
                    {messages &&
                        messages.map((message, index) => {
                            return (
                                <div
                                    key={index}
                                    className="inline-flex flex-col space-y-1 "
                                >
                                    <div className="px-3 py-1 duration-150 ease-in transform border border-blue-200 rounded-lg shadow-md hover:-translate-y-1">
                                        <div className="flex items-center space-x-1 w-96 ">
                                            {" "}
                                            <Link to={`/user/${message[2]}`}>
                                                {" "}
                                                <img
                                                    className="object-cover w-8 h-8 rounded-full"
                                                    src={`${message[1]}`}
                                                />{" "}
                                            </Link>{" "}
                                            <div className="font-sans text-sm text-gray-800 break-words">
                                                {message[3]}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="text-xs text-blue-700">
                                                {message[0]}
                                            </div>
                                            <div className="text-xs font-thin justify-self-end ">
                                                {message[4]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <textarea
                    className="py-1 pl-2 mt-3 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                    name=""
                    id=""
                    cols="20"
                    rows="3"
                    placeholder="Type your message here"
                    onChange={(e) => {
                        setInputField(e.target.value);
                    }}
                    value={inputField}
                ></textarea>
                <button onClick={newMessage}>Click here</button>
            </div>
        </motion.div>
    );
};

export default Chat;
