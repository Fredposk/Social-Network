import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Reg from "./Reg";
import Login from "./Login";

function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>

            <HashRouter>
                <div>
                    <Link to="/login">Click here to Log in!</Link> <br />
                    <Link to="/">Click here to Register!</Link>
                    <Route exact path="/" component={Reg} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

export default Welcome;
