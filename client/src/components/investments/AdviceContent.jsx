import React, { useEffect, useState } from 'react';
import axios from "axios";

function AdviceContent(props) {
    const [advice, setAdvice] = useState("");

    const data = localStorage.getItem('quizAnswers');

    // Function to parse text with * and ** into JSX
    const parseText = (text) => {
        // Regular expression to match **bold** and *semibold*
        const regex = /(\*\*(.*?)\*\*|\*(.*?)\*)/g;

        const parts = [];
        let lastIndex = 0;

        let match;
        while ((match = regex.exec(text)) !== null) {
            // Add the text before the current match
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }

            // Check if it's **bold** or *semibold*
            if (match[1].startsWith("**")) {
                parts.push(<strong key={match.index}>{match[2]}</strong>);
            } else if (match[1].startsWith("*")) {
                parts.push(<span key={match.index} style={{ fontWeight: "600" }}>{match[3]}</span>);
            }

            lastIndex = regex.lastIndex;
        }

        // Add any remaining text after the last match
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/getAiResponse`, { data }, { withCredentials: true });
                console.log(response.data);
                setAdvice(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col p-4 rounded-lg shadow-md chat chat-start">
            <div className="chat-bubble chat-bubble-info ml-52">
                <p className="text-md font-semibold text-white">
                    {parseText(advice)}
                </p>
            </div>

            <div>
                <img
                    src="/cute-penguin.png"
                    alt="Cute Character"
                    className="w-48 h-52 rounded-full border-4 border-blue-300"
                />
            </div>
        </div>
    );
}

export default AdviceContent;
