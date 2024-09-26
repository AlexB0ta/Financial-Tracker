import React,{useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function AddIncomeForm(props) {

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [isMouseOver, setMouseOver] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        if (!description || !amount || !category || !date) {
            alert("Please fill out all fields");
            return;
        }

        props.addIncome({description, amount, category, date});

        setDescription("");
        setAmount(0);
        setCategory("");
        setDate("");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is your income source?</span>
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

            {/* Amount Field */}
            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is your income amount?</span>
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

            {/* Category Field (Optional) */}
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

            {/* Date Field */}
            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is the date of this income?</span>
                    </div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input border p-2 w-full"
                    />
                </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn btn-wide bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
                    onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                >
                    Add Income
                    {isMouseOver && <FontAwesomeIcon icon={faCheck} className="ml-2" />}
                </button>
            </div>
        </form>
    );
}

export default AddIncomeForm;