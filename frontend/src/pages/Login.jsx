import { useState } from 'react';
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Input, Button } from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginClicked = async (event) => {
        event.preventDefault();
        await axios.post("https://localhost:8080/authenticate", {
                username: username,
                password: password
        })
        .then(response => {
            if (response.ok) {
                if (response.data.role === "Renter") {AuthenticationService.loginRenter(response.data.username);}
                else {AuthenticationService.loginOwner(response.data.username);}
                AuthenticationService.setUpToken(response.data.token);
                return <Navigate to = '/redirect' />
            }
        })
        .catch(error => {
            console.error('Error on login attempt!', error);
        });
    }

    // TODO: If submit fails show message and/or change colors, etc
    return (
        <form>
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type = "text" placeholder = "Enter Username" onChange={event => setUsername(event.currentTarget.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type = "password" placeholder = "Enter Password" onChange={event => setPassword(event.currentTarget.value)} />
            </FormControl>
                <Button type = "submit" onClick = {loginClicked}>Login</Button>
                <ChakraLink as={ReactRouterLink} to="/register">Dont have an account? Sign up here.</ChakraLink>
        </form>
    )
}