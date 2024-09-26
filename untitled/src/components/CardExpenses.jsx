import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowDown, faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons';

function CardCustomers() {
    return (
        <div className="card bg-slate-800 w-72 h-48 shadow-md hover:shadow-3xl">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <h2 className="card-title text-lg font-bold mr-5">Total expenses</h2>
                    <div className="bg-green-700 rounded-full h-10 w-10 flex items-center justify-center">
                        <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-white text-lg"/>
                    </div>
                </div>

                {/* Income value */}
                <div className="text-3xl font-bold mt-4">$1.6k</div>

                <div className="flex items-center mt-2 text-sm">
                    <FontAwesomeIcon icon={faArrowDown} className="text-red-500 mr-1"/>
                    <span className="text-red-500 font-bold">16%</span>
                    <span className="text-gray-500 ml-2">Since last month</span>
                </div>
            </div>
        </div>
    );
}

export default CardCustomers;
