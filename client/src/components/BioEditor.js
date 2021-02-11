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
            <h1>Hello I am the bio editor</h1>

            <button onClick={() => setBioedit(!bioedit)}>
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
