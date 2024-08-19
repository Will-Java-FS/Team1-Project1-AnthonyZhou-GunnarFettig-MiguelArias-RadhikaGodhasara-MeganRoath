import { useState, useEffect } from 'react';
import  { Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Button, NumberInput, NumberInputField, Heading,
        NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Editable, EditablePreview, EditableTextarea} from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function PropertiesEdit() {
    const [description, setDescription] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [address, setAddress] = useState('');

    const [property, setProperty] = useState();
    useEffect(async () => {
        await axios.get("https://localhost:8080/properties/" + window.location.pathname)
        .then(response => {
            console.log(response.data);
            if (response.ok) {
                if (response.data.results.username === AuthenticationService.loggedInUsername()) {setProperty(response.data);}
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve property id: ' + window.location.pathname, error);
        });
    }, [property]);

    if (AuthenticationService.isLoggedInOwner()) {
        const updatePropertyClicked = async (event) => {
            event.preventDefault();
            await axios.patch("https://localhost:8080/properties/" + window.location.pathname, {
                description: description,
                maxGuests: maxGuests,
                address: address
            })
            .then(response => {
                console.log(response.data);
                if (response.ok) {
                    setProperty(response.data)
                }
            })
            .catch(error => {
                console.error('Error updating property!', error);
            });
        }

        // TODO: If submit fails show message and/or change colors, etc
        return (
            <>
            <Heading size='md'>Edit your property</Heading>
            <ChakraLink as = {ReactRouterLink} to="/properties"><Button>Back</Button></ChakraLink>
            <form>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Editable defaultValue = {property.description} onChange={event => setDescription(event.currentTarget.value)}>
                        <EditablePreview />
                        <EditableTextarea />
                    </Editable>
                </FormControl>
                <FormControl isRequired>
                <FormLabel>Max Guests</FormLabel>
                    <NumberInput onChange={event => setMaxGuests(event.currentTarget.value)} defaultValue = {property.maxGuests} min = {1}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Editable defaultValue = {property.address} onChange={event => setAddress(event.currentTarget.value)}>
                        <EditablePreview />
                        <EditableTextarea />
                    </Editable>
                </FormControl>
                <Button type = "submit" onClick = {updatePropertyClicked}>Update Property</Button>
            </form>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}