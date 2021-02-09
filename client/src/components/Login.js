import { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onClick = async () => {
        const loginData = {
            email: email,
            password: password,
        };
        try {
            const response = await axios.post("/login", loginData);
            if (response.status === 201) {
                console.log(response, "This is the login errors");
            } else if (response.status === 200) {
                location.replace("/");
            }
        } catch (error) {
            console.log(error, "error during login");
        }
    };

    const getGit = async () => {
        window.location.replace(
            "https://github.com/login/oauth/authorize?client_id=72f26d442e09c7e4185a"
        );
    };

    return (
        <div>
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
            <button onClick={onClick}>Submit</button>
            <button onClick={getGit}>Log in with git</button>

            <div>
                <Link to="/ResetPassword">CLICK HERE TO RECOVER PASSWORD</Link>{" "}
                <br />
            </div>
        </div>
    );
};

export default Login;
