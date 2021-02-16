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

const Findusers = ({ updateLocation }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
    const [result, setResult] = useState("Check out who just joined!");

    let abort;
    useEffect(async () => {
        updateLocation(location.pathname);
        if (!abort) {
            if (search.length === 0) {
                const responseData = await axios.get("/findusers/recent");
                setUsers(responseData.data.recentUsers[0].rows);
                setResult("Check out who just joined!");
            } else {
                const responseData = await axios.get(
                    `/findusers/search/${search}`
                );
                if (responseData.data.users[0].rows.length === 0) {
                    setResult("Sorry, no users found");
                    setUsers([]);
                } else {
                    setUsers(responseData.data.users[0].rows);
                    setResult(`Results for: ${search}`);
                }
            }
        }
        return () => {
            abort = true;
        };
    }, [search]);

    return (
        <motion.div variants={pageEnter} initial="hidden" animate="visible">
            <div className="ml-12 text-2xl font-semibold tracking-wider md:text-2-xl">
                {result}
            </div>
            <div className="">
                <input
                    className="w-1/3 py-1 pl-2 my-6 ml-12 text-sm text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search Users.."
                />
            </div>

            {users.map((user, index) => {
                return (
                    <div
                        key={index}
                        className="inline-flex w-2/3 px-12 mt-6 mb-2 ml-6 space-y-3"
                    >
                        <Link to={`/user/${user.id}`}>
                            <div className="flex items-center ">
                                <div>
                                    <img
                                        className="object-cover w-32 h-32 rounded-lg shadow-md "
                                        src={`${user.avatar_url}`}
                                        alt="profile picture of {`${img}`}"
                                    />
                                </div>
                                <div className="flex flex-col w-1/2 ml-6 space-y-2">
                                    <div className="text-sm font-semibold text-gray-500">
                                        {user.bio}
                                    </div>
                                    <div className="text-lg text-blue-600 uppercase">
                                        {user.name}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </motion.div>
    );
};

export default Findusers;
