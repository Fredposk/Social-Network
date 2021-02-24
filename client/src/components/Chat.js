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

const Chat = ({ updateLocation, darkMode }) => {
    const [saveSpin, setSaveSpin] = useState(false);

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
        setSaveSpin(true);
        socket.emit("newMessage", { text: inputField });
        setInputField("");
        setTimeout(() => {
            setSaveSpin(false);
        }, 500);
    };

    const newRef = useRef();

    useEffect(() => {
        newRef.current.scrollTop =
            newRef.current.scrollHeight - newRef.current.clientHeight;
    });

    return (
        <motion.div
            variants={pageEnter}
            initial="hidden"
            animate="visible"
            className="max-h-screen overflow-auto"
        >
            <div className="inline-flex flex-col m-2 border border-blue-600 rounded-lg">
                <div ref={newRef} className="inline-flex flex-col">
                    {messages &&
                        messages.map((message, index) => {
                            return (
                                <div
                                    key={index}
                                    className="px-3 py-1 duration-150 ease-in transform border border-blue-200 rounded-lg shadow-md hover:border-blue-800"
                                >
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
                            );
                        })}
                </div>

                <div className="flex flex-col">
                    <textarea
                        className="py-1 pl-2 mt-2 text-sm text-gray-700 bg-gray-200 shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                        name=""
                        id=""
                        cols="10"
                        rows="2"
                        placeholder="Type your message here"
                        onChange={(e) => {
                            setInputField(e.target.value);
                        }}
                        style={{ resize: "none" }}
                        value={inputField}
                        onKeyDown={(e) => {
                            e.key === "enter" || e.key === "Enter"
                                ? newMessage
                                : "";
                        }}
                    ></textarea>
                    <button
                        className={`flex items-center ${
                            darkMode
                                ? "text-black hover:border-white border-black hover:text-white"
                                : "text-gray-700 border-gray-300 "
                        } justify-between px-5 mt-2 py-3 text-sm leading-3 tracking-wider hover:text-gray-100 hover:border-blue-800 hover:bg-blue-800  uppercase transition duration-500 ease-in-out bg-transparent border  rounded shadow cursor-pointer `}
                        onClick={newMessage}
                    >
                        SEND MESSAGE{" "}
                        {saveSpin ? (
                            <svg
                                className="w-3 h-3 ml-2 fill-current animate animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4 4-4v8zm0-12V0l4 4-4 4z" />
                            </svg>
                        ) : (
                            <svg
                                className="w-3 h-3 ml-2 fill-current "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Chat;
