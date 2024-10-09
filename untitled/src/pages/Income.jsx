import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import CardIncome from "../components/income/CardIncome.jsx";
import AddIncomeForm from "../components/income/AddIncomeForm.jsx";
import IncomeTable from "../components/income/IncomeTable.jsx";
import Footer from "../components/Footer.jsx";
import axios from 'axios';
import ErrorFetching from "./Error.jsx";
import Loading from "./Loading.jsx";
import EditIncomeForm from "../components/income/EditIncomeForm.jsx";
import DeleteAlert from "../components/alerts/DeleteAlert.jsx";
import SuccessAlert from "../components/alerts/successAlert.jsx";
import ErrorAlert from "../components/alerts/errorAlert.jsx";
import Navbar from "../components/Navbar.jsx";
import {useNavigate} from "react-router-dom";

function Income(props) {

    const navigate = useNavigate();
    const [incomes, setIncomes] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(false);
    const [incomeToEdit, setIncomeToEdit] = useState(null);
    const [idToDel, setIdToDel] = useState();
    const [isDel,setIsDel] = useState(false);
    const [isSuccessAddEditDel, setIsSuccessAddEditDel] = useState(false);
    const [isErrorAddEditDel, setIsErrorAddEditDel] = useState(false);

    useEffect(() => {
        const fetchIncomes = async () => {
            try{
                setIsLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/getAllIncomes`,{withCredentials: true});
                console.log(res.data);
                setIncomes(res.data.allIncomes);
                setTotalIncome(res.data.totalIncome);
            }
            catch(err){
                setIsError(true);
                if(err.status === 401){
                    navigate('/login',{state:{redirect: true}});
                }
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchIncomes();
    },[dataRefresh])

    if(isError){
        return <ErrorFetching/>;
    }

    if(isLoading){
        return <Loading />;
    }

    async function addIncome(income) {
        try{
            setIsErrorAddEditDel(false);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/addIncome`,income,{withCredentials: true});
            setIsSuccessAddEditDel(true);
        }catch(err){
            setIsErrorAddEditDel(true);
            setIsSuccessAddEditDel(false);
            if(err.status === 401){
                navigate('/login',{state:{redirect: true}});
            }
            console.log(err)
        }
        setDataRefresh(!dataRefresh);
    }

    function handleEdit(income) {
        setIncomeToEdit(income);
    }

    async function submitEdit(newIncome){
        try{
            setIsErrorAddEditDel(false);
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/updateIncome`,newIncome,{withCredentials: true});
            setIsSuccessAddEditDel(true);

        }catch(err){
            setIsErrorAddEditDel(true);
            setIsSuccessAddEditDel(false);
            if(err.status === 401){
                navigate('/login',{state:{redirect: true}});
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
                try{
                    setIsErrorAddEditDel(false);
                    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteIncome/${idToDel}`,{withCredentials: true});
                    if(response.status >= 200 && response.status < 300)
                        setIsSuccessAddEditDel(true);
                }
                catch(err){
                    setIsErrorAddEditDel(true);
                    setIsSuccessAddEditDel(false);
                    if(err.status === 401){
                        navigate('/login',{state:{redirect: true}});
                    }
                    console.log(err);
                }
            }

            sendDel();
            setDataRefresh(!dataRefresh);
        }
        setIsDel(false);
    }

    async function handleSort(colName,ascending) {
        const type = "income";

        try{
            setIsError(false);
            setIsLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/getAllTransactions/filter?type=${type}&sortBy=${colName}&ascending=${ascending}`);
            //console.log(res.data);
            setIncomes(res.data);

        }
        catch (e){
            setIsError(true)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="flex flex-row h-auto drawer-content">

                <Sidebar className="w-64"/>

                <div className="flex-grow">
                    <Navbar />
                    <div className="flex justify-center items-center gap-10 mt-10 p-6">
                        <div className="flex flex-col gap-10">
                            {isSuccessAddEditDel && <SuccessAlert onClose={() => {setIsSuccessAddEditDel(false)}}/>}
                            {isErrorAddEditDel && <ErrorAlert onClose={() => {setIsErrorAddEditDel(false)}}/>}
                            <h1 className="text-3xl font-bold text-center">Incomes</h1>
                            <CardIncome amount={totalIncome}/>
                        </div>

                        <div className="grow bg-slate-800 rounded-md p-2">
                            <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400">Enter a new
                                income:</p>
                            <AddIncomeForm addIncome={addIncome}/>
                        </div>

                    </div>

                    <div className="bg-base-100 shadow-xl my-14">
                        {<IncomeTable incomes={incomes} onEdit={handleEdit} onDelete={handleDeleteSubmit} onSort={handleSort}/>}
                    </div>
                    <Footer/>

                    {isDel && <DeleteAlert onPress={handleDeleteConfirmation}/>}
                </div>
            </div>

            {incomeToEdit !== null ?
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="bg-base-300 min-h-full w-6/12 p-4">
                        <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400 mt-10">Enter the
                            new
                            income data:</p>
                        <EditIncomeForm editIncome={submitEdit} income={incomeToEdit}/>
                    </div>
                </div> : null
            }
        </div>

    );
}

export default Income;