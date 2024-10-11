import React,{useState,useEffect} from 'react';
import CardIncome from "../components/income/CardIncome.jsx";
import CardTotal from "../components/CardTotal.jsx";
import CardExpenses from "../components/expense/CardExpenses.jsx";
import Table1 from "../components/Table1.jsx";
import ChartComponent from "../components/Chart1.jsx";
import Footer from "../components/Footer.jsx";
import Loading from "./Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ErrorFetching from "./ErrorFetching.jsx";


function Home() {

    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        const fetchTransactions = async () => {
            try{
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/getAllTransactions`,{withCredentials: true});
                //console.log(response);
                setTotal(response.data.totalAmount);
                setTotalIncome(response.data.totalIncome);
                setTotalExpense(response.data.totalExpenses);
                setTransactions(response.data.allTransactions);
            }catch(e){
                setIsError(true);
                if(e.status === 401){
                    navigate('/login',{state:{redirect: true}});
                }
            }finally {
                setIsLoading(false);
            }
        }

        fetchTransactions();
    },[])

     if(isError){
         return <ErrorFetching />;
     }

    if(isLoading){
        return <Loading />;
    }


    return (
        <div className="flex flex-col flex-grow">
            <Navbar />
            <div className="w-full max-w-screen-lg mx-auto mt-14 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardTotal amount={total} income={totalIncome} expenses={totalExpense} />
                    <CardIncome amount={totalIncome}/>
                    <CardExpenses amount={totalExpense} income={totalIncome}/>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10 mx-6">
                {/* Table Card */}
                <div className="card bg-base-100 shadow-xl p-6 hover:shadow-3xl">
                    <Table1 transactions={transactions}/>
                </div>

                {/* Chart Card */}
                <div className="card bg-base-100 shadow-xl p-6 hover:shadow-3xl">
                    <ChartComponent/>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;