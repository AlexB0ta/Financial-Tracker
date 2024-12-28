import React, {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import SavingPlanElement from "./SavingPlanElement.jsx";
import {useNavigate} from "react-router-dom";

function SavingPlanCard(props) {

    const navigate = useNavigate();
    const [plans, setPlans] = React.useState([]);
    const [isMouseOver, setMouseOver] = useState(false);
    const [goal, setGoal] = useState("");
    const [amount, setAmount] = useState();
    const [dataRefresh, setDataRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/getAllSavings`, {withCredentials: true});
                //console.log(res.data);
                setPlans(res.data);
            } catch (err) {
                if (err.status === 401) {
                    navigate('/login', {state: {redirect: true}});
                }
                console.log(err);
            }
        }

        fetchData();
    }, [dataRefresh]);

    async function addSavingPlan() {
        document.getElementById("my_modal_2").close();
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/addSavingPlan`, {goal, amount},{withCredentials: true});
        }catch (err){
            console.log(err);
            if (err.status === 401) {
                navigate('/login', {state: {redirect: true}});
            }
        }
        finally {
            setDataRefresh(!dataRefresh);
        }
    }

    async function handleAddMoney(id, newAmount) {
        try{
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/updateSavingPlan`, {id, newAmount}, {withCredentials: true});
        }
        catch (err){
            if (err.status === 401) {
                navigate('/login', {state: {redirect: true}});
            }
            console.log(err);
        }
        finally {
            setDataRefresh(!dataRefresh);
        }
    }

    async function handleDelete(id) {
        try{

            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteSavingPlan/${id}`, {withCredentials: true});
        }
        catch(err){
            console.log(err);
        }
        finally {
            setDataRefresh(!dataRefresh);
        }
    }

    return (
        <div className="bg-base-200 rounded-xl hover:shadow-3xl w-1/3">

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
                <SavingPlanElement key={index} plan={plan} onAddMoney={handleAddMoney} onDelete={handleDelete}/>
            )) : <div className="text-center">No plans to show!</div>}

        </div>
    );
}

export default SavingPlanCard;
