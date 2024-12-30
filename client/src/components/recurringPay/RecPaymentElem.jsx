import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import emailjs from '@emailjs/browser'
import {useNavigate} from "react-router-dom";


function RecPaymentElem(props) {

    const [dueDate, setDueDate] = useState(null);
    const [isAlert, setIsAlert] = useState(false);
    const [render, setRender] = useState(false);

    function processDate(dateString){
        const givenDate = new Date(dateString); // Parse the date
        const currentDate = new Date(); // Get the current date

        const yearsDiff = currentDate.getFullYear() - givenDate.getFullYear();
        const monthsDiff = currentDate.getMonth() - givenDate.getMonth();
        const totalMonthsAgo = yearsDiff * 12 + monthsDiff;

        const newDate = new Date(givenDate); // Clone the date to avoid mutating the original
        newDate.setMonth(newDate.getMonth() + totalMonthsAgo + 1);
        return (newDate.toISOString().split("T")[0]);
    }

    useEffect(() => {
        const newDueDate = processDate(props.payment.created_at);
        setDueDate(newDueDate);
    }, []);

    useEffect(() => {
        const checkDate =  async (dateString) => {
            const givenDate = new Date(dateString); // Parse the date
            const currentDate = new Date(); // Get the current date

            const differenceInMs = Math.abs(givenDate - currentDate);

            // Convert milliseconds to days
            const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

            if (differenceInDays < 3) {
                setIsAlert(true);
                const date = new Date(dueDate).toDateString();

                emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID,{
                    to_name: localStorage.getItem('username'),
                    from_name: "Financial Tracker",
                    message: "This is a friendly reminder that your recurring payment of " + props.payment.amount + " for " +
                        props.payment.description + " / " + props.payment.category + " is scheduled for " + date +
                        " If you have any questions or need assistance, feel free to reach out. Thank you for your continued support!",
                    to_email: localStorage.getItem('email'),
                },import.meta.env.VITE_EMIL_PUBLIC_KEY).then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);})
            }
        }

        checkDate(dueDate);
        //setRender(true);
    }, [dueDate]);



    return (
        <div className="bg-base-100 m-2 p-2 rounded-lg">
            <div className="flex justify-between p-1">
                <div className="flex flex-col">
                    <p className="font-bold text-white">{props.payment.description}</p>
                    <p>Total amount: {props.payment.amount}</p>
                    <p className="text-red-400">Due date: {dueDate}</p>
                </div>

                <div className="dropdown dropdown-bottom">
                    <div tabIndex="0" role="button" className=""><FontAwesomeIcon icon={faEllipsis} className="size-6"/>
                    </div>
                    {isAlert && <div className="text-center text-warning"><FontAwesomeIcon icon={faTriangleExclamation} className="size-8"/></div>}
                    <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow gap-2">
                        <li className="btn btn-sm" onClick={() => {
                            props.onDelete(props.payment.id)
                        }}>Delete
                        </li>
                    </ul>
                </div>
            </div>

            <progress className="progress progress-accent" value="100" max="100"></progress>

        </div>
    )
}

export default RecPaymentElem;