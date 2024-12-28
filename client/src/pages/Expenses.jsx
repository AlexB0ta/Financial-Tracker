import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import ExpensesPageContent from "../components/expense/ExpensesPageContent.jsx";


function Expenses(props) {

    return (
        <div>
            <div className="flex flex-row h-auto">
                {/* Sidebar on the left */}
                <Sidebar className="w-64"/>

                <ExpensesPageContent />
            </div>


        </div>
    );
}

export default Expenses;