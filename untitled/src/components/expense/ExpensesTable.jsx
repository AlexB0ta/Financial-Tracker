import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faEllipsis, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";

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
                    <th>
                        <div className="flex gap-1 text-sm items-center">
                            Description
                            <div>
                                <button>
                                    <FontAwesomeIcon icon={faArrowUp} className="mr-0.5 text-lime-400"
                                                     onClick={() => props.onSort("description", true)}/>
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faArrowDown} className="text-red-700"
                                                     onClick={() => props.onSort("description", false)}/>
                                </button>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div className="flex gap-1 text-sm items-center">
                            Amount
                            <div>
                                <button>
                                    <FontAwesomeIcon icon={faArrowUp} className="mr-0.5 text-lime-400"
                                                     onClick={() => props.onSort("amount", true)}/>
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faArrowDown} className="text-red-700"
                                                     onClick={() => props.onSort("amount", false)}/>
                                </button>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div className="flex gap-1 text-sm items-center">
                            Category
                            <div>
                                <button>
                                    <FontAwesomeIcon icon={faArrowUp} className="mr-0.5 text-lime-400"
                                                     onClick={() => props.onSort("category", true)}/>
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faArrowDown} className="text-red-700"
                                                     onClick={() => props.onSort("category", false)}/>
                                </button>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div className="flex gap-1 text-sm items-center">
                            Date
                            <div>
                                <button>
                                    <FontAwesomeIcon icon={faArrowUp} className="mr-0.5 text-lime-400"
                                                     onClick={() => props.onSort("created_at", true)}/>
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faArrowDown} className="text-red-700"
                                                     onClick={() => props.onSort("created_at", false)}/>
                                </button>
                            </div>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {props.expenses.length > 0 ? props.expenses.map((expense, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                        <th>{index + 1}</th>
                        {/*different from actual id in DATABASE*/}
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
                                        <label htmlFor="my-drawer" className="drawer-button"
                                               onClick={() => props.onEdit(expense)}>
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