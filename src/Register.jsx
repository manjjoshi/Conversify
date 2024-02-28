// import { useContext, useState } from "react";
// import axios from 'axios';
// import {UserContext} from "./UserContext.jsx";

// export default function Register() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
//     const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);

//     async function handleSubmit(ev){
//         ev.preventDefault();
//         const url = isLoginOrRegister === 'register' ? 'register': 'login';
//         const {data} = await axios.post(url, {username,password});
//         setLoggedInUsername(username);
//         setId(data.id);
//     }

//     const pageStyle = {
//         backgroundImage: `url('/register-bg.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh', // Full viewport height
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-start', // Align to the left
//         padding: '0 210px', // Add some padding to the left side of the page
//     };

//     const formContainerStyle = {
//         backgroundColor: 'rgba(128, 0, 128, 0.1)', // Translucent purple color
//         borderRadius: '15px', // Increase the border radius for a softer look
//         padding: '30px', // Increase the padding for more space inside the form
//         border: '2px solid #e7bo58', // Border color for form
//         width: '550px', // Increase the width of the form container 
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center', // Center form contents horizontally
//     };

//     const logoStyle = {
//         position: 'absolute',
//         top: '20px',
//         left: '20px',
//         width: '100px',
//         height: '50px',
//     };

//     const inputStyle = 'w-full p-4 mb-2 border rounded-sm';

//     const buttonStyle = 'bg-blue-500 text-white block w-full rounded-sm p-2';

//     return (
//         <div style={pageStyle}>
//             <img
//                 src="/logo.png"
//                 alt="Logo"
//                 style={logoStyle}
//             />
//             <form style={formContainerStyle} onSubmit={handleSubmit}>
//                 <div className="mb-4 text-lg font-bold text-blue-500">USER LOGIN</div>
//                 <input
//                     value={username}
//                     onChange={ev => setUsername(ev.target.value)}
//                     type="text"
//                     placeholder="username"
//                     className={inputStyle}
//                 />
//                 <input
//                     value={password}
//                     onChange={ev => setPassword(ev.target.value)}
//                     type="password"
//                     placeholder="password"
//                     className={inputStyle}
//                 />
//                 <button className={buttonStyle}>
//                     {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
//                 </button>
//                 <div className="text-center mt-2">
                   
//                     {isLoginOrRegister === 'register' && (
//                         <div>
//                             Already a member?
//                             <button onClick={() => setIsLoginOrRegister('login')}>
//                                 Login here
//                             </button> 
//                         </div>
//                     )}
//                     {isLoginOrRegister === 'login' && (
//                         <div>
//                         Dont have an account?
//                         <button onClick={() => setIsLoginOrRegister('register')}>
//                             Register here
//                         </button> 
//                     </div>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// }

// import { useContext, useState, useEffect } from "react";
// import axios from 'axios';
// import { UserContext } from "./UserContext.jsx";

// export default function Register() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
//     const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
//     const [showOverlay, setShowOverlay] = useState(true);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             setShowOverlay(false);
//         }, 1000); // Reduced the duration to 2 seconds

//         return () => clearTimeout(timeout);
//     }, []);

//     async function handleSubmit(ev) {
//         ev.preventDefault();
//         const url = isLoginOrRegister === 'register' ? 'register' : 'login';
//         const { data } = await axios.post(url, { username, password });
//         setLoggedInUsername(username);
//         setId(data.id);
//     }

//     const pageStyle = {
//         backgroundImage: `url('/register-bg.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         padding: '0 210px',
//         position: 'relative',
//     };

//     const overlayStyle = {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         backgroundColor: showOverlay ? 'black' : 'transparent',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         opacity: showOverlay ? 1 : 0,
//         transition: 'opacity 1s ease, background-color 1s ease',
//         zIndex: 1,
//     };

//     const overlayTextStyle = {
//         fontSize: showOverlay ? '6rem' : '3rem',
//         color: '#fff',
//         marginBottom: '10px',
//         animation: 'fadeIn 1.5s ease 1s forwards',
//     };

//     const formContainerStyle = {
//         backgroundColor: 'rgba(128, 0, 128, 0.1)',
//         borderRadius: '15px',
//         padding: '30px',
//         border: '2px solid #e7bo58',
//         width: '550px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         animation: 'fadeIn 1.5s ease',
//     };

