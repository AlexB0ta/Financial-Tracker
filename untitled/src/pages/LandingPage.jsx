import React from 'react';
import {motion} from "framer-motion";
import Register from "./Register.jsx";
import WelcomePage from "./Welcome.jsx";
// Make sure Register is imported properly

const LandingPage = () => {
    return (
        <div className="w-full">
            {/* Welcome Section */}
            <section>
                <WelcomePage/>
            </section>

            {/* Register Section */}
            <section id="register-section" >
                <Register/>
            </section>
        </div>
    );
};

export default LandingPage;
