import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ErrorFetching from "../pages/ErrorFetching.jsx";
import Loading from "../pages/Loading.jsx";

function SummaryCard(props) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/getAllTransactions`, {withCredentials: true});
                //console.log(response);
                setTotal(response.data.totalAmount);
                setTotalIncome(response.data.totalIncome);
                setTotalExpense(response.data.totalExpenses);
                setTransactions(response.data.allTransactions);
            } catch (e) {
                setIsError(true);
                if (e.status === 401) {
                    navigate('/login', {state: {redirect: true}});
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchTransactions();
    }, [])

    if (isError) {
        return <ErrorFetching/>;
    }

    if (isLoading) {
        return <Loading/>;
    }

    // Sort transactions to get the top income and expenses
    const topIncomeTransactions = [...transactions]
        .filter((transaction) => transaction.type === "income")
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 4);

    const topExpenseTransactions = [...transactions]
        .filter((transaction) => transaction.type === "expense")
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    const summaryData = {
        totalAssets: totalIncome,
        totalLiabilities: totalExpense,
        netWorth: total,
        assets: topIncomeTransactions.map((transaction) => ({
            name: transaction.description, // Replace with actual category/description field
            value: transaction.amount,
            color: generateRandomColor(), // Optional: Replace with your color logic
        })),
        liabilities: topExpenseTransactions.map((transaction) => ({
            name: transaction.description, // Replace with actual category/description field
            value: transaction.amount, // Convert to positive value for display
            color: generateRandomColor(), // Optional: Replace with your color logic
        })),
    };

    return (
        <div className="bg-base-200 rounded-xl hover:shadow-3xl max-w-md mr-2 w-1/3 p-3">
            <p className="text-lg font-bold mb-4">Summary</p>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-white">Assets</p>
                    <p className="font-semibold text-primary">${summaryData.totalAssets.toLocaleString()}</p>
                </div>
                <ul>
                    {summaryData.assets.map((asset, index) => (
                        <li key={index} className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                <span
                    className={`h-3 w-3 rounded-full`}
                    style={{ backgroundColor: asset.color }}
                ></span>
                                <p>{asset.name}</p>
                            </div>
                            <p>${asset.value.toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-white">Liabilities</p>
                    <p className="font-semibold text-error">${summaryData.totalLiabilities.toLocaleString()}</p>
                </div>
                <ul>
                    {summaryData.liabilities.map((liability, index) => (
                        <li key={index} className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                <span
                    className={`h-3 w-3 rounded-full`}
                    style={{ backgroundColor: liability.color }}
                ></span>
                                <p>{liability.name}</p>
                            </div>
                            <p>${liability.value.toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-between items-center border-t pt-2">
                <p className="font-bold text-lg text-white">Net Worth</p>
                <p className="font-bold text-lg">${summaryData.netWorth.toLocaleString()}</p>
            </div>
        </div>
    );
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default SummaryCard;
