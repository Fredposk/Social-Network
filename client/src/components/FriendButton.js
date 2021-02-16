import React, { useState, useEffect } from "react";
import axios from "./axios";

const FriendButton = ({ id }) => {
    const [buttonText, setButtonText] = useState("");

    let abort;
    useEffect(async () => {
        if (!abort) {
            console.log(id);
            const status = await axios.get(`/users/friendstatus/${id}`);
            setButtonText(status.data.button);
        }
        return () => {
            abort = true;
        };
    }, [id, buttonText]);

    const handleClick = async () => {
        if (buttonText === "Send Friend Request") {
            const status = await axios.post("/users/friendrequest/send", {
                id: id,
            });
            setButtonText(status.data.button);
        } else if (
            buttonText === "End Friendship" ||
            buttonText === "Cancel Friend Request"
        ) {
            const status = await axios.post("/users/friendrequest/end", {
                id: id,
            });
            setButtonText(status.data.button);
        } else if (buttonText === "Accept Friend Request") {
            const status = await axios.post("/users/friendrequest/accept", {
                id: id,
            });
            console.log(status);
            setButtonText(status.data.button);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="px-3 py-3 text-sm leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-blue-800 border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
        >
            {buttonText}
        </div>
    );
};

export default FriendButton;
