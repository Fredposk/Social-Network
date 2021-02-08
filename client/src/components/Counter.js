// import { Component } from "react";

// export default class Counter extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0,
//             name: "",
//         };
//     }
//     componentDidMount() {
//         console.log("hello Im mounted");
//     }
//     increment() {
//         this.setState({ count: this.state.count + 1 });
//     }

//     handleChange(e) {
//         this.setState({ name: e.target.value });
//     }
//     render() {
//         return (
//             <div>
//                 {" "}
//                 <h1>I am the walrus the count is {this.state.count}</h1>{" "}
//                 <button onClick={() => this.increment()}>CLICK ME</button>
//                 <input onChange={(e) => this.handleChange(e)}></input>
//                 <div>{this.state.name}</div>
//             </div>
//         );
//     }
// }

import { useState } from "react";
const Counter = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    return (
        <div>
            <h1>I am the walrus the count is {count}</h1>
            <button onClick={() => setCount(count + 1)}>CLICK ME</button>
            <input onChange={(e) => setName(e.target.value)}></input>
            <div>{name}</div>
        </div>
    );
};
export default Counter;
