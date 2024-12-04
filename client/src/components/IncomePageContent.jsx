import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ErrorFetching from "../pages/ErrorFetching.jsx";
import Loading from "../pages/Loading.jsx";
import Navbar from "./Navbar.jsx";
import SuccessAlert from "./alerts/successAlert.jsx";
import ErrorAlert from "./alerts/errorAlert.jsx";
import CardIncome from "./income/CardIncome.jsx";
import AddIncomeForm from "./income/AddIncomeForm.jsx";
import IncomeTable from "./income/IncomeTable.jsx";
import Footer from "./Footer.jsx";
import DeleteAlert from "./alerts/DeleteAlert.jsx";
import EditIncomeForm from "./income/EditIncomeForm.jsx";
import PieChartCategory from "./income/PieChartCategory.jsx";

function IncomePageContent(props) {

    const navigate = useNavigate();
    const [incomes, setIncomes] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(false);
    const [incomeToEdit, setIncomeToEdit] = useState(null);
    const [idToDel, setIdToDel] = useState();
    const [isDel, setIsDel] = useState(false);
    const [isSuccessAddEditDel, setIsSuccessAddEditDel] = useState(false);
    const [isErrorAddEditDel, setIsErrorAddEditDel] = useState(false);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/getAllIncomes`, {withCredentials: true});
                console.log(res.data);
                setIncomes(res.data.allIncomes);
                setTotalIncome(res.data.totalIncome);
            } catch (err) {
                setIsError(true);
                if (err.status === 401) {
                    navigate('/login', {state: {redirect: true}});
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchIncomes();
    }, [dataRefresh])

    if (isError) {
        return <ErrorFetching/>;
    }

    if (isLoading) {
        return <Loading/>;
    }

    const calculateCategoryPercentages = () => {
        // Inițializăm un Map pentru a stoca totalul pe categorii
        const categoryMap = new Map();

        // Calculăm suma fiecărei categorii
        incomes.forEach((income) => {
            const currentTotal = categoryMap.get(income.category) || 0;
            categoryMap.set(income.category, currentTotal + income.amount);
        });

        // Transformăm Map-ul într-un array de obiecte cu procentajul calculat
        const percentages = Array.from(categoryMap.entries()).map(([category, amount]) => ({
            title: category,
            value: Math.round((amount / totalIncome) * 100),
        }));

        return percentages;
    };

    async function addIncome(income) {
        try {
            setIsErrorAddEditDel(false);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/addIncome`, income, {withCredentials: true});
            setIsSuccessAddEditDel(true);
        } catch (err) {
            setIsErrorAddEditDel(true);
            setIsSuccessAddEditDel(false);
            if (err.status === 401) {
                navigate('/login', {state: {redirect: true}});
            }
            console.log(err)
        }
        setDataRefresh(!dataRefresh);
    }

    function handleEdit(income) {
        setIncomeToEdit(income);
    }

    async function submitEdit(newIncome) {
        try {
            setIsErrorAddEditDel(false);
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/updateIncome`, newIncome, {withCredentials: true});
            setIsSuccessAddEditDel(true);

        } catch (err) {
            setIsErrorAddEditDel(true);
            setIsSuccessAddEditDel(false);
            if (err.status === 401) {
                navigate('/login', {state: {redirect: true}});
            }
            console.log(err);
        }
        setDataRefresh(!dataRefresh);
    }

    function handleDeleteSubmit(income) {
        setIdToDel(income.id);
        setIsDel(true);
    }

    function handleDeleteConfirmation(confirmation) {
        if (confirmation) {
            const sendDel = async () => {
                try {
                    setIsErrorAddEditDel(false);
                    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteIncome/${idToDel}`, {withCredentials: true});
                    if (response.status >= 200 && response.status < 300)
                        setIsSuccessAddEditDel(true);
                } catch (err) {
                    setIsErrorAddEditDel(true);
                    setIsSuccessAddEditDel(false);
                    if (err.status === 401) {
                        navigate('/login', {state: {redirect: true}});
                    }
                    console.log(err);
                }
            }

            sendDel();
            setDataRefresh(!dataRefresh);
        }
        setIsDel(false);
    }

    async function handleSort(colName, ascending) {
        const type = "income";

        try {
            setIsError(false);
            setIsLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/getAllTransactions/filter?type=${type}&sortBy=${colName}&ascending=${ascending}`);
            //console.log(res.data);
            setIncomes(res.data);

        } catch (e) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex-grow drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold p-5">Incomes</h1>
                    <Navbar/>
                </div>

                <div className="flex mt-14 justify-between px-20">
                    <div className="flex flex-col gap-10 justify-center items-center">
                        {isSuccessAddEditDel && <SuccessAlert onClose={() => {
                            setIsSuccessAddEditDel(false)
                        }}/>}
                        {isErrorAddEditDel && <ErrorAlert onClose={() => {
                            setIsErrorAddEditDel(false)
                        }}/>}

                        <CardIncome amount={totalIncome}/>
                        <PieChartCategory data={calculateCategoryPercentages()}/>

                    </div>

                    <div className="flex flex-col w-2/3">
                        <div className="bg-base-200 rounded-md p-2">
                            <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400">Enter a new
                                income:</p>
                            <AddIncomeForm addIncome={addIncome}/>
                        </div>
                    </div>

                </div>

                <div className="bg-base-200 bg-opacity-90 shadow-xl my-14 mx-3 rounded-md">
                    {<IncomeTable incomes={incomes} onEdit={handleEdit} onDelete={handleDeleteSubmit}
                                  onSort={handleSort}/>}
                </div>
                <Footer/>

                {isDel && <DeleteAlert onPress={handleDeleteConfirmation}/>}
            </div>

            {incomeToEdit !== null ?
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="bg-base-300 min-h-full w-6/12 p-4">
                        <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400 mt-10">Enter
                            the
                            new
                            income data:</p>
                        <EditIncomeForm editIncome={submitEdit} income={incomeToEdit}/>
                    </div>
                </div> : null
            }
        </div>
    );
}

export default IncomePageContent;