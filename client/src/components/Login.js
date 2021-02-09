import { useState } from "react";
import axios from "./axios";
import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Password from "./Password";

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
            console.log(error, "error durign login");
        }
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
            <HashRouter>
                <div>
                    <Link to="/Password">CLICK HERE TO RECOVER PASSWORD</Link>{" "}
                    <br />
                    <Route path="/Password" component={Password} />
                </div>
            </HashRouter>
        </div>
    );
};

export default Login;
