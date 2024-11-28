import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import React from "react";



function App() {
    return (
        <div className="flex flex-row gap-10">
            <Sidebar/>
            <Home/>
        </div>
    )
}

export default App
