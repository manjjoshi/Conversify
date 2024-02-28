import RegisterAndLoginForm from "./Register.jsx";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import { Outlet,Navigate } from "react-router-dom";
import Chat from "./Chat.jsx";

export default function PrivateRoutes() {
    const {username, id} = useContext(UserContext);

   /* if (username) {
        return <Chat />;
    }

    return (
        <RegisterAndLoginForm />
    );*/

    return(
        username ? <Chat/> : <Navigate to='/Register'/>
    )
}