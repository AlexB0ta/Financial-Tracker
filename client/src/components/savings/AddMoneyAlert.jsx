import React, {useState} from 'react';


function AddMoneyAlert(props) {

    const [amount, setAmount] = useState(0);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="flex flex-col bg-base-300 p-14 rounded-2xl">
                <div>
                    <span className="my-4 pl-2">How much many do you want to add?</span>
                </div>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => {setAmount(e.target.value)}}
                    className="input input-bordered input-accent w-full max-w-xs"/>
                <div className="flex mt-5 justify-center items-end">
                    <button className="btn btn-sm btn-error" onClick={() => {props.onPress(amount)}}>Enter</button>
                </div>
            </div>
        </div>
    );
}

export default AddMoneyAlert;