import { useState, useEffect } from 'react';
import  { Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Button, Input, NumberInput, NumberInputField,
        NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Rent() {
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [numGuests, setNumGuests] = useState();

    const [rental, setRental] = useState();
    useEffect(async () => {
        await axios.get("https://localhost:8000/properties/" + window.location.pathname)
        .then(response => {
            console.log(response.data);
            if (response.ok) {
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
            await axios.patch("https://localhost:8080/bookings/" + window.location.pathname, {
                username: AuthenticationService.loggedInUsername(),
                startDate: start,
                endDate: end,
                numGuests: numGuests
            })
            .then(response => {
                console.log(response.data);
                if (response.ok) {
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
            <h1>Rent this property</h1>
            <ChakraLink as={ReactRouterLink} to="/rent"><Button>Back</Button></ChakraLink>
            <br/>
            <b>Title: </b><p>{rental.title}</p>
            <br/>
            <b>Description: </b><p>{rental.description}</p>
            <br/>
            <b>Max Guests: </b><p>{rental.maxGuests}</p>
            <br/>
            <b>Address: </b><p>{rental.location}</p>
            <br/>
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