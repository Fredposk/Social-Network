import ReactDOM from "react-dom";
import Welcome from "./components/Welcome";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <p>At the home page I guess</p>;
}

ReactDOM.render(elem, document.querySelector("main"));
