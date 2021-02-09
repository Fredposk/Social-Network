import ReactDOM from "react-dom";
// import HelloWorld from "./components/HelloWorld";
import Welcome from "./components/Welcome";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <p>I'm not the welcome route!</p>;
}

ReactDOM.render(elem, document.querySelector("main"));
