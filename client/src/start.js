import ReactDOM from "react-dom";
// import HelloWorld from "./components/HelloWorld";
import Welcome from "./components/Welcome";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <h1>This is the logged in page</h1>;
}

ReactDOM.render(elem, document.querySelector("main"));
