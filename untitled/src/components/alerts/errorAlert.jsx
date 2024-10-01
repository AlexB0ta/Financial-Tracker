import React, {useEffect, useState} from 'react';

function ErrorAlert(props) {

    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (progress > 0) {
            const interval = setInterval(() => {
                setProgress(prevProgress => prevProgress - 1);
            }, 20); // Decrease progress every 20milisec

            return () => clearInterval(interval); // Clear the interval on component unmount
        } else if (progress === 0) {
            props.onClose();
        }

    }, [progress])

    return (
        <div role="alert" className="alert alert-error">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>

            <div className="flex flex-col gap-1">
                <span>Error! Something went wrong.</span>
                <progress className="progress progress-info" value={progress} max="100"></progress>
            </div>
        </div>
    );
}

export default ErrorAlert;