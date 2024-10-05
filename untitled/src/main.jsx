import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Error from './pages/Error.jsx';
import Expenses from "./pages/Expenses.jsx";
import Income from "./pages/Income.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />, //make a home page with 2 buttons sign up sign in
        errorElement: <Error />
    },
    {
        path: '/home',
        element: <App />,
        errorElement: <Error />
    },
    {
        path: '/expenses',
        element: <Expenses />,
        errorElement: <Error />
    },
    {
        path: '/incomes',
        element: <Income />,
        errorElement: <Error />
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <Error />
    },
    {
        path: '*',
        element: <Error />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);