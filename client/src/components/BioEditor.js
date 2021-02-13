import React, { useState } from "react";
import axios from "./axios";

const BioEditor = ({ bio, updateBio }) => {
    const [bioedit, setBioedit] = useState(false);
    const [textValue, setTextValue] = useState(bio);

    const handleSave = async (item) => {
        const data = await axios.post("/userdata/profile/bio", {
            newBio: item,
        });
        setBioedit(false);
        return updateBio(data);
    };

    return (
        <div>
            <button
                className="px-5 py-3 text-sm leading-3 tracking-wider text-gray-700 uppercase transition duration-500 ease-in-out bg-transparent border border-gray-300 rounded shadow cursor-pointer hover:text-black hover:border-black"
                onClick={() => setBioedit(!bioedit)}
            >
                click to edit bio
            </button>
            <button onClick={() => handleSave(textValue)}>SAVE</button>
            {bioedit && (
                <textarea
                    cols="30"
                    rows="10"
                    defaultValue={`${textValue}`}
                    onChange={(e) => setTextValue(e.target.value)}
                />
            )}
        </div>
    );
};

export default BioEditor;
