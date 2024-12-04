import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";

function SavingPlanElement(props) {
    return (
        <div className="border">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p>{props.plan.goal}</p>
                    <p>{props.plan.amount}</p>
                </div>
                <FontAwesomeIcon icon={faEllipsis}/>
            </div>

            <div className="flex flex-col">
                <p>Saving: {props.plan.currAmount}</p>
                <progress className="progress progress-warning w-56" value={props.plan.currAmount/props.plan.amount*100} max="100"></progress>
            </div>

        </div>
    );
}

export default SavingPlanElement;