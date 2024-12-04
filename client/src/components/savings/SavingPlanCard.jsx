import React, {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import SavingPlanElement from "./SavingPlanElement.jsx";

function SavingPlanCard(props) {

    const [plans, setPlans] = React.useState([]);
    const [isMouseOver, setMouseOver] = useState(false);
    const [goal, setGoal] = useState("");
    const [amount, setAmount] = useState();
    const [dataRefresh, setDataRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/getAllSavings`, {withCredentials: true});
                setPlans(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [dataRefresh]);

    async function addSavingPlan() {
        try{
            const res = axios.post(`${import.meta.env.VITE_API_URL}/addSavingPlan`, {withCredentials: true});
            setDataRefresh(!dataRefresh);
        }catch (err){
            console.log(err);
        }
    }

    return (
        <div className="bg-base-200 rounded-xl shadow-3xl">

            <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Saving plan</p>
                <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>+ Add Plan
                </button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box flex flex-col gap-3">
                        <p className="text-lg font-semibold">Enter new saving plan data:</p>
                        <input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="What are you saving for?"
                            className="input input-bordered input-warning w-full max-w-xs"/>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount you want to save"
                            className="input input-bordered input-warning w-full max-w-xs"/>
                        <div className="flex justify-end">
                            <button className="btn btn-wide bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                                    onMouseEnter={(e) => setMouseOver(true)}
                                    onMouseLeave={(e) => setMouseOver(false)}
                                    onClick={addSavingPlan}
                            >Add new plan {isMouseOver && <FontAwesomeIcon icon={faCheck}/>}
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

            {plans.length > 0 ? plans.map((plan, index) => (
                <SavingPlanElement key={index} plan={plan} />
            )) : <div className="text-center">No plans to show!</div>}

        </div>
    );
}

export default SavingPlanCard;
