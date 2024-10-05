import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

function LogOutAlert(props) {
    return (
        <div role="alert" className="alert alert-warning mr-3 w-1/2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info h-6 w-6 shrink-0">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Are you sure you want to logout?</span>
            <div className="flex gap-1">
                <button className="btn btn-sm" onClick={() => props.onPress(false)}>No</button>
                <button className="btn btn-sm btn-error" onClick={() => props.onPress(true)}>Yes</button>
            </div>
        </div>
    );
}

export default LogOutAlert;