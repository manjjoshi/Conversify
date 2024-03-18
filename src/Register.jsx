

import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import logo from "./assets/logo.svg";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
    const [showOverlay, setShowOverlay] = useState(true);
    const [showChatApp, setShowChatApp] = useState(false);
    const [chatAppFontSize, setChatAppFontSize] = useState('10rem');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowOverlay(false);
            setShowChatApp(true);
        }, 2000); 

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        setChatAppFontSize(showChatApp ? '20rem' : '10rem');
    }, [showChatApp]);

    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = isLoginOrRegister === 'register' ? 'register' : 'login';
        const { data } = await axios.post(url, { username, password });
        setLoggedInUsername(username);
        navigate('/Chat');
        setId(data.id);
    }

    const pageStyle = {
        backgroundImage: `url('/register-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        position: 'relative',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        zIndex: 2,
        display: showOverlay ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '10rem',
        opacity: showOverlay ? 1 : 0,
        transition: 'opacity 1s',
        background: 'linear-gradient(to right, #180032, #4a148c, #6200ea, #7c4dff, #b39ddb)',
        cursor: 'pointer',
        transition: 'opacity 1s',
        '&:hover': {
            opacity: 0.9,
        },
    };

    const chatAppStyle = {
        fontSize: chatAppFontSize,
        fontWeight: 'bold',
        animation: showChatApp ? 'fade-in 1s ease-out move-up 1s ease-out' : 'none',
        display: 'inline-block',
    };

    const formContainerStyle = {
        backgroundImage: 'linear-gradient(to bottom right, #19216C, #6B2A80)',
        borderRadius: '15px',
        boxShadow: '7px 7px 7px rgba(140, 80, 255, 0.6)',
        padding: '30px',
        border: '2px solid #e7bo58',
        width: '520px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: showOverlay ? 0 : 1,
        transition: 'opacity 1s',
        marginBottom: '20px', 
    };

    const inputStyle = 'w-full p-4 mb-2 border rounded-sm text-black';

    const buttonStyle = 'bg-blue-500 text-white block w-full rounded-sm p-2';

    const styles = `
        @keyframes move-up {
            from {
                transform: translateY(100px);
            }
            to {
                transform: translateY(0);
            }
        }

        @keyframes fade-in {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @media screen and (max-width: 600px) {
            formContainerStyle {
                width: 90%;
            }
    
            chatAppStyle {
                font-size: 10vw;
            }
        }
    
        @media screen and (max-width: 400px) {
            formContainerStyle {
                width: 95%;
            }
    
            chatAppStyle {
                font-size: 8vw;
            }
        }
    `;

    return (
        <div style={pageStyle}>
            <style>
                {styles}
            </style>
            <form style={formContainerStyle} onSubmit={handleSubmit}>
                <img
                    src={logo}
                    alt="Logo"
                    style={{ width: '100px', height: '50px', marginBottom: '15px' }}
                />
                <div className="mb-4 text-lg font-bold text-blue-500">USER</div>
                <input
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}
                    type="text"
                    placeholder="username"
                    className={inputStyle}
                />
                <input
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    type="password"
                    placeholder="password"
                    className={inputStyle}
                />
                <button className={buttonStyle}>
                    {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
                </button>
                <div className="text-center mt-2 text-white">
                    {isLoginOrRegister === 'register' && (
                        <div>
                            Already a member? 
                            <button onClick={() => setIsLoginOrRegister('login')}>
                                 Login here
                            </button>
                        </div>
                    )}
                    {isLoginOrRegister === 'login' && (
                        <div>
                            Dont have an account?
                            <button onClick={() => setIsLoginOrRegister('register')}>
                                 Register here
                            </button>
                        </div>
                    )}
                </div>
            </form>
            <div style={overlayStyle}>
                <div style={chatAppStyle}>CONVERSIFY</div>
            </div>
        </div>
    );
};

export default Register;



