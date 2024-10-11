//add address maybe, and make api req for update, add delete account button

import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faPencil, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function Profile(props) {

    const [userName, setUserName] = React.useState(localStorage.getItem("username"));
    const [email, setEmail] = React.useState(localStorage.getItem("email"));

    return (
        <div className="flex flex-row h-auto">
            <Sidebar/>

            <div className="flex flex-col flex-grow justify-between">
                <Navbar/>
                <div
                    className="flex flex-col text-center bg-base-200 bg-opacity-90 shadow-xl p-6 hover:shadow-3xl mx-auto w-2/3 rounded-2xl">
                    <div className="flex justify-between items-center">
                        <Link to=""><FontAwesomeIcon icon={faUserGroup} className="size-9 hover:text-lime-400"/></Link>
                        <div className="w-28 rounded-xl bg-teal-600">
                            <img src={`https://robohash.org/${localStorage.getItem('username')}.png`}
                                 alt="avatar-image"/>
                        </div>
                        <Link><FontAwesomeIcon icon={faComments} className="size-9 hover:text-lime-400"/></Link>
                    </div>

                    <p className="text-4xl font-extrabold mt-10 hover:text-lime-400">{userName}</p>

                    <div className="grid grid-cols-3 gap-2 mt-10 items-center place-items-center">
                        <p className="font-semibold">Username</p>
                        <input type="text" placeholder="Username" value={userName} className="input input-ghost"/>
                        <FontAwesomeIcon icon={faPencil} className="place-self-start self-center"/>

                        <p className="font-semibold">Email</p>
                        <input type="text" placeholder="Email" value={email} className="input input-ghost"/>
                        <FontAwesomeIcon icon={faPencil} className="place-self-start self-center"/>
                    </div>

                    <div className="flex gap-8 mt-10 items-center justify-center">
                        <button className="btn btn-warning btn-outline rounded-full">Update</button>
                        <button className="btn rounded-full bg-red-700 text-white">Delete user</button>
                    </div>
                </div>

                <Footer/>
            </div>
        </div>
    );
}

export default Profile;