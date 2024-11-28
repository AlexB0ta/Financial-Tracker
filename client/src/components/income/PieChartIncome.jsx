import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function PieChartIncome(props) {

    const data = [
        { title: "Food", value: 30, color: "#E38627" },
        { title: "Rent", value: 40, color: "#C13C37" },
        { title: "Utilities", value: 20, color: "#6A2135" },
        { title: "Savings", value: 10, color: "#8BAE37" },
    ];

    return (
        <div className="bg-base-200 rounded-xl p-5">
            <div className="card-title font-bold">
                <p className="bg-blue-900 p-2 rounded-lg">Analysis</p>
            </div>
            <PieChart
                data={data}
                label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                labelStyle={{
                    fontSize: "5px",
                    fontFamily: "sans-serif",
                }}
                radius={42}
                labelPosition={70}
            />


        </div>
    );
}

export default PieChartIncome;