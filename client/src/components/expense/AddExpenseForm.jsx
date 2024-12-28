import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function AddExpenseForm(props) {

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [recurring, setRecurring] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description || !amount || !category || !date) {
            alert("Please fill out all fields");
            return;
        }

        props.addExpense({description, amount, category, date, recurring});
        setDescription("");
        setAmount(0);
        setCategory("");
        setDate("");
        setRecurring(false);
    }

    const [isMouseOver, setMouseOver] = useState(false);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is your expense description?</span>
                    </div>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter description"
                    />
                </label>
            </div>
            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is your expense amount?</span>
                    </div>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter amount"
                    />
                </label>
            </div>
            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Pick the category</span>
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Housing">Housing</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
            </div>
            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is your expense date?</span>
                    </div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input border p-2"
                    />
                </label>
            </div>
            <div className="form-control w-48">
                <label className="cursor-pointer label">
                    <span className="label-text">Recurring payment?</span>
                    <input
                        type="checkbox"
                        checked={recurring}
                        onChange={(e) => setRecurring(e.target.checked)}
                        className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"/>
                </label>
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn btn-wide bg-blue-500 text-white font-bold py-2 px-4 rounded-lg "
                    onMouseEnter={(e) => setMouseOver(true)}
                    onMouseLeave={(e) => setMouseOver(false)}
                >Add Expense
                    {isMouseOver && <FontAwesomeIcon icon={faCheck}/>}

                </button>
            </div>
        </form>
    );
}

export default AddExpenseForm;