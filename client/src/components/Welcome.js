import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Reg from "./Reg";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Logo from "../Logo";
import Topwelcome from "./Topwelcome";
import React, { useState } from "react";

function Welcome() {
    const [dropDown, setDropDown] = useState(false);
    const [dropDown1, setDropDown1] = useState(false);

    return (
        <div className="flex flex-col justify-start h-screen bg-gray-100">
            <Topwelcome />
            <Logo />
            <div className="flex flex-col items-center justify-center mt-4">
                <div className="font-black leading-tight tracking-tight text-center text-9xl">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400">
                        Network.
                    </div>
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-indigo-600">
                        Meet.
                    </div>
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-400">
                        Develop.
                    </div>
                </div>
            </div>
            <HashRouter>
                <div className="flex items-center justify-center mt-4">
                    <Link
                        onClick={() => setDropDown(!dropDown)}
                        to="/login"
                        className="px-5 py-3 mr-2 text-sm tracking-wider text-white uppercase transition duration-500 ease-in-out bg-black border border-transparent rounded shadow cursor-pointer hover:bg-white hover:text-black hover:border-black"
                    >
                        Register now
                    </Link>

                    {dropDown && <Route path="/login" component={Login} />}
                    {/* This will have an about page probably */}
                    <Link
                        onClick={() => setDropDown1(!dropDown1)}
                        className="px-5 py-3 ml-2 text-sm tracking-wider text-gray-700 uppercase transition duration-500 ease-in-out bg-transparent border border-gray-300 rounded shadow cursor-pointer hover:text-black hover:border-black"
                        to="/"
                    >
                        Find out more
                    </Link>
                    {dropDown1 && <Route exact path="/" component={Reg} />}
                    {/* <Route path="/ResetPassword" component={ResetPassword} /> */}
                </div>
            </HashRouter>
        </div>
    );
}

export default Welcome;
