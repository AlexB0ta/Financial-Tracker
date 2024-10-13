import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";

function ErrorFetching(props) {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col">
                <h1 className="text-5xl font-bold">Error...<FontAwesomeIcon icon={faExclamation} /></h1>
                <progress className="progress w-56"></progress>
            </div>
        </div>
    );
}

export default ErrorFetching;