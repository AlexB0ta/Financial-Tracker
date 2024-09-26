import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";

function ExpensesTable(props) {

    function handleDelete(e) {

    }

    function handleEdit(e) {}

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
                        <th>{index + 1}</th>
                        <td>{expense.description}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>{expense.date}</td>
                        <td>
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className="btn bg-base-100 "><FontAwesomeIcon
                                    icon={faEllipsis}/></div>
                                <ul tabIndex={0}
                                    className="dropdown-content menu rounded-box z-[1] w-30 p-2 shadow bg-base-300">
                                    <li><a onClick={handleEdit}><FontAwesomeIcon icon={faPenToSquare}/>Edit</a></li>
                                    <li><a onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan}/>Delete</a></li>
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