import React from 'react';

function TableStocks(props) {
    return (
        <div className="overflow-x-auto pt-10 bg-base-200 bg-opacity-80">
            <table className="table table-md">
                <thead>
                <tr className="text-teal-300">
                    <th></th>
                    <th>Ticker</th>
                    <th>Price</th>
                    <th>Change Amount</th>
                    <th>Change Percentage</th>
                    <th>Volume</th>
                </tr>
                </thead>
                <tbody>

                {props.data.length > 0 ? props.data.map((stock, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{stock.ticker}</td>
                        <td>{stock.price}$</td>
                        <td>{stock.change_amount}</td>
                        <td>{stock.change_percentage}</td>
                        <td>{stock.volume}</td>
                    </tr>
                )) : <tr>
                    <td>No data to display!</td>
                </tr>}

                </tbody>
            </table>
        </div>
    );
}

export default TableStocks;