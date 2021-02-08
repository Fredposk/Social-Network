import { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // old school way
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log(this.state)
        );
    }
    handleClick() {
        console.log("clicked");

        axios
            .post("/registration")
            .then((response) => {
                console.log(response);

                if (error) {
                    console.log("set error");
                } else {
                    location.replace("/");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <input
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    name="first"
                    type="text"
                    placeholder="first"
                ></input>
                <input
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    name="last"
                    type="text"
                    placeholder="last"
                ></input>
                <input
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    name="email"
                    type="text"
                    placeholder="email"
                ></input>
                <input
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    name="password"
                    type="password"
                    placeholder="password"
                ></input>
                <button onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
}
