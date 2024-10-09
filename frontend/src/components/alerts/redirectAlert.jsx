import React, {useEffect, useState} from 'react';

function RedirectAlert(props) {

    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (progress > 0) {
            const interval = setInterval(() => {
                setProgress(prevProgress => prevProgress - 1);
            }, 40); // Decrease progress every 20milisec

            return () => clearInterval(interval); // Clear the interval on component unmount
        }
        else if(progress === 0) {
            props.onClose();
        }

    }, [progress])

    return (
        <div role="alert" className="alert alert-info border">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="flex flex-col gap-1">
                <span>Session expired! You have been redirected to login.</span>

            </div>
        </div>
    );
}

export default RedirectAlert;