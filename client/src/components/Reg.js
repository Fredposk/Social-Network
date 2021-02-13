import { useState } from "react";
import axios from "./axios";

const Reg = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onClick = async () => {
        const userRegData = {
            first: first,
            last: last,
            email: email,
            password: password,
        };
        // console.log(userRegData);

        try {
            const response = await axios.post("/registration", userRegData);
            if (response.status === 201) {
                console.log(response, "checked errors");
                // From here I can access all errors from express-validator
            } else if (response.status === 200) {
                location.replace("/");
            }
        } catch (error) {
            console.log(error, "caught error in client side");
        }
    };

    const getGit = async () => {
        window.location.replace(
            "https://github.com/login/oauth/authorize?client_id=72f26d442e09c7e4185a"
        );
    };

    return (
        <div>
            {/* <input
                onChange={(e) => {
                    setFirst(e.target.value);
                }}
                name="first"
                value={first}
                type="text"
                placeholder="first"
            ></input>
            <br />
            <input
                onChange={(e) => {
                    setLast(e.target.value);
                }}
                name="last"
                type="text"
                placeholder="last"
            ></input>
            <br />
            <input
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                name="email"
                type="text"
                placeholder="email"
            ></input>
            <br />
            <input
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                name="password"
                type="password"
                placeholder="password"
            ></input>
            <br />
            <button onClick={onClick}>Submit</button> */}

            <div className="px-4 mx-auto mt-2 space-y-2 text-sm text-center text-gray-800 md:text-lg">
                <div className="">
                    NetCode is a developer social network, by developers, for
                    developers
                </div>
                <div>
                    Must have a github account to enter,
                    <a onClick={getGit} className="font-bold cursor-pointer">
                        {" "}
                        sign up{" "}
                    </a>
                    today
                </div>
            </div>

            {/* <button onClick={getGit}>Log IN with Github account</button> */}
        </div>
    );
};

export default Reg;
