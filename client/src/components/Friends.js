import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getFriendsList, endFriend, acceptFriend } from "../actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const pageEnter = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", delay: 0.3, duration: 0.4 },
    },
};

const Friends = ({ updateLocation }) => {
    const dispatch = useDispatch();

    let abort;
    useEffect(() => {
        if (!abort) {
            updateLocation(location.pathname);
            dispatch(getFriendsList());
        } else {
            return;
        }
        return () => {
            abort = true;
            // cleanup
        };
    }, []);

    const friends = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((friend) => friend.accepted === true)
    );

    const wannabies = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((friend) => friend.accepted === false)
    );

    return (
        <motion.div
            variants={pageEnter}
            initial="hidden"
            animate="visible"
            className="flex justify-start"
        >
            <div className="flex flex-col items-center ">
                <div className="ml-12 text-2xl font-semibold tracking-wider md:text-2-xl">
                    Friends:
                </div>

                {friends &&
                    friends.map((friend, index) => {
                        return (
                            <motion.div
                                key={index}
                                className="inline-flex px-12 mt-6 mb-2 space-y-3 "
                            >
                                <div className="flex items-center ">
                                    <div>
                                        <Link to={`/user/${friend.id}`}>
                                            <img
                                                className="object-cover w-32 h-32 transition duration-500 ease-in-out rounded-lg shadow-md hover:opacity-80 "
                                                src={`${friend.avatar_url}`}
                                                alt="profile picture of {`${img}`}"
                                            />
                                        </Link>
                                    </div>
                                    <div className="flex flex-col w-1/2 ml-6 space-y-2 ">
                                        <Link to={`/user/${friend.id}`}>
                                            <div className="text-lg text-blue-600 uppercase">
                                                {friend.name}
                                            </div>
                                        </Link>
                                        <div className="text-center max-w-max">
                                            <div
                                                onClick={() =>
                                                    dispatch(
                                                        endFriend(friend.id)
                                                    )
                                                }
                                                className="px-2 py-2 mt-2 text-xs leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-red-500 border border-transparent rounded shadow cursor-pointer opacity-80 hover:bg-white hover:text-black hover:border-black"
                                            >
                                                End Friendship
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
            </div>

            <div>
                <div className="flex flex-col items-center">
                    <div className="ml-12 text-2xl font-semibold tracking-wider md:text-2-xl">
                        Pending Requests:
                    </div>
                    {wannabies &&
                        wannabies.map((wannabie, index) => {
                            return (
                                <div
                                    key={index}
                                    className="inline-flex px-12 mt-6 mb-2 space-y-3 "
                                >
                                    <div className="flex items-center ">
                                        <div>
                                            <Link to={`/user/${wannabie.id}`}>
                                                <img
                                                    className="object-cover w-32 h-32 transition duration-500 rounded-lg shadow-md hover:opacity-80 "
                                                    src={`${wannabie.avatar_url}`}
                                                    alt="profile picture of {`${img}`}"
                                                />
                                            </Link>
                                        </div>
                                        <div className="flex flex-col w-1/2 ml-6 space-y-2">
                                            <Link to={`/user/${wannabie.id}`}>
                                                <div className="text-lg text-blue-600 uppercase">
                                                    {wannabie.name}
                                                </div>
                                            </Link>
                                            <div className="text-center max-w-max">
                                                <div
                                                    onClick={() =>
                                                        dispatch(
                                                            acceptFriend(
                                                                wannabie.id
                                                            )
                                                        )
                                                    }
                                                    className="px-2 py-2 text-xs leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-blue-800 border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                                                >
                                                    Accept Request
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        dispatch(
                                                            endFriend(
                                                                wannabie.id
                                                            )
                                                        )
                                                    }
                                                    className="px-2 py-2 mt-2 text-xs leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-red-500 border border-transparent rounded shadow cursor-pointer opacity-80 hover:bg-white hover:text-black hover:border-black"
                                                >
                                                    Reject Request
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </motion.div>
    );
};

export default Friends;
