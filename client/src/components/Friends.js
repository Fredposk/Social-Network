import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "./axios";
import { Link } from "react-router-dom";

const pageEnter = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "tween", delay: 0.2, duration: 0.4 },
    },
};

const Friends = ({ updateLocation }) => {
    useEffect(() => {
        updateLocation(location.pathname);
        return () => {
            // cleanup
        };
    }, []);

    return (
        <motion.div variants={pageEnter} initial="hidden" animate="visible">
            I am the friends page
        </motion.div>
    );
};

export default Friends;
