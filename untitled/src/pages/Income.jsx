import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import CardIncome from "../components/CardIncome.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import IncomeTable from "../components/IncomeTable.jsx";
import Footer from "../components/Footer.jsx";

function Income(props) {

    const [incomes, setIncomes] = React.useState([
        {id: 1, description: 'Salary from Tech Company', amount: 3500, category: 'Salary', date: '2024-09-01'},
        {id: 2, description: 'Freelance Web Development', amount: 1200, category: 'Freelancing', date: '2024-09-10'},
        {id: 3, description: 'Investment Dividends', amount: 500, category: 'Investments', date: '2024-09-15'},
    ]);

    function addIncome(income) {
        income.id = income.length;
        setIncomes((prevIncomes) => [...prevIncomes, income]);
    }

    return (
        <div>
            <div className="flex flex-row h-auto">

                <Sidebar className="w-64"/>

                <div className="flex-grow p-6">
                    <div className="flex justify-center items-center gap-10 mt-10">
                        <div className="">
                            <h1 className="text-3xl font-bold mb-6 text-center">Incomes</h1>
                            <CardIncome/>
                        </div>

                        <div className="grow bg-slate-800 rounded-md p-2">
                            <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400">Enter a new
                                income:</p>
                            <AddIncomeForm addIncome={addIncome}/>
                        </div>

                    </div>

                    <div className="bg-base-100 shadow-xl my-14">
                        {<IncomeTable incomes={incomes}/>}
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Income;