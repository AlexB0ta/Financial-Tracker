import React from 'react';
import '@fortawesome/fontawesome-free';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";

function CardIncome(props) {
    return (
        <div className="card bg-slate-800 w-72 h-48 shadow-md hover:shadow-3xl">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <h2 className="card-title text-lg font-bold mr-5">Total income</h2>
                    <div className="bg-purple-900 rounded-full h-10 w-10 flex items-center justify-center">
                        <FontAwesomeIcon icon={faDollarSign} className="text-white text-lg"/>
                    </div>
                </div>

                {/* Income value */}
                <div className="text-3xl font-bold mt-4">$1.6k</div>
            </div>
        </div>
    );
}

export default CardIncome;
