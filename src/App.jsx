import { Route,Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Home.jsx'
import RegisterAndLoginForm from "./Register.jsx";
import PrivateRoutes from "./PrivateRoutes";
import { UserContextProvider } from "./UserContext";
import Chat from './Chat.jsx';


function App() {
  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={<RegisterAndLoginForm />}/>

        <Route element={<PrivateRoutes/>}>
          <Route path="/Chat" element={<Chat/>}/>
        </Route>

      </Routes>
      
    </UserContextProvider>
  )
}

export default App

// import { Route, Routes } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import Home from './Home.jsx'
// import RegisterAndLoginForm from "./Register.jsx";
// import PrivateRoutes from "./PrivateRoutes";
// import { UserContextProvider } from "./UserContext";
// import Chat from './Chat.jsx';


// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get('/profile');
//         setUser(res.data);
//       } catch (err) {
//         // User is not logged in
//         console.log('User is not logged in');
//       }
//     };

//     fetchUserData();
//   }, []);

//   axios.defaults.baseURL = 'http://localhost:3000';
//   axios.defaults.withCredentials = true;

//   return (
//     <UserContextProvider>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/Register' element={<RegisterAndLoginForm />} />

//         <Route element={<PrivateRoutes user={user} />} >
//           <Route path="/Chat" element={<Chat />} />
//         </Route>
//       </Routes>

//     </UserContextProvider>
//   )
// }

// export default App


// App.js

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import axios from 'axios';
// import PrivateRoute from './PrivateRoute';
// // import Chat from './Chat';
// // import Register from './Register';
// // import Login from './Login';

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check for session token on page load
//     const sessionToken = localStorage.getItem('sessionToken');
//     if (sessionToken) {
//       // If session token is present, set the user as logged in
//       setLoggedIn(true);
//     }
//   }, []);

//   const handleLogin = async (username, password) => {
//     try {
//       // Make a request to the server to log in the user
//       const response = await axios.post('http://localhost:3000/login', { username, password });
//       // Save the session token in local storage
//       localStorage.setItem('sessionToken', response.data.token);
//       // Set the user as logged in
//       setLoggedIn(true);
//     } catch (error) {
//       // Handle login error
//       console.error('Login failed:', error);
//     }
//   };

  

//   return (
//     <Router>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <PrivateRoute
//           path="/chat"
//           element={<Chat />}
//           loggedIn={loggedIn}
          
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
