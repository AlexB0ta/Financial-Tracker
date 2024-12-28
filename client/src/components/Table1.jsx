import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faServer} from "@fortawesome/free-solid-svg-icons";
import login from "../pages/Login.jsx";

function Table1(props) {

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    return (
        <div className="flex flex-col items-center">
            <div className="card-title font-bold">
                <p className="bg-blue-900 p-2 rounded-lg">Monthly data <FontAwesomeIcon icon={faServer}/></p>
            </div>
            <table className="table mt-5">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {props.transactions.length > 0 ? props.transactions.map((transaction) => (
                    <tr key={transaction.id}
                        className={transaction.type === "income" ? "text-green-500" : "text-red-500"}>
                        <td>{transaction.id}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.amount}</td>
                        <td>{formatDate(transaction.created_at)}</td>
                    </tr>
                )) : <tr>
                <td className="text-center"> No data to display!</td>
                </tr>}

                </tbody>
            </table>
        </div>
    );
}

export default Table1;