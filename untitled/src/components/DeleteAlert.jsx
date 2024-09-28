import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

function CenteredAlert(props) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="flex flex-col bg-base-300 p-14 rounded-2xl">
                <div>
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    <span className="my-4 pl-2">Are you sure you want to delete?</span>
                </div>
                <div className="flex mt-5 justify-center items-end">
                    <button className="btn btn-sm mr-5" onClick={() => props.onPress(false)}>No</button>
                    <button className="btn btn-sm btn-error" onClick={() => props.onPress(true)}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default CenteredAlert;
