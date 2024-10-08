import React from 'react';
import {motion} from "framer-motion";
import Register from "./Register.jsx";
import WelcomePage from "./Welcome.jsx";
// Make sure Register is imported properly

const LandingPage = () => {
    return (
        <div className="w-full bg-[url('/background2.jpg')] bg-cover bg-center">
            {/* Welcome Section */}
            <motion.div initial={{y: "50%"}} animate={{y: "0%"}} transition={{duration: 2}}>
                <section>
                    <WelcomePage/>
                </section>
            </motion.div>

            {/* Register Section */}
            <div>
                <section id="register-section">
                    <Register needsBackGround={true}/>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;
