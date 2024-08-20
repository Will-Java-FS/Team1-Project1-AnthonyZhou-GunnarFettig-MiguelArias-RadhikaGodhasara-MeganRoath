import { useState } from 'react';
import { Link as ReactRouterLink, Navigate, useNavigate } from "react-router-dom";
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Input, Button, Heading } from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginFailed, setLoginFailed] = useState(false)

    const loginClicked = async (event) => {
        event.preventDefault();

        let config = {
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
            }
        }

        await axios.post("http://localhost:8080/authenticate", {
                username: username,
                passwordHash: password
        }, config)
        .then(response => {
            if (response.status == 200) {
                setLoginFailed(false);
                if (response.data.role === "Renter") {AuthenticationService.loginRenter(response.data.username, response.data.id);}
                else {AuthenticationService.loginOwner(response.data.username, response.data.id);}
                AuthenticationService.setUpToken(response.data.token);
                navigate('/redirect');
            } else {
                setLoginFailed(true);
            }
        })
        .catch(error => {
            console.error('Error on login attempt!', error);
        });
    }

    const userEmptyError = username === '';
    const passEmptyError = password === '';
    
    return (
        <form>
            <Heading size='md'>Login</Heading>
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type = "text" placeholder = "Enter Username" onChange={event => setUsername(event.currentTarget.value)} />
                {userEmptyError && loginFailed ? <FormErrorMessage>Username is required.</FormErrorMessage> : null}
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type = "password" placeholder = "Enter Password" onChange={event => setPassword(event.currentTarget.value)} />
                {passEmptyError && loginFailed ? <FormErrorMessage>Password is required.</FormErrorMessage> : null}
            </FormControl>
            <Button type = "submit" onClick = {loginClicked}>Login</Button>
            <ChakraLink as={ReactRouterLink} to="/register">Dont have an account? Sign up here.</ChakraLink>
            {loginFailed ? <FormErrorMessage>Login failed.</FormErrorMessage> : null}
        </form>
    )
}