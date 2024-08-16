import { Navigate } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

export default function Logout() {
    if (AuthenticationService.isLoggedIn()) {
        const logoutClicked = async (event) => {
            event.preventDefault();
            AuthenticationService.logout();
            return <Navigate to = '/login' />
        }
        return <button type = "submit" onClick = {logoutClicked}>Logout</button>
    } else {
        return <></>
    }
}