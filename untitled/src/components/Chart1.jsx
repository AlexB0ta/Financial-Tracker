import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    LineController,  // Add this line
    BarController,   // Add this line (since you're using bar chart too)
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ErrorFetching from "../pages/ErrorFetching.jsx";
import Loading from "../pages/Loading.jsx";

// Register required components including LineController and BarController
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    LineController, // Register the LineController
    BarController,  // Register the BarController
    Title,
    Tooltip,
    Legend
);

const ChartComponent = () => {

    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [profits, setProfits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        const fetchData = async () => {

            setIsLoading(true);
            let allIncomes = [];
            let allExpenses = [];
            let allProfits = [];

            for (let i = 0; i < 12; i++) {
                let startDate = new Date(2024, i, 1);
                let endDate = new Date(2024, i + 1, 0);
                try {

                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/getIncomesByDate?startDate=${startDate}&endDate=${endDate}&type=income`, {withCredentials: true});
                    const response2 = await axios.get(`${import.meta.env.VITE_API_URL}/getIncomesByDate?startDate=${startDate}&endDate=${endDate}&type=expense`, {withCredentials: true});
                    //console.log(response.data[0]);
                    if(response.data[0] !== undefined) {
                        allIncomes.push(response.data[0].amount);
                    }
                    else{
                        allIncomes.push(0);
                    }

                    if(response2.data[0] !== undefined) {
                        allExpenses.push(response2.data[0].amount);
                    }
                    else{
                        allExpenses.push(0);
                    }

                    let x = allIncomes[i] - allExpenses[i];
                    allProfits.push(x);

                } catch (e) {
                    setIsError(true);
                }
            }
            setIncomes(allIncomes);
            setExpenses(allExpenses)
            setProfits(allProfits)

            setIsLoading(false);
        }

        fetchData();
    }, []);

    if(isError){
        return <ErrorFetching />
    }

    if(isLoading){
        return <Loading />;
    }

    console.log(profits)
    // Data for the chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
        datasets: [
            {
                type: 'bar',
                label: 'Expenses',
                data: expenses,
                backgroundColor: 'rgba(52,89,89,0.5)',
                borderColor: 'rgb(255,0,0)',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: 'Income',
                data: incomes,
                backgroundColor: 'rgba(0,255,98,0.5)',
                borderColor: 'rgb(223,235,54)',
                borderWidth: 1,
            },
            {
                type: 'line',
                label: 'Net Profit',
                data: profits,
                fill: false,
                borderColor: 'rgb(255,255,255)',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderWidth: 2,
                tension: 0.3, // Smoothing the line
            },
        ],
    };

    // Options to style the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Income, Expenses, and Net Profit Over Time',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="flex flex-col items-center">
            <div className="card-title font-bold">
                <p className="bg-blue-900 p-2 rounded-lg flex items-center justify-center">
                    Analytics <FontAwesomeIcon className="ml-2" icon={faChartLine}/>
                </p>
            </div>
            <div className="w-full max-w-3xl mx-auto mt-3">
                <Bar data={data} options={options}/>
            </div>
        </div>

    );
};

export default ChartComponent;
