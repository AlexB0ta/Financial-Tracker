import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import SavingPlanCard from "../components/savings/SavingPlanCard.jsx";
import Navbar from "../components/Navbar.jsx";
import ReccPaymentCard from "../components/recurringPay/ReccPaymentCard.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import Footer from "../components/Footer.jsx";

function Wallet(props) {

    return (
        <div className="flex">

            <Sidebar className="w-64"/>
            <div className="flex flex-col w-full">
                <Navbar />

                <div className="flex gap-3 ml-5">
                    <SavingPlanCard/>

                    <ReccPaymentCard />

                    <SummaryCard />
                </div>

                <Footer />
            </div>

        </div>
    );
}

export default Wallet;