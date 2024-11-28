import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import IncomePageContent from "../components/IncomePageContent.jsx";

function Income(props) {


    return (
        <div>

            <div className="flex flex-row h-auto">

                <Sidebar className="w-64"/>

                <IncomePageContent/>

            </div>
        </div>

    );
}

export default Income;