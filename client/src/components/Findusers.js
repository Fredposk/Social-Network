import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "./axios";

const pageEnter = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "tween", delay: 0.2, duration: 0.4 },
    },
};

const Findusers = ({ updateLocation }) => {
    const [users, setUsers] = useState([]);
    const [searched, setsearched] = useState([]);

    useEffect(async () => {
        updateLocation(location.pathname);
        try {
            const users = await axios.get("/findusers/recent");
            setUsers(users.data.recentUsers[0].rows);
        } catch (error) {
            console.log("failed to get recent users");
        }
    }, []);

    let abort;
    useEffect(async () => {
        if (!abort) {
            try {
                const users = await axios.get(`/findusers/search/${searched}`);
                console.log(users.data.users[0].rows);
                setsearched(searched);
            } catch (error) {
                console.log("failed search");
            }
        }
        return () => {
            abort = true;
        };
    }, [searched]);

    return (
        <motion.div variants={pageEnter} initial="hidden" animate="visible">
            <div className="ml-12 text-2xl font-semibold tracking-wider md:text-2-xl">
                Check out who just joined
            </div>
            <div className="bg-red-300">
                <input
                    onChange={(e) => setsearched(e.target.value)}
                    type="text"
                    placeholder="Search Users.."
                />
            </div>
            <div>{searched}</div>
            {users.map((user, index) => {
                return (
                    <div
                        key={index}
                        className="inline-flex w-2/3 px-12 mt-6 mb-2 ml-6 space-y-3"
                    >
                        <div className="flex items-center ">
                            <div>
                                <img
                                    className="object-cover w-32 h-32 rounded-lg shadow-md "
                                    src={`${user.avatar_url}`}
                                    alt="profile picture of {`${img}`}"
                                />
                            </div>
                            <div className="flex flex-col w-1/2 ml-6 space-y-2">
                                <div className="font-semibold text-gray-800">
                                    {user.bio}
                                </div>
                                <div className="text-lg text-blue-600 uppercase">
                                    {user.name}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
};

export default Findusers;
