import React, { useState, useEffect } from "react";
import axios from "./axios";

const FriendButton = ({ id }) => {
    const [buttonText, setButtonText] = useState("");
    const [rejectButton, setRejectButton] = useState(false);

    let abort;
    useEffect(async () => {
        if (!abort) {
            try {
                const status = await axios.get(`/users/friendstatus/${id}`);
                setButtonText(status.data.button);
                status.data.btn.length > 0 ? setRejectButton(true) : "";
            } catch (error) {
                console.log(error);
            }
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

    const handleReject = async () => {
        try {
            const status = await axios.post("/users/friendrequest/end", {
                id: id,
            });
            console.log(status);
            setRejectButton(false);
            setButtonText(status.data.button);
        } catch (error) {
            console.log("error trying to reject the request", error);
        }
    };
    return (
        <div>
            <div
                onClick={handleClick}
                className="px-3 py-3 text-xs leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-blue-800 border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
            >
                {buttonText}
            </div>
            {rejectButton && (
                <div
                    onClick={handleReject}
                    className="px-3 py-3 mt-2 text-xs leading-3 tracking-wider text-white uppercase transition duration-500 ease-in-out bg-red-600 border border-transparent rounded shadow cursor-pointer opacity-80 hover:bg-white hover:text-black hover:border-black"
                >
                    Reject Friend Request
                </div>
            )}
        </div>
    );
};

export default FriendButton;
