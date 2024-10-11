import React, {useEffect, useState} from 'react';
import axios from "axios";
import * as res from "autoprefixer";
import Loading from "../../pages/Loading.jsx";
import ErrorFetching from "../../pages/ErrorFetching.jsx";
import CryptoCard from "./CryptoCard.jsx";
import bnb from "/bnb.png"
import btc from "/btc.png"
import eth from "/eth.png"
import euro from "/euro.png"
import sol from "/sol.png"
import usd from "/usd.png"

function Crypto(props) {

    const [currency, setCurrency] = useState("USD");
    const [cryptoData, setCryptoData] = useState([ {
        "1. From_Currency Code": "BTC",
        "2. From_Currency Name": "Bitcoin",
        "3. To_Currency Code": "EUR",
        "4. To_Currency Name": "Euro",
        "5. Exchange Rate": "56815.04000000",
        "6. Last Refreshed": "2024-10-11 15:24:39",
        "7. Time Zone": "UTC",
        "8. Bid Price": "56813.05900000",
        "9. Ask Price": "56817.30100000"
    }]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const cryptoLogos  = [btc,eth,bnb,sol];
    const currencyLogos = [usd,euro];

    useEffect(() => {
        var crypto = "BTC";
        const fetchData = async () => {
            try {
                setIsLoading(true);
                let response = await axios.get(`${import.meta.env.VITE_API_URL}/getCryptoData?crypto=${crypto}&currency=${currency}`);
                setCryptoData((prevValue) => [...prevValue,response]);

                crypto = "ETH"
                response = await axios.get(`${import.meta.env.VITE_API_URL}/getCryptoData?crypto=${crypto}&currency=${currency}`);
                setCryptoData((prevValue) => [...prevValue,response]);

                crypto = "BNB"
                response = await axios.get(`${import.meta.env.VITE_API_URL}/getCryptoData?crypto=${crypto}&currency=${currency}`);
                setCryptoData((prevValue) => [...prevValue,response]);

                crypto = "SOL"
                response = await axios.get(`${import.meta.env.VITE_API_URL}/getCryptoData?crypto=${crypto}&currency=${currency}`);
                setCryptoData((prevValue) => [...prevValue,response]);
            }
            catch (e){
                if(e.status !== 500) //if backend send 500 i've reach daily request limit
                    setIsError(true);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    if (isError) {
        return <ErrorFetching/>;
    }

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className="flex flex-col gap-5  rounded-lg p-5">

            <div className="flex justify-between">
                <p className="font-bold text-4xl hover:text-red-700 cursor-pointer">Crypto</p>
                Last updated: {cryptoData[0]["6. Last Refreshed"]}
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