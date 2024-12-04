import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import SavingPlanCard from "../components/savings/SavingPlanCard.jsx";
import Navbar from "../components/Navbar.jsx";

function Wallet(props) {
    return (
        <div className="flex">

            <Sidebar className="w-64"/>
            <div className="flex flex-col w-full">
                <Navbar />

                <SavingPlanCard className="w-1/3"/>
            </div>

        </div>
    );
}

export default Wallet;