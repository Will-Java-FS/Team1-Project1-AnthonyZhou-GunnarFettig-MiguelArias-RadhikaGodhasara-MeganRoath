import { useState, useEffect } from 'react';
import  { Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Button, Input, NumberInput, NumberInputField,
        NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Heading} from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Rent() {
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [numGuests, setNumGuests] = useState();

    const [rental, setRental] = useState();
    useEffect(() => {
        axios.get("http://localhost:8000/properties/" + window.location.pathname)
        .then(response => {
            console.log(response.data);
            if (response.status == 200) {
                setRental(response.data)
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve property id: ' + window.location.pathname, error);
        });
    }, [rental]);

    if (AuthenticationService.isLoggedInRenter()) {
        const rentClicked = async (event) => {
            event.preventDefault();
            await axios.patch("http://localhost:8080/bookings/" + window.location.pathname, {
                renterId: AuthenticationService.loggedInUserId(),
                startDate: start,
                endDate: end,
                numGuests: numGuests
            })
            .then(response => {
                console.log(response.data);
                if (response.status == 200) {
                    setRental(response.data)
                }
            })
            .catch(error => {
                console.error('Error updating property!', error);
            });
        }

        // TODO: Display bookings for location and dont allow new overlapping booking
        // TODO: If submit fails show message and/or change colors, etc
        return (
            <>
            <Heading size='md'>Rent this property</Heading>
            <ChakraLink as={ReactRouterLink} to="/rent"><Button>Back</Button></ChakraLink>
            <Heading size='sm'>Title: {rental.title}</Heading>
            <Heading size='sm'>Description: {rental.description}</Heading>
            <Heading size='sm'>Max Guests: {rental.maxGuests}</Heading>
            <Heading size='sm'>Address: {rental.location}</Heading>
            <form>
                <FormControl isRequired>
                    <FormLabel>Start Date</FormLabel>
                    <Input type = "date" placeholder = "Enter Start Date" onChange={event => setStart(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>End Date</FormLabel>
                    <Input type = "date" placeholder = "Enter End Date" onChange={event => setEnd(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Number Of Guests</FormLabel>
                    <NumberInput onChange={event => setNumGuests(event.currentTarget.value)} max = {rental.maxGuests} min = {1}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <Button type = "submit" onClick = {rentClicked}>Rent</Button>
            </form>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}