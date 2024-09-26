import React from 'react';
import CardIncome from "../components/CardIncome.jsx";
import CardTotal from "../components/CardTotal.jsx";
import CardExpenses from "../components/CardExpenses.jsx";
import Table1 from "../components/Table1.jsx";
import ChartComponent from "../components/Chart1.jsx";
import Footer from "../components/Footer.jsx";


function Home() {
    return (
        <div className="container mx-auto bg-base-100">
            <div className="w-full max-w-screen-lg mx-auto mt-14 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardTotal/>
                    <CardIncome/>
                    <CardExpenses/>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
                {/* Table Card */}
                <div className="card bg-slate-800 shadow-xl p-6">
                    <Table1/>
                </div>

                {/* Chart Card */}
                <div className="card bg-slate-800 shadow-xl p-6">
                    <ChartComponent/>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;