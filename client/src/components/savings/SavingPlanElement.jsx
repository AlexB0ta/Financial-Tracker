import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import AddMoneyAlert from "./AddMoneyAlert.jsx";

function SavingPlanElement(props) {
    //console.log(props);

    const [isAddMoney, setIsAddMoney] = useState(false);

    return (
        <div className="bg-base-100 m-2 p-2 rounded-lg">
            <div className="flex justify-between p-1">
                <div className="flex flex-col">
                    <p className="font-bold text-white">{props.plan.goal}</p>
                    <p>Total amount: {props.plan.amount}</p>
                </div>

                <div className="dropdown dropdown-bottom">
                    <div tabIndex="0" role="button" className=""><FontAwesomeIcon icon={faEllipsis} className="size-6"/></div>
                    <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow gap-2">
                        <li className="btn btn-sm" onClick={() => {setIsAddMoney(true)}}>Add money</li>
                        <li className="btn btn-sm" onClick={() => {props.onDelete(props.plan.id)}}>Delete</li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col p-1">
                <p className="text-lime-200">Saving: {props.plan.current_amount}</p>
                <progress className="progress progress-warning"
                          value={props.plan.current_amount / props.plan.amount * 100} max="100"></progress>
            </div>

            {isAddMoney && <AddMoneyAlert onPress={(newAmount) => {
                const totalAmount = parseInt(props.plan.current_amount) + parseInt(newAmount);
                props.onAddMoney(props.plan.id, totalAmount);
                setIsAddMoney(false)}
            } />}

        </div>
    );
}

export default SavingPlanElement;