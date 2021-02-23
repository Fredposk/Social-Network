import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "./axios";
import { Link } from "react-router-dom";
import { chatMessage, chatMessages } from "../actions";
import { Socket } from "./Socket";
import { useSelector, useDispatch } from "react-redux";

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

    return (
        <motion.div variants={pageEnter} initial="hidden" animate="visible">
            <div>
                <div>type here</div>
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Type your message here"
                ></textarea>
                <button>Click here</button>
            </div>
        </motion.div>
    );
};

export default Chat;
