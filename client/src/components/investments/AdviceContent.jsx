import React, {useEffect, useState} from 'react';
import axios from "axios";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator
} from '@chatscope/chat-ui-kit-react';
import {useNavigate} from "react-router-dom";

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
            parts.push(<span key={match.index} style={{fontWeight: "600"}}>{match[3]}</span>);
        }

        lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last match
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts;
};

function AdviceContent(props) {

    const navigate = useNavigate();
    const [advice, setAdvice] = useState("");
    const [isReady, setIsReady] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello!",
            sender: "PinguAI",
            direction: "incoming"
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const data = localStorage.getItem('quizAnswers');

    useEffect(() => {
        let isMounted = true; // Guard to prevent duplicate calls

        const fetchData = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/getAiAdvice`, {data}, {withCredentials: true});

                if (isMounted) {
                    //console.log(response.data);
                    setAdvice(response.data);

                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            message: response.data,
                            sender: "PinguAI",
                            direction: "incoming",
                        },
                    ]);

                    setIsReady(true);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    async function fetchAiResponse(inputMsg) {
        console.log(inputMsg)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/getAiResponse`, {inputMsg}, {withCredentials: true});
            setMessages((prevValue) => [...prevValue, {
                message: parseText(response.data),
                sender: "PinguAI",
                direction: "incoming",
            }]);
        } catch (err) {
            console.log(err);
            if (err.status === 401) {
                navigate('/login', {state: {redirect: true}});
            }
        }
    }

    const handleSend = async (msg) => {
        const newMsg = {
            message: msg,
            sender: "user",
            direction: "outgoing"
        }

        setMessages((prevMessages) => [...prevMessages, newMsg]);
        setIsTyping(true);
        //send msg

        await fetchAiResponse(newMsg);

        setIsTyping(false);
    }

    return (
        <div className="h-96">
            {isReady &&
                <MainContainer className="rounded-xl"> {/* Light gray background */}
                    <ChatContainer style={{backgroundColor: "#e0f7fa"}}> {/* Light cyan background */}
                        <MessageList typingIndicator={isTyping && <TypingIndicator content={"PinguAI is typing..."}/>}
                                     scrollBehavior="smooth" className="h-full overflow-y-auto">
                            {messages.map((message, index) => (
                                <Message key={index} model={message}/>
                            ))}
                        </MessageList>

                        <MessageInput placeholder="Type here..." onSend={handleSend}/>
                    </ChatContainer>
                </MainContainer>
            }

            <img src="/cloud-chat.png" className="fixed bottom-30 right-28 size-20" />
            <img src="/cute-penguin-transparent.png" alt="Penguin"
                 className="fixed bottom-4 right-4 w-36 z-50"/>
        </div>
    );
}

export default AdviceContent;
