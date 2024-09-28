import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function EditExpenseForm(props) {
    console.log(props.expense.expense);
    const [description, setDescription] = useState(props.expense.description);
    const [amount, setAmount] = useState(props.expense.amount);
    const [category, setCategory] = useState(props.expense.category);
    const [date, setDate] = useState(props.expense.date);

    function handleSubmit(e) {
        e.preventDefault();

        props.editExpense({description, amount, category, date});
        setDescription("");
        setAmount(0);
        setCategory("");
        setDate("");
    }

    const [isMouseOver, setMouseOver] = useState(false);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is your new expense description?</span>
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
                        <span className="label-text">What is your new expense date?</span>
                    </div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input border p-2"
                    />
                </label>
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn btn-wide bg-blue-500 text-white font-bold py-2 px-4 rounded-lg "
                    onMouseEnter={(e) => setMouseOver(true)}
                    onMouseLeave={(e) => setMouseOver(false)}
                >Edit Expense
                    {isMouseOver && <FontAwesomeIcon icon={faCheck}/>}

                </button>
            </div>
        </form>
    );
}

export default EditExpenseForm;