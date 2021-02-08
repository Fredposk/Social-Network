import { useState } from "react";
import axios from "axios";

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
        console.log(userRegData);

        try {
            const response = await axios.post("/registration", userRegData);
            if (response.statusCode != 200) {
                console.log("error");
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
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
            <button onClick={onClick}>Submit</button>
        </div>
    );
};

export default Reg;
