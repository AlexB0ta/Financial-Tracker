import React,{useState,useEffect} from 'react';
import CardIncome from "../components/income/CardIncome.jsx";
import CardTotal from "../components/CardTotal.jsx";
import CardExpenses from "../components/expense/CardExpenses.jsx";
import Table1 from "../components/Table1.jsx";
import ChartComponent from "../components/Chart1.jsx";
import Footer from "../components/Footer.jsx";


function Home() {

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
                const response = await fetch('http://localhost:8080/getAllTransactions');
                const data = await response.json();
                setTotal(data.totalAmount);
                setTotalIncome(data.totalIncome);
                setTotalExpense(data.totalExpenses);
                setTransactions(data.allTransactions);
            }catch(e){
                setIsError(true);
                console.error(e);
            }finally {
                setIsLoading(false);
            }
        }

        fetchTransactions();
    },[])

     if(isError){
         return <div>Error</div>; //make error page
     }

    if(isLoading){
        return <div>Loading...</div>; //make loading page
    }


    return (
        <div className="container mx-auto bg-base-100">
            <div className="w-full max-w-screen-lg mx-auto mt-14 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardTotal amount={total} income={totalIncome} expenses={totalExpense} />
                    <CardIncome amount={totalIncome}/>
                    <CardExpenses amount={totalExpense} income={totalIncome}/>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
                {/* Table Card */}
                <div className="card bg-slate-800 shadow-xl p-6">
                    <Table1 transactions={transactions}/>
                </div>

                {/* Chart Card */}
                <div className="card bg-slate-800 shadow-xl p-6">
                    <ChartComponent/>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;