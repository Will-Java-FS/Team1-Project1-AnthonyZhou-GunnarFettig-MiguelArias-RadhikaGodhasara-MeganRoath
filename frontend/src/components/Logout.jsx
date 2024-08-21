import { Navigate } from "react-router-dom";
import { Button, Heading, HStack } from '@chakra-ui/react'
import AuthenticationService from "./AuthenticationService";

export default function Logout() {
    if (AuthenticationService.isLoggedIn() | true) {
        const logoutClicked = async (event) => {
            event.preventDefault();
            AuthenticationService.logout();
            return <Navigate to = '/login' />
        }
        
        return (
            <>
            <HStack spacing = '10px' align = 'right'>
                <p>{AuthenticationService.isLoggedIn()}</p>
                <p>{AuthenticationService.isLoggedInOwner()}</p>
                <p>{AuthenticationService.isLoggedInRenter()}</p>
                <Heading>Logged in as {AuthenticationService.loggedInUsername()}</Heading>
                <Button onClick = {logoutClicked}>Logout</Button>
            </HStack>
            </>
        )
    } else {
        return <></>
    }
}