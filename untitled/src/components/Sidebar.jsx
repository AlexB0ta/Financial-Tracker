import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBusinessTime} from "@fortawesome/free-solid-svg-icons";



const Sidebar = () => {
    return (
        <div className="bg-base-200 w-64 min-h-screen p-4">
            <div className="flex flex-col items-center mt-10">
                <div><FontAwesomeIcon icon={faBusinessTime} size="2x"/></div>
                <div className="text-center py-4">
                    <h2 className="text-2xl font-bold">Finance Tracker</h2>
                </div>

            </div>

            <ul className="menu p-2 rounded-box mt-10">
                <li className="mb-2">
                    <a href="/" className="hover:bg-primary hover:text-white">
                        <i className="fas fa-chart-line mr-2"></i> Dashboard
                    </a>
                </li>
                <li className="mb-2">
                    <a href="/expenses" className="hover:bg-primary hover:text-white">
                        <i className="fas fa-money-bill-alt mr-2"></i> Expenses
                    </a>
                </li>
                <li className="mb-2">
                    <a href="/incomes" className="hover:bg-primary hover:text-white">
                        <i className="fas fa-hand-holding-usd mr-2"></i> Income
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="hover:bg-primary hover:text-white">
                        <i className="fas fa-user mr-2"></i> Profile
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
