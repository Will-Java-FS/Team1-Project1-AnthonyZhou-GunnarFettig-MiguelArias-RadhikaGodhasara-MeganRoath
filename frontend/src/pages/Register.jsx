import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Input, Button, Radio, RadioGroup, HStack, Heading } from '@chakra-ui/react'
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [role, setRole] = useState('Renter')
    const [registerFailed, setRegisterFailed] = useState(false)

    const registerClicked = async (event) => {
        event.preventDefault();
        
        await axios.post("http://localhost:8080/register", {
            username: username,
            email: email,
            passwordHash: password,
            firstName: first,
            lastName: last,
            role: role
        })
        .then(response => {
            console.log(response.data);
            if (response.status == 200) {
                setRegisterFailed(false);
                navigate('/login');
            } else {
                setRegisterFailed(true);
            }
        })
        .catch(error => {
            console.error('Error on register attempt!', error);
        });
    }

    const userEmptyError = username === '';
    const passEmptyError = password === '';
    const emailEmptyError = email === '';

    return (
        <form>
            <Heading size='md'>Register a new account</Heading>
            <FormControl isRequired>
                <FormLabel>I am looking to:</FormLabel>
                <RadioGroup defaultValue = "Renter" onChange={setRole} value={role}>
                    <HStack spacing = '20px'>
                        <Radio value = 'Renter' id = "renter">Rent a property</Radio>
                        <Radio value = 'Owner' id = "owner">Post my propety for rental</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type = "text" placeholder = "Enter Username" onChange={event => setUsername(event.currentTarget.value)} />
                {userEmptyError && registerFailed ? <FormErrorMessage>Username is required.</FormErrorMessage> : null}
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type = "password" placeholder = "Enter Password" onChange={event => setPassword(event.currentTarget.value)} />
                {passEmptyError && registerFailed ? <FormErrorMessage>Password is required.</FormErrorMessage> : null}
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type = "email" placeholder = "Enter Email" onChange={event => setEmail(event.currentTarget.value)} /> 
                {emailEmptyError && registerFailed ? <FormErrorMessage>Email is required.</FormErrorMessage> : null}
            </FormControl>
            <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input type = "text" placeholder = "Enter First Name" onChange={event => setFirst(event.currentTarget.value)} /> 
            </FormControl>
            <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input type = "text" placeholder = "Enter Last Name" onChange={event => setLast(event.currentTarget.value)} /> 
            </FormControl>
            <Button type = "submit" onClick = {registerClicked}>Register</Button>
            {registerFailed ? <FormErrorMessage>Registration failed.</FormErrorMessage> : null}
            <ChakraLink as = {ReactRouterLink} to = "/login">Already have an account? Login here.</ChakraLink>
        </form>
    )
}