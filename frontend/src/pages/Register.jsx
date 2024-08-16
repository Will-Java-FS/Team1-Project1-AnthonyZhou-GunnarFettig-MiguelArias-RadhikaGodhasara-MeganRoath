import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Input, Button, Radio, RadioGroup, HStack } from '@chakra-ui/react'
import axios from "axios";

export default function Register() {
    const registerClicked = async (event) => {
        event.preventDefault();
        var selectedRole = "Renter";
        if (document.getElementById("owner").checked) {selectedRole = "Owner";}

        await axios.post("https://localhost:8080/register", {
            username: document.getElementById("usernameRegister").value,
            password: document.getElementById("passwordRegister").value,
            role: selectedRole
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
                <RadioGroup defaultValue = "Renter">
                    <HStack spacing = '20px'>
                        <Radio value = 'Renter' id = "renter">Rent a property</Radio>
                        <Radio value = 'Owner' id = "owner">Rent a property</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type = "text" placeholder = "Enter Username" id = "usernameRegister" />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type = "password" placeholder = "Enter Password" id = "passwordRegister" /> 
            </FormControl>
            <Button type = "submit" onClick = {registerClicked}>Register</Button>
            <ChakraLink as = {ReactRouterLink} to = "/login">Already have an account? Login here.</ChakraLink>
        </form>
    )
}