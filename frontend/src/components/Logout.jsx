import { Navigate } from "react-router-dom";
import { Button } from '@chakra-ui/react'
import AuthenticationService from "./AuthenticationService";

export default function Logout() {
    if (AuthenticationService.isLoggedIn()) {
        const logoutClicked = async (event) => {
            event.preventDefault();
            AuthenticationService.logout();
            return <Navigate to = '/login' />
        }
        return <Button onClick = {logoutClicked}>Logout</Button>
    } else {
        return <></>
    }
}