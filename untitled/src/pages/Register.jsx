import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import RegisterSucces from "../components/alerts/registerSucces.jsx";
import RegisterError from "../components/alerts/registerError.jsx";
import {Turnstile} from "@marsidev/react-turnstile";

function Register(props) {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [captchaToken, setCaptchaToken] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if(!username || !password || !email){
            alert("Please fill out all fields");
        }
         try {
             setIsError(false);
             const response = await axios.post(`${import.meta.env.VITE_API_URL}/addUser`, {username, email, password,captchaToken});
             setIsSuccess(true);
         }
        catch(err) {
            setIsError(true);
            setIsSuccess(false);
            console.log(err);
        }
        setPassword("");
        setUsername("");
        setEmail("");
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex w-full max-w-4xl shadow-2xl rounded-lg">
                {/* Left side (Login form) */}
                <div className="w-1/2 bg-base-300 p-10  rounded-l-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" value={username} placeholder="Name" className="input input-bordered" required onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" value={email} placeholder="Email" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" value={password} placeholder="Password" className="input input-bordered" onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <Turnstile siteKey={import.meta.env.VITE_SITE_KEY} className="text-center mt-6" onSuccess={setCaptchaToken}/>
                        <div className="form-control mt-6">
                            <button
                                className="btn btn-primary w-full bg-gradient-to-r from-orange-400 to-yellow-900 hover:to-purple-700 text-white">
                                Sign Up
                            </button>
                        </div>

                    </form>

                    {isSuccess && <RegisterSucces />}
                    {isError && <RegisterError />}

                </div>

                {/* Right side (Welcome message) */}
                <div
                    className="w-1/2 bg-gradient-to-r from-blue-700 to-purple-950 text-white flex flex-col items-center justify-center p-10  rounded-r-lg">
                    <h2 className="text-4xl font-bold mb-4 text-center">Welcome to our service</h2>
                    <p className="text-lg mb-6">Already have an account?</p>
                    <Link className="btn btn-outline btn-white" to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;

