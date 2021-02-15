import React, { useState, useEffect } from "react";
import axios from "./axios";

const OtherProfile = (props) => {
    const [profileImg, setProfileImg] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    useEffect(async () => {
        props.updateLocation("/find/users");

        const user = props.match.params.id;
        const result = await axios.get(`/api/user/${user}`);
        console.log(result.data);

        const { avatar_url, name, bio, id } = result.data.user;
        setProfileImg(avatar_url);
        setName(name);
        setBio(bio);

        if (id === result.data.requester) {
            props.history.push("/");
        }
    }, []);

    return (
        <div>
            <div className="inline-flex w-2/3 p-12 mt-6 ml-6 ">
                <div className="flex items-center ">
                    <div>
                        <img
                            className="object-cover w-32 h-full rounded-lg shadow-md "
                            src={`${profileImg}`}
                            alt="profile picture of {`${img}`}"
                        />
                    </div>
                    <div className="flex flex-col w-1/2 ml-6 space-y-2">
                        <div className="font-semibold text-gray-800">{bio}</div>
                        <div className="text-lg text-blue-600 uppercase ">
                            {name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherProfile;
