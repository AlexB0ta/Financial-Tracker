import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Login(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if(!email || !password){
            alert("Please fill out all fields");
        }

        try{
            setIsError(false)
            const response = await axios.post("http://localhost:8080/login", {email, password},{withCredentials: true});
            console.log(response);
            navigate("/");
        }
        catch(err) {
            setIsError(true);
            console.log(err);
        }

        setEmail("");
        setPassword("");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-l from-slate-700 to-gray-950">
            <div className="flex w-full max-w-4xl shadow-2xl rounded-lg">
                {/* Left side (Login form) */}
                <div className="w-1/2 bg-base-300 p-10  rounded-l-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
                    <form onSubmit={handleSubmit}>
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
                        <div className="form-control mt-6">
                            <button
                                className="btn btn-primary w-full bg-gradient-to-r from-orange-400 to-yellow-900 text-white">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right side (Welcome message) */}
                <div
                    className="w-1/2 bg-gradient-to-l from-blue-700 to-purple-950 text-white flex flex-col items-center justify-center p-10  rounded-r-lg">
                    <h2 className="text-4xl font-bold mb-4">Welcome to login</h2>
                    <p className="text-lg mb-6">Don't have an account?</p>
                    <Link className="btn btn-outline btn-white" to="/register" >Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;