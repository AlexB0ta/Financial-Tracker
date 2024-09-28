import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";

function ExpensesTable(props) {

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    return (
        <div className="">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {props.expenses.length > 0 ? props.expenses.map((expense, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                        <th>{index + 1}</th>            {/*different from actual id in DATABASE*/}
                        <td>{expense.description}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>{formatDate(expense.created_at)}</td>
                        <td>
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className="btn bg-base-100 "><FontAwesomeIcon
                                    icon={faEllipsis}/></div>
                                <ul tabIndex={0}
                                    className="dropdown-content menu rounded-box z-[1] w-30 p-2 shadow bg-base-300">
                                    <li>
                                        <label htmlFor="my-drawer" className="drawer-button" onClick={() => props.onEdit(expense)}>
                                            <FontAwesomeIcon icon={faPenToSquare}/>Edit
                                        </label>
                                    </li>

                                    <li>
                                        <a onClick={() => props.onDelete(expense.id)}>
                                            <FontAwesomeIcon icon={faTrashCan}/>Delete
                                        </a>
                                        </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                )) : <tr>
                    <td className="text-center"> No data to display!</td>
                </tr>}
                </tbody>
            </table>
        </div>
    );
}

export default ExpensesTable;