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

function Income(props) {

    const [incomes, setIncomes] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(false);
    const [incomeToEdit, setIncomeToEdit] = useState(null);
    const [isSuccessAddEdit, setIsSuccessAddEdit] = useState(false);
    const [isErrorAddEdit, setIsErrorAddEdit] = useState(false);

    useEffect(() => {
        const fetchIncomes = async () => {
            try{
                setIsLoading(true);
                const res = await axios.get('http://localhost:8080/getAllIncomes');
                console.log(res.data);
                setIncomes(res.data.allIncomes);
                setTotalIncome(res.data.totalIncome);
            }
            catch(err){
                setIsError(true);
                console.log(err);
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
            setIsErrorAddEdit(false);
            const res = await axios.post('http://localhost:8080/addIncome',income);
            setIsSuccessAddEdit(true);
        }catch(err){
            setIsErrorAddEdit(true);
            setIsSuccessAddEdit(false);
            console.log(err)
        }
        setDataRefresh(!dataRefresh);
    }

    function handleEdit(income) {
        setIncomeToEdit(income);
    }

    async function submitEdit(newEdit){
        try{
            setIsErrorAddEdit(false);
            const res = await axios.patch('http://localhost:8080/updateIncome',newEdit);
            setIsSuccessAddEdit(true);

        }catch(err){
            setIsErrorAddEdit(true);
            setIsSuccessAddEdit(false);
            console.log(err);
        }
        setDataRefresh(!dataRefresh);
    }

    function handleDelete(income) {

    }

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="flex flex-row h-auto drawer-content">

                <Sidebar className="w-64"/>

                <div className="flex-grow p-6">
                    <div className="flex justify-center items-center gap-10 mt-10">
                        <div className="">
                            <h1 className="text-3xl font-bold mb-6 text-center">Incomes</h1>
                            <CardIncome amount={totalIncome}/>
                        </div>

                        <div className="grow bg-slate-800 rounded-md p-2">
                            <p className="font-bold text-2xl text-center text-slate-200 hover:text-sky-400">Enter a new
                                income:</p>
                            <AddIncomeForm addIncome={addIncome}/>
                        </div>

                    </div>

                    <div className="bg-base-100 shadow-xl my-14">
                        {<IncomeTable incomes={incomes} onEdit={handleEdit} onDelete={handleDelete} />}
                    </div>
                    <Footer/>
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