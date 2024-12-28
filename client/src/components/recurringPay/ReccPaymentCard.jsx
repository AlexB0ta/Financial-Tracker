import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import RecPaymentElem from "./RecPaymentElem.jsx";
import {useNavigate} from "react-router-dom";

function ReccPaymentCard(props) {

    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [isMouseOver, setMouseOver] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState();
    const [dataRefresh, setDataRefresh] = useState(false);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/getAllRecurringPayments`,
                    { withCredentials: true }
                );
                setPayments(res.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    navigate("/login", { state: { redirect: true } });
                }
                console.log(err);
            }
        };

        fetchPayments();
    }, [dataRefresh]);

    async function addRecurringPayment() {
        document.getElementById("my_modal_1").close();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/addRecurringPayment`,
                { name, amount },
                { withCredentials: true }
            );
        } catch (err) {
            console.log(err);
            if (err.response?.status === 401) {
                navigate("/login", { state: { redirect: true } });
            }
        } finally {
            setDataRefresh(!dataRefresh);
        }
    }

    async function handleDelete(id) {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_API_URL}/deleteRecurringPayment/${id}`,
                { withCredentials: true }
            );
        } catch (err) {
            console.log(err);
        } finally {
            setDataRefresh(!dataRefresh);
        }
    }

    return (
        <div className="bg-base-200 rounded-xl hover:shadow-3xl w-1/3">
            <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Recurring Payments</p>
                <button
                    className="btn"
                    onClick={() => document.getElementById("my_modal_1").showModal()}
                >
                    + Add Payment
                </button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box flex flex-col gap-3">
                        <p className="text-lg font-semibold">
                            Enter new recurring payment data:
                        </p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name of the payment (e.g., Netflix, Gym)"
                            className="input input-bordered input-warning w-full max-w-xs"
                        />
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Monthly amount"
                            className="input input-bordered input-warning w-full max-w-xs"
                        />
                        <div className="flex justify-end">
                            <button
                                className="btn btn-wide bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                                onMouseEnter={(e) => setMouseOver(true)}
                                onMouseLeave={(e) => setMouseOver(false)}
                                onClick={addRecurringPayment}
                            >
                                Add payment {isMouseOver && <FontAwesomeIcon icon={faCheck} />}
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

            {payments.length > 0 ? (
                payments.map((payment, index) => (
                    <RecPaymentElem key={index} payment={payment} onDelete={handleDelete} />
                ))
            ) : (
                <div className="text-center">No recurring payments to show!</div>
            )}
        </div>
    );
}

export default ReccPaymentCard;