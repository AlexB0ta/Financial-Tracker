import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBusinessTime} from "@fortawesome/free-solid-svg-icons";
import avatarImg from "../assets/pxfuel.jpg"
import {Link} from "react-router-dom";


function Sidebar(props) {
    return (
        <div className="bg-base-200 w-64 min-h-screen p-4">
            <div className="flex flex-col items-center mt-10">
                <div><FontAwesomeIcon icon={faBusinessTime} size="2x" className="hover:text-red-700"/></div>
                <div className="text-center py-4 hover:text-red-700">
                    <h2 className="text-2xl font-bold">Finance Tracker</h2>
                </div>
                <Link to="">
                    <div
                        className="bg-base-100 p-5 flex justify-between hover:bg-blue-950 w-52 h-20 mt-10 items-center rounded-lg hover:shadow-2xl">
                        <div className="avatar">
                            <div className="w-12 h-12 rounded-full bg-white">
                                <img src={`https://robohash.org/${localStorage.getItem('username')}.png`} alt="avatar-image"/>
                            </div>
                        </div>
                        <div className="font-semibold">{localStorage.getItem('username')}</div>
                    </div>
                </Link>
            </div>

            <ul className="menu p-2 rounded-box mt-10">
                <li className="mb-2">
                    <a href="/home" className="hover:bg-primary hover:text-white">
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
                    <a href="/profile" className="hover:bg-primary hover:text-white">
                        <i className="fas fa-user mr-2"></i> Profile
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
