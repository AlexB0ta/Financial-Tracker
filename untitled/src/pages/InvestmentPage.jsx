import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import Stocks from "../components/investments/Stocks.jsx";
import Crypto from "../components/investments/Crypto.jsx";

function InvestmentPage(props) {

    const [tabSelected, setTabSelected] = useState(1);

    return (
        <div className="flex flex-row h-auto ">
            <Sidebar/>

            <div className="flex flex-col flex-grow">
                <Navbar/>

                <div className="flex flex-col gap-5 mb-11 px-10 ">
                    <div role="tablist" className="tabs tabs-boxed w-1/3 bg-base-200 bg-opacity-90">
                        <a role="tab" className={`tab ${tabSelected === 1 && "tab-active"}`}
                           onClick={() => setTabSelected(1)}>Stocks</a>
                        <a role="tab" className={`tab ${tabSelected === 2 && "tab-active"}`}
                           onClick={() => setTabSelected(2)}>Crypto</a>
                    </div>

                    {tabSelected === 1 && <Stocks/>}
                    {tabSelected === 2 && <Crypto/>}

                </div>

                <Footer/>
            </div>


        </div>
    );
}

export default InvestmentPage;