//     const logoStyle = {
//         position: 'absolute',
//         top: '20px',
//         left: '20px',
//         width: '100px',
//         height: '50px',
//     };

//     const inputStyle = 'w-full p-4 mb-2 border rounded-sm';

//     const buttonStyle = 'bg-blue-500 text-white block w-full rounded-sm p-2 transition duration-300 ease-in-out transform hover:scale-105';

//     return (
//         <div style={pageStyle}>
//             <img
//                 src="/logo.png"
//                 alt="Logo"
//                 style={logoStyle}
//             />
//             {/* Overlay */}
//             <div style={overlayStyle}>
//                 <div style={overlayTextStyle}>
//                     <span style={{ marginRight: '10px' }}>Chat</span>
//                     <span style={{ fontSize: '4rem', fontWeight: 'bold' }}>App</span>
//                 </div>
//             </div>

//             <form style={formContainerStyle} onSubmit={handleSubmit}>
//                 <div className="mb-4 text-lg font-bold text-blue-500">USER LOGIN</div>
//                 <input
//                     value={username}
//                     onChange={ev => setUsername(ev.target.value)}
//                     type="text"
//                     placeholder="username"
//                     className={inputStyle}
//                 />
//                 <input
//                     value={password}
//                     onChange={ev => setPassword(ev.target.value)}
//                     type="password"
//                     placeholder="password"
//                     className={inputStyle}
//                 />
//                 <button className={buttonStyle}>
//                     {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
//                 </button>
//                 <div className="text-center mt-2">
//                     {isLoginOrRegister === 'register' && (
//                         <div>
//                             Already a member?
//                             <button onClick={() => setIsLoginOrRegister('login')}>
//                                 Login here
//                             </button>
//                         </div>
//                     )}
//                     {isLoginOrRegister === 'login' && (
//                         <div>
//                             Dont have an account?
//                             <button onClick={() => setIsLoginOrRegister('register')}>
//                                 Register here
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// }

// import { useContext, useState } from "react";
// import axios from 'axios';
// import { UserContext } from "./UserContext.jsx";

// export default function Register() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
//     const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

//     async function handleSubmit(ev) {
//         ev.preventDefault();
//         const url = isLoginOrRegister === 'register' ? 'register' : 'login';
//         const { data } = await axios.post(url, { username, password });
//         setLoggedInUsername(username);
//         setId(data.id);
//     }

//     const pageStyle = {
//         backgroundImage: `url('/bg.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center', // Center content horizontally
//         padding: '0 20px', // Adjusted padding
//     };

//     const formContainerStyle = {
//         backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker translucent background
//         borderRadius: '15px',
//         padding: '30px',
//         border: '2px solid #e7bo58',
//         width: '400px', // Adjusted width
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center', // Center form contents horizontally
//     };

//     const logoStyle = {
//         position: 'absolute',
//         top: '20px',
//         left: '20px',
//         width: '100px',
//         height: '50px',
//     };

//     const inputStyle = 'w-full p-4 mb-2 border rounded-sm text-black'; // Adjusted text color

//     const buttonStyle = 'bg-blue-500 text-white block w-full rounded-sm p-2';

//     return (
//         <div style={pageStyle}>
//             <img
//                 src="/logo.png"
//                 alt="Logo"
//                 style={logoStyle}
//             />
//             <form style={formContainerStyle} onSubmit={handleSubmit}>
//                 <div className="mb-4 text-lg font-bold text-blue-500">USER LOGIN</div>
//                 <input
//                     value={username}
//                     onChange={ev => setUsername(ev.target.value)}
//                     type="text"
//                     placeholder="username"
//                     className={inputStyle}
//                 />
//                 <input
//                     value={password}
//                     onChange={ev => setPassword(ev.target.value)}
//                     type="password"
//                     placeholder="password"
//                     className={inputStyle}
//                 />
//                 <button className={buttonStyle}>
//                     {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
//                 </button>
//                 <div className="text-center mt-2">
//                     {isLoginOrRegister === 'register' && (
//                         <div>
//                             Already a member?
//                             <button onClick={() => setIsLoginOrRegister('login')}>
//                                 Login here
//                             </button>
//                         </div>
//                     )}
//                     {isLoginOrRegister === 'login' && (
//                         <div>
//                             Dont have an account?
//                             <button onClick={() => setIsLoginOrRegister('register')}>
//                                 Register here
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// }

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

