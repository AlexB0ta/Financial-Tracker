import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";

function LoginError(props) {

    return (
        <div role="alert" className="alert shadow-lg mt-5 bg-error">
            <FontAwesomeIcon icon={faCircleXmark} className="text-white" />
            <div>
                <div className="text-sm text-white">Invalid email or password! Try again.</div>
            </div>
        </div>
    );
}

export default LoginError;