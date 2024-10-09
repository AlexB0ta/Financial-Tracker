import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons';

function CardExpense(props) {
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
                <div className="text-3xl font-bold mt-4">{props.amount}</div>

                <div className="flex items-center mt-2 text-sm">
                    <progress className="progress progress-warning w-56" value={props.amount/props.income*100} max="100"></progress>
                </div>
            </div>
        </div>
    );
}

export default CardExpense;
