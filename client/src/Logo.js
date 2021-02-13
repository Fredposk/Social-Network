import React from "react";

const Logo = () => {
    return (
        <div className="flex items-center">
            <div className="">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 m-3 transform rotate-180 md:w-10 md:h-10"
                    viewBox="0 0 24 24"
                >
                    <path d="M24 22h-24l12-20z" />
                </svg>
            </div>
            <div className="-ml-3 text-xl font-extrabold tracking-wider md:text-2-xl">
                NetCode
            </div>
            <div></div>
        </div>
    );
};

export default Logo;
