import React from 'react';
import {PieChart} from "react-minimal-pie-chart";

function PieChartCategory(props) {


    return (
        <div className="bg-base-200 rounded-xl shadow-md hover:shadow-3xl flex items-center mr-5">
            <PieChart
                data={props.data}
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
                    {props.data.map((item, index) => (
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