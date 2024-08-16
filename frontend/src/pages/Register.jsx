import { useState } from 'react';
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Input, Button, Radio, RadioGroup, HStack } from '@chakra-ui/react'
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [role, setRole] = useState('Renter')

    const registerClicked = async (event) => {
        event.preventDefault();
        await axios.post("https://localhost:8080/register", {
            username: username,
            passwordHash: password,
            email: email,
            firstName: first,
            lastName: last,
            role: role
        })
        .then(response => {
            console.log(response.data);
            if (response.ok) {
                return <Navigate to = '/login' />
            }
        })
        .catch(error => {
            console.error('Error on register attempt!', error);
        });
    }

    // TODO: If submit fails show message and/or change colors, etc
    // TODO: add password restrictions
    return (
        <form>
            <FormControl isRequired>
                <FormLabel>I am looking to:</FormLabel>
                <RadioGroup defaultValue = "Renter" onChange={setRole} value={role}>
                    <HStack spacing = '20px'>
                        <Radio value = 'Renter' id = "renter">Rent a property</Radio>
                        <Radio value = 'Owner' id = "owner">Rent a property</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type = "text" placeholder = "Enter Username" onChange={event => setUsername(event.currentTarget.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type = "password" placeholder = "Enter Password" onChange={event => setPassword(event.currentTarget.value)} /> 
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type = "email" placeholder = "Enter Email" onChange={event => setEmail(event.currentTarget.value)} /> 
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
            <ChakraLink as = {ReactRouterLink} to = "/login">Already have an account? Login here.</ChakraLink>
        </form>
    )
}