import Draggable from "react-draggable";
import React, { useState, useEffect } from "react";
import axios from "./axios";

const Quotes = () => {
    const [quotes, setQuotes] = useState("");
    const number = Math.floor(Math.random() * Math.floor(1643));

    useEffect(async () => {
        let abort;
        if (!abort) {
            const quoteApi = await axios.get("https://type.fit/api/quotes");
            setQuotes(quoteApi.data[number]);
        }
        return () => {
            abort = true;
        };
    }, []);

    return (
        <div className="inline-flex flex-col items-center w-1/3 px-5 py-3 mt-2 ml-6 bg-blue-100 rounded-full">
            <div className="font-normal tracking-tight text-gray-700 break-words">
                {quotes && quotes.text}
            </div>
            <div className="font-light tracking-normal text-gray-600">
                - {quotes && quotes.author}
            </div>
        </div>
    );
};

export default Quotes;
