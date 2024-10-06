import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import LogOutAlert from "./alerts/LogOutAlert.jsx";
import axios from "axios";

function Navbar(props) {

    const navigate = useNavigate();
    const [isAlertVisible, setAlertVisible] = useState(false);

    function handleLogout(confirmation) {
        if(confirmation) {
            const submitLogout = async () => {
                await axios.post('http://localhost:8080/logout', {}, {withCredentials: true});
                navigate("/login");
            }

            submitLogout();
        }
        else
            setAlertVisible(false);
    }

    return (
        <div className="navbar bg-base-100 flex justify-between">
            {isAlertVisible ? <LogOutAlert onPress={handleLogout} /> : <div></div>}
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                        <div className="bg-white text-neutral-content w-12 rounded-full">
                            <img src={`https://robohash.org/${localStorage.getItem('username')}.png`}
                                 alt="avatar-image"/>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-36 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a className="justify-between hover:bg-red-500" onClick={() =>setAlertVisible(true)}>
                                Logout
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="pr-2"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;