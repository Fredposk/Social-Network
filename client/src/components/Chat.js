import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "./axios";
import { Link } from "react-router-dom";

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
            Hello world I am the Chat click me
        </motion.div>
    );
};

export default Chat;
