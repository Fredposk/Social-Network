import { Component } from "react";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderView: 1,
        };
    }

    determiner() {
        if (this.state.renderView === 1) {
            return (
                <>
                    <input name="email"></input>
                    <button>Click email</button>
                </>
            );
        } else if (this.state.renderView === 2) {
            return (
                <>
                    <h1>else if 2</h1>
                    <input name="password"></input>
                    <input name="code"></input>
                    <button>Click code</button>
                </>
            );
        } else if (this.state.renderView === 3) {
            return (
                <>
                    {" "}
                    <h1>sucess</h1>
                </>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>reset password</h1>
                {this.determiner}
            </div>
        );
    }
}
