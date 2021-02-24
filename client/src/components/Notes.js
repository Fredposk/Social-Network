import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import axios from "./axios";

const Notes = ({ darkMode }) => {
    const [noteGen, setNoteGen] = useState("");

    let receivedNotes;
    let abort;
    useEffect(async () => {
        if (!abort) {
            const notes = await axios.get("/api/myNotes");
            receivedNotes = notes.data.notes.map((note) => {
                const x = note.layerx;
                const y = note.layery;
                const words = note.note_text;
                const id = note.note_id;
                return { x: x, y: y, words: words, id: id };
            });
            setNoteGen(receivedNotes);
        }
        return () => {
            abort = true;
        };
    }, []);

    const [text, settext] = useState("");

    const addNew = async () => {
        settext(" ");
        try {
            const response = await axios.post("/api/myNotes/addNew", {
                x: 0,
                y: 0,
                words: text,
            });
            let copy = [...noteGen];
            copy = [
                ...copy,
                { x: 0, y: 0, words: text, id: response.data.id[0].note_id },
            ];

            setNoteGen(copy);
        } catch (error) {
            console.log("error creating new notes", error);
        }
    };
    const dragPosition = async (e, id) => {
        try {
            await axios.post("/api/myNotes/posix", {
                x: e.layerX,
                y: e.layerY,
                id: id,
            });
        } catch (error) {
            console.log("error posititioning", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.post("/api/myNotes/delete", { id: id });
            const notes = await axios.get("/api/myNotes");
            receivedNotes = notes.data.notes.map((note) => {
                const x = note.layerx;
                const y = note.layery;
                const words = note.note_text;
                const id = note.note_id;
                return { x: x, y: y, words: words, id: id };
            });
            setNoteGen(receivedNotes);
        } catch (error) {
            console.log("error deleting note", error);
        }
    };

    return (
        <div>
            <div className="mt-2 ml-6 ">
                <div className="inline-flex items-center w-1/3 px-5 py-3 space-x-1">
                    <input
                        type="text"
                        placeholder="Feed me some Post-its!"
                        onChange={(e) => {
                            settext(e.target.value);
                        }}
                        maxLength="140"
                        defaultValue={`${text}`}
                        className="py-3 pl-2 text-sm leading-3 text-gray-700 bg-gray-200 rounded-lg shadow-md focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                    ></input>
                    <button
                        className={`flex items-center ${
                            darkMode
                                ? "text-black hover:border-white border-black hover:text-white"
                                : "text-gray-700 border-gray-300 "
                        } justify-between px-5 py-3 text-sm leading-3 tracking-wider hover:text-gray-100 hover:border-blue-800 hover:bg-blue-800  uppercase transition duration-500 ease-in-out bg-transparent border  rounded shadow cursor-pointer `}
                        onClick={addNew}
                    >
                        Add Note
                    </button>
                </div>
            </div>

            {noteGen &&
                noteGen.map((note) => {
                    return (
                        <Draggable
                            key={note.id}
                            defaultPosition={{ x: note.x, y: note.y }}
                            bounds="body"
                            onStop={(e) => dragPosition(e, note.id)}
                        >
                            <div className="relative inline-block w-2/12 p-3 text-sm font-semibold text-gray-600 break-words bg-yellow-400 rounded shadow-lg cursor-move">
                                {note.words}
                                <svg
                                    onClick={() => {
                                        deleteNote(note.id);
                                    }}
                                    className="absolute w-4 h-4 cursor-pointer bottom-1 right-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
                                </svg>
                            </div>
                        </Draggable>
                    );
                })}
        </div>
    );
};

export default Notes;
