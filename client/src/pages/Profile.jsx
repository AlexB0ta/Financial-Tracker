import React, {useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPencil, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {Link, redirect, useNavigate} from "react-router-dom";
import axios from "axios";
import DeleteAlert from "../components/alerts/DeleteAlert.jsx";
import ErrorAlert from "../components/alerts/errorAlert.jsx";
import SuccessAlert2 from "../components/alerts/successAlertV2.jsx";
import * as response from "autoprefixer";

function Profile(props) {

    const [userName, setUserName] = useState(localStorage.getItem("username"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [isDelete, setIsDelete] = useState(false);
    const [isSuccessEditDel, setIsSuccessEditDel] = useState(false);
    const [isErrorEditDel, setIsErrorEditDel] = useState(false);
    const navigate = useNavigate();

    async function handleEdit() {
        if (!userName || !email) {
            alert("Please fill all the fields");
            return;
        }

        try {
            setIsErrorEditDel(false);
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/editUser`, {
                userName,
                email
            }, {withCredentials: true});

            setIsSuccessEditDel(true);

        } catch (err) {
            setIsErrorEditDel(true);
            setIsSuccessEditDel(false);
            setUserName(localStorage.getItem("username"));
            setEmail(localStorage.getItem("email"));
            console.log(err);
        }

    }

    async function handleDelete(confirm) {
        if (confirm) {
            try {
                const response = await axios.delete("http://localhost:8080/deleteUser", {
                    data: email,
                    withCredentials: true
                });

                setTimeout(() => {
                    navigate('/login',{state: {redirect: true}});
                }, 1000);

            } catch (err) {
                setIsErrorEditDel(true);
                //console.log(err);
            }
        } else {
            setIsDelete(false);
        }
    }

    return (
        <div className="flex flex-row h-auto drawer-content">
            <Sidebar/>

            <div className="flex flex-col flex-grow justify-between items-center">
                <Navbar/>

                <div
                    className="flex flex-col text-center bg-slate-800 shadow-xl p-6 hover:shadow-3xl mx-auto w-2/3 rounded-2xl">
                    <div className="flex justify-between items-center">
                        <Link to=""><FontAwesomeIcon icon={faUserGroup} className="size-9 hover:text-lime-400"/></Link>
                        <div className="w-28 rounded-xl bg-teal-600">
                            <img src={`https://robohash.org/${localStorage.getItem('username')}.png`}
                                 alt="avatar-image"/>
                        </div>
                        <Link><FontAwesomeIcon icon={faBars} className="size-9 hover:text-lime-400"/></Link>
                    </div>

                    <p className="text-4xl font-extrabold mt-10 hover:text-lime-400">{localStorage.getItem("username")}</p>

                    <div className="grid grid-cols-2 gap-2 mt-10 items-center place-items-center">
                        <p className="font-semibold">Username</p>
                        <label className="input input-ghost flex items-center gap-2 hover:text-white">
                            <input type="text" placeholder="Username" value={userName} className="grow"
                                   onChange={(e) => setUserName(e.target.value)}/>
                            <FontAwesomeIcon icon={faPencil}/>
                        </label>

                        <p className="font-semibold">Email</p>
                        <label className="input input-ghost flex items-center gap-2 hover:text-white">
                            <input type="text" placeholder="Email" value={email} className="grow"
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <FontAwesomeIcon icon={faPencil}/>
                        </label>
                    </div>

                    <div className="flex gap-8 mt-10 items-center justify-center">
                        <button className="btn btn-warning btn-outline rounded-full" onClick={handleEdit}>Update
                        </button>
                        <button className="btn rounded-full bg-red-700 text-white"
                                onClick={() => setIsDelete(true)}>Delete user
                        </button>
                    </div>

                </div>

                <div className="shrink">
                    {isErrorEditDel && <ErrorAlert onClose={() => {
                        setIsErrorEditDel(false)
                    }}/>}
                    {isSuccessEditDel && <SuccessAlert2 onClose={() => {
                        navigate('/login', {state: {redirect: true}})
                    }}/>}
                </div>

                <Footer/>

            </div>
            {isDelete && <DeleteAlert onPress={handleDelete}/>}
        </div>
    );
}

export default Profile;