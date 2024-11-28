import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";

function RegisterError(props) {

    return (
        <div role="alert" className="alert shadow-lg mt-10 bg-error">
            <FontAwesomeIcon icon={faCircleXmark} className="text-white" />
            <div>
                <div className="text-lg text-white">Oops! Something went wrong!</div>
            </div>
        </div>
    );
}

export default RegisterError;