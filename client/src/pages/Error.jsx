import React from 'react';
import { Link } from "react-router-dom";

function Error(props) {
    return (
        <div className="container mx-auto p-10 h-screen py-52">
            <div className="mockup-window bg-base-300 border p-10 ">
                <div
                    className="bg-base-200 flex flex-col justify-center items-center px-4 py-16 text-2xl font-bold text-slate-200">404
                    Page not found!
                    <div className="text-xl pt-10 font-normal">Looks like you are trying to access a invalid page!</div>
                    <div className="pt-10">
                        <Link to="/">
                            <button className="btn btn-outline btn-info">Back to welcome page!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;