import React, {useState, useEffect} from 'react';

function SuccessAlert(props) {

    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (progress > 0) {
            const interval = setInterval(() => {
                setProgress(prevProgress => prevProgress - 1);
            }, 50); // Decrease progress every 100milisec

            return () => clearInterval(interval); // Clear the interval on component unmount
        }
        else if(progress === 0) {
            props.onClose();
        }

    }, [progress])

    return (
        <div role="alert" className="alert alert-success border">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div className="flex flex-col gap-1">
                <span>Success! Your new data is set.</span>

                <progress className="progress progress-info" value={progress} max="100"></progress>
            </div>
        </div>
    );
}

export default SuccessAlert;