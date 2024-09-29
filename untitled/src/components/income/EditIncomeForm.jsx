import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function EditIncomeForm(props) {

    const formattedDate = new Date(props.income.created_at).toISOString().split('T')[0]
    const [id, setId] = useState(props.income.id);
    const [description, setDescription] = useState(props.income.description);
    const [amount, setAmount] = useState(props.income.amount);
    const [category, setCategory] = useState(props.income.category);
    const [date, setDate] = useState(formattedDate);

    const [isMouseOver, setMouseOver] = useState(false);

    function handeSubmit(e) {
        e.preventDefault();

        if (!description || !amount || !category || !date) {
            alert("Please fill out all fields");
            return;
        }

        props.editIncome({id, description, amount, category, date});
    }

    return (
        <form onSubmit={handeSubmit} className="space-y-4">

            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is your new income source?</span>
                    </div>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter income source"
                    />
                </label>
            </div>

            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is your new income amount?</span>
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
                        <span className="label-text">Pick the income category</span>
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        <option value="Salary">Salary</option>
                        <option value="Freelancing">Freelancing</option>
                        <option value="Investments">Investments</option>
                        <option value="Gifts">Gifts</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
            </div>

            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is the new date of this income?</span>
                    </div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input border p-2 w-full"
                    />
                </label>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn btn-wide bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
                    onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                >
                    Edit Income
                    {isMouseOver && <FontAwesomeIcon icon={faCheck} className="ml-2"/>}
                </button>
            </div>
        </form>
    );
}

export default EditIncomeForm;