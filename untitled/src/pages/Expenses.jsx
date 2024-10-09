import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import ExpensesTable from "../components/expense/ExpensesTable.jsx";
import AddExpenseForm from "../components/expense/AddExpenseForm.jsx";
import CardExpenses from "../components/expense/CardExpenses.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import DeleteAlert from "../components/alerts/DeleteAlert.jsx";
import EditExpenseForm from "../components/expense/EditExpenseForm.jsx";
import ErrorAlert from "../components/alerts/errorAlert.jsx";
import SuccessAlert from "../components/alerts/successAlert.jsx";
import Loading from "../pages/Loading.jsx";
import ErrorFetching from "../pages/ErrorFetching.jsx";
import Navbar from "../components/Navbar.jsx";
import {useNavigate} from "react-router-dom";


function Expenses(props) {

    //api call to get all expenses
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [idToDel, setIdToDel] = useState();
    const [dataRefresh, setDataRefresh] = useState(false);
    const [expToEdit, setExpToEdit] = useState(null);
    const [isSuccessAddEditDel, setIsSuccessAddEditDel] = useState(false);
    const [isErrorAddEditDel, setIsErrorAddEditDel] = useState(false);


    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get('http://localhost:8080/getAllExpenses',{withCredentials: true});
                setExpenses(res.data.allExpenses);
                setTotalExpense(res.data.totalExpenses);
                setTotalIncome(res.data.totalIncome);
            } catch (error) {
                setIsError(true);
                if(error.status === 401){
                    navigate('/login',{state:{redirect: true}});
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchTransactions();
    }, [dataRefresh])

    if (isError) {
        return <ErrorFetching />;
    }

    if (isLoading) {
        return <Loading />;
    }

    async function addExpense(expense) {
        //console.log(expense);
        //insert into db table
        try {
            setIsErrorAddEditDel(false);
            const res = await axios.post('http://localhost:8080/addExpense', expense,{withCredentials: true});
            setIsSuccessAddEditDel(true);
        } catch (err) {
            setIsErrorAddEditDel(true);
            setIsSuccessAddEditDel(false);
            if(err.status === 401){
                navigate('/login',{state:{redirect: true}});
            }
            console.log(err);
        }
        setDataRefresh(!dataRefresh);
    }

    function handleEdit(expense) {
        //console.log(expense)
        setExpToEdit(expense);
        //console.log(expToEdit);
    }

    async function submitEdit(newExpense) {
        try {
            setIsErrorAddEditDel(false);
            const res = await axios.patch('http://localhost:8080/updateExpense', newExpense,{withCredentials: true});
            setIsSuccessAddEditDel(true);
        } catch (err) {
            setIsErrorAddEditDel(true);
            setIsSuccessAddEditDel(false);
            if(err.status === 401){
                navigate('/login',{state:{redirect: true}});
            }
            console.log(err);
        }

        setDataRefresh(!dataRefresh);

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
                    setIsErrorAddEditDel(false)
                    const res = await axios.delete(`http://localhost:8080/deleteExpense/${idToDel}`,{withCredentials: true});
                    if(res.status >=200 && res.status < 300)
                        setIsSuccessAddEditDel(true);
                } catch (err) {
                    setIsErrorAddEditDel(true);
                    setIsSuccessAddEditDel(false);
                    if(err.status === 401){
                        navigate('/login',{state:{redirect: true}});
                    }
                    console.log(err);
                }
            }

            sendDelete();
            setDataRefresh(!dataRefresh);
        }

        setIsDelete(false);
    }

    async function handleSort(colName,ascending) {
        const type = "expense";

        try{
            setIsLoading(true);
            setIsError(false);
            const res = await axios.get(`http://localhost:8080/getAllTransactions/filter?type=${type}&sortBy=${colName}&ascending=${ascending}`,{withCredentials: true});
            //console.log(res.data);
            setExpenses(res.data);
        }
        catch (e){
            setIsError(true);
            console.log(e)
        }
        finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="flex flex-row h-auto drawer-content">
                {/* Sidebar on the left */}
                <Sidebar className="w-64"/>

                {/* Main content (Expenses) takes up the remaining space */}
                <div className="flex-grow">
                    <Navbar />
                    <div className="flex justify-center items-center gap-10 mt-10 p-6">
                        <div className="flex flex-col gap-10">
                            {isSuccessAddEditDel ? <SuccessAlert onClose={() => {setIsSuccessAddEditDel(false)}}/> : null}
                            {isErrorAddEditDel ? <ErrorAlert onClose={() => {setIsErrorAddEditDel(false)}}/> : null}
                            <h1 className="text-3xl font-bold text-center">Expenses</h1>
                            <CardExpenses amount={totalExpense} income={totalIncome}/>
                        </div>

                        <div className="flex flex-col grow">
                            <div className="bg-slate-800 rounded-md p-2">
                                <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400">Enter a
                                    new
                                    expense:</p>
                                {<AddExpenseForm addExpense={addExpense}/>}
                            </div>
                        </div>

                    </div>

                    <div className="card bg-base-100 shadow-xl my-14">
                        <ExpensesTable expenses={expenses} onEdit={handleEdit} onDelete={handleDeleteSubmit} onSort={handleSort}/>
                    </div>
                    <Footer/>

                    {isDelete ? <DeleteAlert onPress={handleDeleteConfirmation}/> : null}
                </div>

            </div>

            {expToEdit !== null ?
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="bg-base-300 min-h-full w-6/12 p-4">
                        <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400 mt-10">Enter the
                            new
                            expense data:</p>
                        <EditExpenseForm editExpense={submitEdit} expense={expToEdit}/>
                    </div>
                </div> : null
            }
        </div>
    );
}

export default Expenses;