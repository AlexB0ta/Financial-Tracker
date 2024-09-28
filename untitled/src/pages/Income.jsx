import React, {useEffect} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import CardIncome from "../components/income/CardIncome.jsx";
import AddIncomeForm from "../components/income/AddIncomeForm.jsx";
import IncomeTable from "../components/income/IncomeTable.jsx";
import Footer from "../components/Footer.jsx";
import axios from 'axios';

function Income(props) {

    const [incomes, setIncomes] = React.useState([]);
    const [totalIncome, setTotalIncome] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    useEffect(() => {
        const fetchIncomes = async () => {
            try{
                setIsLoading(true);
                const res = await axios.get('http://localhost:8080/getAllIncomes');
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
    },[])

    if(isError){
        return <div>Error</div>;
    }

    if(isLoading){
        return <div>Loading...</div>;
    }

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
                            <CardIncome amount={totalIncome}/>
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