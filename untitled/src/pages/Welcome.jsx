import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const WelcomePage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center text-white gap-4">
            {/* Main content */}
            <button>
            <h1 className="mb-4 text-5xl font-bold hover:text-black">WELCOME</h1>
            <p className="text-lg hover:text-black">
                Take control of your finances. Track your spending, save smarter, and achieve your financial goals
                with ease.
            </p>
            </button>

            <button className="btn mt-4 btn-outline text-white hover:text-black" onClick={() => {window.scrollTo(0,document.body.scrollHeight)}}>Get started now</button>

            <span className="loading loading-ring loading-md mt-3"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-xs"></span>


        </div>
    );
};

export default WelcomePage;
