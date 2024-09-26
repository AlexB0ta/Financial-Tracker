import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import ExpensesTable from "../components/ExpensesTable.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import CardExpenses from "../components/CardExpenses.jsx";
import Footer from "../components/Footer.jsx";


function Expenses(props) {

    //api call to get all expenses
    const [expenses, setExpenses] = useState([
        {id: 1, description: 'Groceries', amount: 150, category: 'Food', date: '2024-09-12'},
        {id: 2, description: 'Gas', amount: 60, category: 'Transportation', date: '2024-09-15'},
        {id: 3, description: 'Rent', amount: 800, category: 'Housing', date: '2024-09-01'}
    ]);//res from api call
    // useEffect(() => {
    //     fetch("/api/expenses").then((response) => {
    //         return response.json();
    //     }).then((data) => {
    //         expenses = data;
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }, []);

    function addExpense(expense) {
        expense.id = expense.length;
        setExpenses((prevExpenses) => [...prevExpenses, expense]);
        //console.log(expense);
        //insert into db table
    }

    return (
        <div className="flex flex-row h-auto">
            {/* Sidebar on the left */}
            <Sidebar className="w-64"/>

            {/* Main content (Expenses) takes up the remaining space */}
            <div className="flex-grow p-6">
                <div className="flex justify-center items-center gap-10 mt-10">
                    <div className="">
                        <h1 className="text-3xl font-bold mb-6 text-center">Expenses</h1>
                        <CardExpenses/>
                    </div>

                    <div className="grow bg-slate-800 rounded-md p-2">
                        <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400">Enter a new
                            expense:</p>
                        {<AddExpenseForm addExpense={addExpense}/>}
                    </div>

                </div>

                <div className="card bg-base-100 shadow-xl my-14">
                    {<ExpensesTable expenses={expenses}/>}
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default Expenses;