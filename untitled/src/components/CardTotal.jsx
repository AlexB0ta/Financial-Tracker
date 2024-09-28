import React from 'react';

function CardTotal(props) {
    return (
        <div className="card bg-slate-800 w-72 shadow-md hover:shadow-3xl h-48">
            <div className="card-body">
                <h2 className="card-title text-lg font-bold mr-5">Available amount</h2>
                <div className="flex justify-around">
                <div className="text-3xl font-bold mt-4">{props.amount}</div>
                    <div className="radial-progress mt-2" style={{"--value": Math.floor((props.amount/props.income)*100)}} role="progressbar">
                        {Math.floor((props.amount/props.income)*100)}%
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardTotal;