import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function RegisterSucces(props) {

    const navigate = useNavigate();

    return (
        <div role="alert" className="alert shadow-lg mt-10 bg-success">
            <FontAwesomeIcon icon={faCircleCheck} className="text-white" />
            <div>
                <div className="text-lg text-white">You are now registered!</div>
            </div>
            <button className="btn btn-sm" onClick={() => {navigate("/login")}}>Click to sign in</button>
        </div>
    );
}

export default RegisterSucces;