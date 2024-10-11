import React, {useEffect, useState} from 'react';
import axios from "axios";
import ErrorFetching from "../../pages/ErrorFetching.jsx";
import Loading from "../../pages/Loading.jsx";
import TableStocks from "./TableStocks.jsx";

function Stocks(props) {

    const [tabSelected, setTabSelected] = useState(1);
    const [topGainers, setTopGainers] = useState([]);
    const [topLosers, setTopLosers] = useState([]);
    const [mostTraded, setMostTraded] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/getBestInvestments`);
                setTopGainers(response.data.top_gainers);
                setTopLosers(response.data.top_losers)
                setMostTraded(response.data.most_actively_traded)
                setLastUpdate(response.data.last_updated)
            } catch (e) {
                if(e.status !== 500) //if backend send 500 i've reach daily request limit
                    setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    if (isError) {
        return <ErrorFetching/>;
    }

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className="flex flex-col gap-5  rounded-lg p-5">

            <div className="flex justify-between">
                <p className="font-bold text-4xl hover:text-red-700 cursor-pointer">Stocks</p>
                Last updated: {lastUpdate ? lastUpdate : "-"}
            </div>

            <div role="tablist" className="tabs tabs-bordered font-semibold text-md">
                <a role="tab" className={`tab ${tabSelected === 1 && "tab-active text-lime-500"}`}
                   onClick={() => setTabSelected(1)}>Top Gainers</a>
                <a role="tab" className={`tab ${tabSelected === 2 && "tab-active text-lime-500"}`}
                   onClick={() => setTabSelected(2)}>Top Losers</a>
                <a role="tab" className={`tab ${tabSelected === 3 && "tab-active text-lime-500"}`}
                   onClick={() => setTabSelected(3)}>Most actively traded</a>
            </div>


            {tabSelected === 1 && <TableStocks data={topLosers}/>}
            {tabSelected === 2 && <TableStocks data={topLosers}/>}
            {tabSelected === 3 && <TableStocks data={mostTraded}/>}

        </div>
    );
}

export default Stocks;