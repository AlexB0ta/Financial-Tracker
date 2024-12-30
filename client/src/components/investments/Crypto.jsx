import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loading from "../../pages/Loading.jsx";
import ErrorFetching from "../../pages/ErrorFetching.jsx";
import CryptoCard from "./CryptoCard.jsx";
import bnb from "/bnb.png"
import btc from "/btc.png"
import eth from "/eth.png"
import euro from "/euro.png"
import sol from "/sol.png"
import usd from "/usd.png"
import {useNavigate} from "react-router-dom";

function Crypto(props) {

    const navigate = useNavigate();
    const [currency, setCurrency] = useState("USD");
    const [cryptoData, setCryptoData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const cryptoLogos  = [btc,eth,bnb,sol];
    const currencyLogos = [usd,euro];

    useEffect(() => {

        const fetchData = async () => {
            let crypto = "BTC";
            let auxCryptoData = [];

            try {
                setIsLoading(true);
                let response = await axios.get(`${import.meta.env.VITE_API_URL}/getCryptoData?crypto=${crypto}&currency=${currency}`);
                //console.log(response.data["Realtime Currency Exchange Rate"])
                auxCryptoData.push(response.data["Realtime Currency Exchange Rate"]);

                crypto = "ETH"
                response = await axios.get(`${import.meta.env.VITE_API_URL}/getCryptoData?crypto=${crypto}&currency=${currency}`);
                auxCryptoData.push(response.data["Realtime Currency Exchange Rate"]);

                // crypto = "BNB"
                // response = await axios.get(`${import.meta.env.VITE_API_URL}/getCryptoData?crypto=${crypto}&currency=${currency}`);
                // setCryptoData((prevValue) => [...prevValue,response.data["Realtime Currency Exchange Rate"]]);

                crypto = "SOL"
                response = await axios.get(`${import.meta.env.VITE_API_URL}/getCryptoData?crypto=${crypto}&currency=${currency}`);
                auxCryptoData.push(response.data["Realtime Currency Exchange Rate"]);

                setCryptoData(auxCryptoData);
            }
            catch (e){
                if(e.status !== 500) //if backend send 500 i've reach daily request limit
                    setIsError(true);
                if (e.status === 401) {
                    navigate('/login', {state: {redirect: true}});
                }
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [currency]);

    if (isError) {
        return <ErrorFetching/>;
    }

    if (isLoading) {
        return <Loading/>;
    }
    console.log(cryptoData)

    return (
        <div className="flex flex-col gap-5  rounded-lg p-5">

            <div className="flex justify-between">
                <p className="font-bold text-4xl hover:text-red-700 cursor-pointer">Crypto</p>
                Last updated: {cryptoData.length > 0 ? cryptoData[0]["6. Last Refreshed"] : "-"}
            </div>

            <div className="flex flex-row-reverse">
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn btn-outline">Choose currency</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 p-2 shadow">
                        <li><a onClick={() => setCurrency("USD")}>USD</a></li>
                        <li><a onClick={() => setCurrency("EUR")}>EUR</a></li>
                    </ul>
                </div>
            </div>

            {cryptoData.length > 0 ? cryptoData.map((crypto, index) => (
                <CryptoCard key={index} data={crypto} img1={currency === "USD" ? currencyLogos[0] : currencyLogos[1]}
                            img2={cryptoLogos[index]}/>
            )) : <div className="text-center text-xl">Error! You may have exceeded the daily request limit!</div>}
        </div>
    );
}

export default Crypto;