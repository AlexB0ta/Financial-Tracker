import React, {useEffect, useState} from "react";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import Stocks from "../components/investments/Stocks.jsx";
import Crypto from "../components/investments/Crypto.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import AdviceContent from "../components/investments/AdviceContent.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function InvestmentPage(props) {
    const navigate = useNavigate();
    const [tabSelected, setTabSelected] = useState(1);
    const [isFirst, setIsFirst] = useState(true);
    const [quizAnswers, setQuizAnswers] = useState({
        question1: "",
        question2: "",
        question3: "",
    });
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        // Check if the user has already completed the quiz
        const checkVisited = async () => {
            try {
                const hasVisited = await axios.get(`${import.meta.env.VITE_API_URL}/getVisitedInvestment`, {withCredentials: true});
                //console.log(hasVisited.data)
                if (hasVisited.data === true) {
                    setIsFirst(false);
                }
            }
            catch (e){
                if (e.status === 401) {
                    navigate('/login', {state: {redirect: true}});
                }
                console.log(e);
            }
        }

        checkVisited();
    }, []);

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep((prev) => prev + 1);
        } else {
            handleQuizSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    }

    const handleQuizSubmit = async () => {
        localStorage.setItem("quizAnswers", JSON.stringify(quizAnswers));
        setIsFirst(false);
        setTabSelected(3); //redirect to advice page
        await axios.patch(`${import.meta.env.VITE_API_URL}/setHasVisitedInvestment`, {},{withCredentials: true});
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setQuizAnswers((prev) => ({...prev, [name]: value}));
    };

    const renderCurrentQuestion = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <label className="block mb-10 font-semibold text-white text-3xl">
                            What is your primary investment goal?
                        </label>
                        <select
                            name="question1"
                            value={quizAnswers.question1}
                            onChange={handleInputChange}
                            className="select select-bordered w-full"
                        >
                            <option value="" disabled>Select an option</option>
                            <option value="Growth">Growth</option>
                            <option value="Income">Income</option>
                            <option value="Preservation">Preservation</option>
                        </select>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <label className="block mb-10 font-semibold text-white text-3xl">
                            How long do you plan to invest?
                        </label>
                        <select
                            name="question2"
                            value={quizAnswers.question2}
                            onChange={handleInputChange}
                            className="select select-bordered w-full"
                        >
                            <option value="" disabled>Select an option</option>
                            <option value="Short-term (1-3 years)">Short-term (1-3 years)</option>
                            <option value="Medium-term (3-10 years)">Medium-term (3-10 years)</option>
                            <option value="Long-term (10+ years)">Long-term (10+ years)</option>
                        </select>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <label className="block mb-10 font-semibold text-white text-3xl">
                            What is your risk tolerance?
                        </label>
                        <select
                            name="question3"
                            value={quizAnswers.question3}
                            onChange={handleInputChange}
                            className="select select-bordered w-full"
                        >
                            <option value="" disabled>Select an option</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {isFirst ? (
                <div
                    className="flex flex-col h-screen w-screen bg-black bg-opacity-70 rounded-lg justify-center items-center">
                    <div className="p-6 rounded-lg shadow-lg w-auto">
                        <form className="flex flex-col gap-5">
                            {renderCurrentQuestion()}
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="btn btn-ghost mt-4"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                    Back
                                </button>

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="btn btn-ghost mt-4"
                                >
                                    {currentStep < 3 ? "Next" : "Submit"}
                                    <FontAwesomeIcon icon={faArrowRight}/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row h-auto">
                    <Sidebar/>
                    <div className="flex flex-col flex-grow">
                        <Navbar/>
                        <div className="flex flex-col gap-5 mb-11 px-10 ">
                            <div
                                role="tablist"
                                className="tabs tabs-boxed w-1/3 bg-base-200 bg-opacity-60 indicator"
                            >
                                <a
                                    role="tab"
                                    className={`tab ${tabSelected === 1 && "tab-active"}`}
                                    onClick={() => setTabSelected(1)}
                                >
                                    Stocks
                                </a>
                                <a
                                    role="tab"
                                    className={`tab ${tabSelected === 2 && "tab-active"}`}
                                    onClick={() => setTabSelected(2)}
                                >
                                    Crypto
                                </a>
                                <span className="indicator-item badge badge-error">New</span>
                                <a
                                    role="tab"
                                    className={`tab ${tabSelected === 3 && "tab-active"}`}
                                    onClick={() => setTabSelected(3)}
                                >
                                    Advice
                                </a>
                            </div>

                            {
                                tabSelected === 1 && <Stocks/>
                            }
                            {
                                tabSelected === 2 && <Crypto/>
                            }
                            {
                                tabSelected === 3 && <AdviceContent />
                            }
                        </div>
                        <Footer/>
                    </div>
                </div>
            )}
        </div>
    )
        ;
}

export default InvestmentPage;
