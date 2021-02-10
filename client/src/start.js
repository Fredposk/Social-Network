import ReactDOM from "react-dom";
import App from "./components/App";
import Welcome from "./components/Welcome";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
