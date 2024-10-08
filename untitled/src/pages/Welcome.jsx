import React from 'react';
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

const WelcomePage = () => {
    return (
        <div
            className="h-screen bg-cover bg-center flex items-center justify-center text-center"
            style={{
                backgroundImage: "url('/background2.jpg')",
            }}
        >
            {/* Main content */}
            <motion.div className="text-white" initial={{y: "100%"}} animate={{y: "0%"}} transition={{duration: 2}}>
                <h1 className="text-5xl font-bold" >WELCOME</h1>
                <p className="mt-4 text-lg">
                    Take control of your finances. Track your spending, save smarter, and achieve your financial goals
                    with ease.
                </p>

                {/* Button */}
                <Link to="/register">
                    <button className="btn mt-4 btn-outline text-white">Get started</button>
                </Link>
            </motion.div>
        </div>
    );
};

export default WelcomePage;
