import { useState, useEffect } from 'react';
import  { Navigate, Link as ReactRouterLink, useParams, useNavigate } from 'react-router-dom'
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Button, Input, NumberInput, NumberInputField,
        NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Heading} from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Rent() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [numGuests, setNumGuests] = useState(1);

    const [rental, setRental] = useState('');
    useEffect(() => {
        AuthenticationService.axiosToken();
        axios.get("http://localhost:8080/properties/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status == 200) {
                setRental(response.data);
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve property id: ' + id, error);
        });
    }, []);

    if (AuthenticationService.loggedInUserRole() == "renter") {
        const rentClicked = async (event) => {
            event.preventDefault();
            AuthenticationService.axiosToken();
            await axios.post("http://localhost:8080/bookings", {
                propertyId: Number(id),
                guestId: Number(AuthenticationService.loggedInUserId()),
                startDate: start,
                endDate: end,
                numGuests: numGuests,
                status: 'confirmed'
            })
            .then(response => {
                console.log(response.data);
                if (response.status == 200) {
                    setRental(response.data);
                    navigate("/bookings");
                }
            })
            .catch(error => {
                console.error('Error renting property!', error);
            });
        }

        // TODO: Display bookings for location and dont allow new overlapping booking
        // TODO: If submit fails show message and/or change colors, etc
        return (
            <>
            <Heading size='lg'>Rent this property</Heading>
            <ChakraLink as={ReactRouterLink} to="/rent"><Button>Back</Button></ChakraLink>
            <Heading size='md'>Description: {rental.description}</Heading>
            <Heading size='md'>Bedrooms: {rental.bedrooms}</Heading>
            <Heading size='md'>Bathrooms: {rental.bathrooms}</Heading>
            <Heading size='md'>Address: {rental.address +", "+ rental.city +", "+ rental.state +" "+ rental.zipcode}</Heading>
            <Heading size='md'>Pets allowed: {rental.pets ? 'Yes' : 'No'}</Heading>
            <form  onSubmit={rentClicked}>
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
                    <NumberInput onSubmit={event => setNumGuests(event.target.value)} max = {rental.guests} min = {1}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <br/>
                <Button type = "submit">Rent</Button>
            </form>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}