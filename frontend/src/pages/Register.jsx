import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Input, Button, Radio, RadioGroup, HStack, Heading, Flex, Box } from '@chakra-ui/react'
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [role, setRole] = useState('renter')
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
            if (response.status == 201) {
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
        <Flex width="full" align="center" justifyContent="center">
            <form onSubmit={registerClicked}>
                <Box p='5' textAlign='center'>
                    <Heading size='lg'>Register a new account</Heading>
                </Box>
                <FormControl isRequired>
                    <HStack spacing = '10px'>
                        <FormLabel>I am looking to:</FormLabel>
                        <RadioGroup defaultValue = "renter" onChange={setRole} value={role}>
                            <HStack spacing = '20px'>
                                <Radio value = 'renter' id = "renter">Rent a property</Radio>
                                <Radio value = 'owner' id = "owner">Post my propety for rental</Radio>
                            </HStack>
                        </RadioGroup>
                    </HStack>
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
                <br/>
                <Button type = "submit">Register</Button>
                {registerFailed ? <FormErrorMessage>Registration failed.</FormErrorMessage> : null}
                <ChakraLink as = {ReactRouterLink} to = "/login"> Already have an account? Login here.</ChakraLink>
            </form>
        </Flex>
    )
}