// import { useContext, useState, useEffect } from "react";
// import axios from 'axios';
// import { UserContext } from "./UserContext.jsx";

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
//     const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
//     const [showOverlay, setShowOverlay] = useState(true);
//     const [showChatApp, setShowChatApp] = useState(false);
//     const [chatAppFontSize, setChatAppFontSize] = useState('10rem');

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             setShowOverlay(false);
//             setShowChatApp(true);
//         }, 2000);

//         return () => clearTimeout(timeout);
//     }, []);

//     useEffect(() => {
//         setChatAppFontSize(showChatApp ? '20rem' : '10rem');
//     }, [showChatApp]);

//     async function handleSubmit(ev) {
//         ev.preventDefault();
//         const url = isLoginOrRegister === 'register' ? 'register' : 'login';
//         const { data } = await axios.post(url, { username, password });
//         setLoggedInUsername(username);
//         setId(data.id);
//     }

//     const pageStyle = {
//         backgroundImage: `url('/register-bg.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '0 20px',
//         position: 'relative',
//     };

//     const overlayStyle = {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'rgba(168, 87, 207, 0.7)',
//         zIndex: 2,
//         display: showOverlay ? 'flex' : 'none',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: 'white',
//         fontSize: '10rem',
//         opacity: showOverlay ? 1 : 0,
//         transition: 'opacity 1s',
//         cursor: 'pointer',
//     };

//     const chatAppStyle = {
//         fontSize: chatAppFontSize,
//         fontWeight: 'bold',
//         animation: showChatApp ? 'fade-in 1s ease-out move-up 1s ease-out' : 'none',
//         display: 'inline-block',
//     };

//     const formContainerStyle = {
//         backgroundColor: 'rgba(168, 87, 207, 0.7)',
//         borderRadius: '15px',
//         padding: '30px',
//         border: '2px solid #e7bo58',
//         width: '550px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         opacity: showOverlay ? 0 : 1,
//         transition: 'opacity 1s',
//     };

//     const logoStyle = {
//         position: 'absolute',
//         top: '20px',
//         left: '20px',
//         width: '100px',
//         height: '50px',
//     };

//     const inputStyle = 'w-full p-4 mb-2 border rounded-sm text-black focus:outline-none focus:border-purple-500';

//     const buttonStyle = 'bg-blue-500 text-white block w-full rounded-sm p-2 transition-all duration-300 hover:bg-blue-600 hover:text-yellow-300 hover:underline cursor-pointer';

//     const styles = `
//         @keyframes move-up {
//             from {
//                 transform: translateY(100px);
//             }
//             to {
//                 transform: translateY(0);
//             }
//         }

//         @keyframes fade-in {
//             from {
//                 opacity: 0;
//             }
//             to {
//                 opacity: 1;
//             }
//         }
//     `;

//     return (
//         <div style={pageStyle}>
//             <style>
//                 {styles}
//             </style>
//             <img
//                 src="/logo.png"
//                 alt="Logo"
//                 style={logoStyle}
//             />
//             <form style={formContainerStyle} onSubmit={handleSubmit}>
//                 <div className="mb-4 text-lg font-bold text-blue-500">USER LOGIN</div>
//                 <input
//                     value={username}
//                     onChange={ev => setUsername(ev.target.value)}
//                     type="text"
//                     placeholder="username"
//                     className={inputStyle}
//                 />
//                 <input
//                     value={password}
//                     onChange={ev => setPassword(ev.target.value)}
//                     type="password"
//                     placeholder="password"
//                     className={inputStyle}
//                 />
//                 <button className={buttonStyle}>
//                     {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
//                 </button>
//                 <div className="text-center mt-2">
//                     {isLoginOrRegister === 'register' && (
//                         <div>
//                             Already a member?
//                             <button onClick={() => setIsLoginOrRegister('login')}>
//                                 Login here
//                             </button>
//                         </div>
//                     )}
//                     {isLoginOrRegister === 'login' && (
//                         <div>
//                             Don't have an account?
//                             <button onClick={() => setIsLoginOrRegister('register')}>
//                                 Register here
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </form>
//             <div style={overlayStyle}>
//                 <div style={chatAppStyle}>CHAT APP</div>
//             </div>
//         </div>
//     );
// };

// export default Register;
