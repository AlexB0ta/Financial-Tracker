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
//import WelcomePage from "./pages/Welcome.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
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
        path: '/profile',
        element: <Profile />,
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