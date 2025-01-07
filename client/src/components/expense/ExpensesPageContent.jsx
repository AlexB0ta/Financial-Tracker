import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar.jsx";
import SuccessAlert from "../alerts/successAlert.jsx";
import ErrorAlert from "../alerts/errorAlert.jsx";
import CardExpenses from "./CardExpenses.jsx";
import AddExpenseForm from "./AddExpenseForm.jsx";
import ExpensesTable from "./ExpensesTable.jsx";
import Footer from "../Footer.jsx";
import DeleteAlert from "../alerts/DeleteAlert.jsx";
import EditExpenseForm from "./EditExpenseForm.jsx";
import ErrorFetching from "../../pages/ErrorFetching.jsx";
import Loading from "../../pages/Loading.jsx";
import PieChartCategory from "../PieChartCategory.jsx";

function ExpensesPageContent(props) {

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
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/getAllExpenses`,{withCredentials: true});
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

    const categoryColors = {
        Food: "#34D399",
        Transportation: "#60A5FA",
        Housing: "#F87171",
        Entertainment: "#FBBF24",
        Health: "#A78BFA",
        Utilities: "#094509",
        Other: "#ece8e8"
    };

    function generateRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    expenses.forEach(expense => {
        if (!(expense.category in categoryColors)) {
            categoryColors[expense.category] = generateRandomColor();
        }
    })

    const calculateCategoryPercentages = () => {
        // Inițializăm un Map pentru a stoca totalul pe categorii
        const categoryMap = new Map();

        // Calculăm suma fiecărei categorii
        expenses.forEach((expense) => {
            const currentTotal = categoryMap.get(expense.category) || 0;
            categoryMap.set(expense.category, currentTotal + expense.amount);
        });

        // Transformăm Map-ul într-un array de obiecte cu procentajul calculat
        const percentages = Array.from(categoryMap.entries()).map(([category, amount]) => ({
            title: category,
            value: Math.round((amount / totalExpense) * 100),
            color: categoryColors[category]
        }));

        return percentages;
    };

    async function addExpense(expense) {
        //console.log(expense);
        //insert into db table
        try {
            setIsErrorAddEditDel(false);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/addExpense`, expense,{withCredentials: true});
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
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/updateExpense`, newExpense,{withCredentials: true});
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
                    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteExpense/${idToDel}`,{withCredentials: true});
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
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/getAllTransactions/filter?type=${type}&sortBy=${colName}&ascending=${ascending}`);
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
        <div className="flex-grow drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold p-5">Expenses</h1>
                    <Navbar/>
                </div>

                <div className="flex mt-14 justify-between px-20">
                    <div className="flex flex-col gap-10 justify-center items-center">
                        {isSuccessAddEditDel ? <SuccessAlert onClose={() => {
                            setIsSuccessAddEditDel(false)
                        }}/> : null}
                        {isErrorAddEditDel ? <ErrorAlert onClose={() => {
                            setIsErrorAddEditDel(false)
                        }}/> : null}

                        <CardExpenses amount={totalExpense} income={totalIncome}/>
                        <PieChartCategory data={calculateCategoryPercentages()}/>
                    </div>

                    <div className="flex flex-col w-2/3">
                        <div className="bg-base-200 rounded-xl p-2">
                            <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400">Enter a
                                new
                                expense:</p>
                            {<AddExpenseForm addExpense={addExpense}/>}
                        </div>
                    </div>
                </div>

                <div className="card bg-base-200 bg-opacity-90 shadow-xl my-5 mx-3 rounded-md">
                    <ExpensesTable expenses={expenses} colors={categoryColors} onEdit={handleEdit} onDelete={handleDeleteSubmit}
                                   onSort={handleSort}/>
                </div>
                <Footer/>

                {isDelete ? <DeleteAlert onPress={handleDeleteConfirmation}/> : null}
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

export default ExpensesPageContent;