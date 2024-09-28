import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import ExpensesTable from "../components/expense/ExpensesTable.jsx";
import AddExpenseForm from "../components/expense/AddExpenseForm.jsx";
import CardExpenses from "../components/expense/CardExpenses.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import DeleteAlert from "../components/DeleteAlert.jsx";
import EditExpenseForm from "../components/expense/EditExpenseForm.jsx";


function Expenses(props) {

    //api call to get all expenses
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [idToDel, setIdToDel] = useState();
    const [dataRefresh, setDataRefresh] = useState(false);
    const [expToEdit, setExpToEdit] = useState({});


    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get('http://localhost:8080/getAllExpenses');
                setExpenses(res.data.allExpenses);
                console.log(res.data);
                setTotalExpense(res.data.totalExpenses);
                setTotalIncome(res.data.totalIncome);
            } catch (error) {
                setIsError(true);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTransactions();
    }, [dataRefresh])

    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    async function addExpense(expense) {
        console.log(expense);
        //insert into db table
        try {
            const res = await axios.post('http://localhost:8080/addExpense', expense);
            console.log(res);
            //verify res.status and alert fail/completed on left side
        }
        catch (err){
            console.log(err);
        }
        setDataRefresh(!dataRefresh);
    }

    function handleEdit(expense) {
        setExpToEdit((prevVal) =>{return {...prevVal,expense};})
    }

    function handleDeleteSubmit(transactionId) {
        setIsDelete(true);
        setIdToDel(transactionId);
    }

    function handleDeleteConfirmation(confirmation) {
        if (confirmation) {
            //api call to del
            //refresh useEffect
            const sendDelete = async () => {
                try {
                    const res = await axios.delete(`http://localhost:8080/deleteExpense/${idToDel}`);
                    console.log(res);
                    //verify res.status and alert fail/completed on left side
                }catch(err){
                    console.log(err);
                }
            }

            sendDelete();
            setDataRefresh(!dataRefresh);
        }

        setIsDelete(false);
    }


    return (
        <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="flex flex-row h-auto drawer-content">
                {/* Sidebar on the left */}
                <Sidebar className="w-64"/>

                {/* Main content (Expenses) takes up the remaining space */}
                <div className="flex-grow p-6">
                    <div className="flex justify-center items-center gap-10 mt-10">
                        <div className="">
                            <h1 className="text-3xl font-bold mb-6 text-center">Expenses</h1>
                            <CardExpenses amount={totalExpense} income={totalIncome}/>
                        </div>

                        <div className="grow bg-slate-800 rounded-md p-2">
                            <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400">Enter a new
                                expense:</p>
                            {<AddExpenseForm addExpense={addExpense}/>}
                        </div>

                    </div>

                    <div className="card bg-base-100 shadow-xl my-14">
                        <ExpensesTable expenses={expenses} onEdit={handleEdit} onDelete={handleDeleteSubmit}/>
                    </div>
                    <Footer/>

                    {isDelete ? <DeleteAlert onPress={handleDeleteConfirmation}/> : null}
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="bg-base-300 min-h-full w-6/12 p-4">
                        <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400 mt-10">Enter the new
                            expense data:</p>
                        <EditExpenseForm editExpense={handleEdit} expense={expToEdit}/>
                </div>
            </div>
        </div>
    );
}

export default Expenses;