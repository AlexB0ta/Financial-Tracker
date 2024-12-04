import React from 'react';
import {PieChart} from "react-minimal-pie-chart";

function PieChartCategory(props) {

    const colors = [
        "#E38627",
        "#C13C37",
        "#6A2135",
        "#8BAE37",
        "#2176AE",
        "#C689C6",
        "#6EC177",
        "#F4A261",
        "#E63946",
    ];

    const data = props.data.map((item, index) => ({
        ...item,
        color: colors[index % colors.length],
    }));

    return (
        <div className="bg-base-200 rounded-xl shadow-md hover:shadow-3xl flex items-center">
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
            <div className="pr-1">
                <ul>
                    {data.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <span
                                className="w-4 h-4 rounded-full"
                                style={{backgroundColor: item.color}}
                            ></span>
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PieChartCategory;