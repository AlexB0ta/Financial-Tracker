import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";

function RecPaymentElem(props) {
    return (
        <div className="bg-base-100 m-2 p-2 rounded-lg">
            <div className="flex justify-between p-1">
                <div className="flex flex-col">
                    <p className="font-bold text-white">{props.payment.description}</p>
                    <p>Total amount: {props.payment.amount}</p>
                </div>

                <div className="dropdown dropdown-bottom">
                    <div tabIndex="0" role="button" className=""><FontAwesomeIcon icon={faEllipsis} className="size-6"/></div>
                    <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow gap-2">
                        <li className="btn btn-sm" onClick={() => {props.onDelete(props.payment.id)}}>Delete</li>
                    </ul>
                </div>
            </div>

            <progress className="progress progress-accent" value="100" max="100"></progress>


        </div>
    )
}

export default RecPaymentElem;