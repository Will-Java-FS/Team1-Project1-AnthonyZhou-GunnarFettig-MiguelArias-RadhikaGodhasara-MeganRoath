import { useState, useEffect } from 'react';
import  { Navigate, Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Input, Button, NumberInput, NumberInputField,
        NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Properties() {
    const [description, setDescription] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [address, setAddress] = useState('');

    const [properties, setProperties] = useState([]);
    useEffect(async () => {
        await axios.get("https://localhost:8080/properties")
        .then(response => {
            console.log(response.data);
            if (response.ok) {
                setProperties(response.data.results.filter((value) => value.owner.username === AuthenticationService.loggedInUsername()));
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve properties!', error);
        });
    }, [properties]);

    if (AuthenticationService.isLoggedInOwner()) {
        const newPropertyClicked = async (event) => {
            event.preventDefault();
            await axios.post("https://localhost:8080/properties", {
                ownerId: AuthenticationService.loggedInUserId(),
                description: description,
                maxGuests: maxGuests,
                address: address 
            })
            .then(response => {
                console.log(response.data);
                if (response.ok) {
                    setProperties([...properties, response.data]);
                }
            })
            .catch(error => {
                console.error('Error on property deletion attempt!', error);
            });
        }
        
        const deleteClicked = async (propertyId, event) => {
            event.preventDefault();
            await axios.delete("https://localhost:8080/properties/" + propertyId)
            .then(response => {
                console.log(response.data);
                if (response.ok) {
                    setProperties(properties.filter((value) => value.id != propertyId));
                }
            })
            .catch(error => {
                console.error('Error on property deletion attempt!', error);
            });
        }

        // TODO: If submit fails show message and/or change colors, etc
        return (
            <>
            <form>
                <Heading size='md'>Add a new property</Heading>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input type = "text" placeholder = "Enter Description" onChange={event => setDescription(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Max Guests</FormLabel>
                    <NumberInput onChange={event => setMaxGuests(event.currentTarget.value)} defaultValue = {15} min = {1}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input type = "text" placeholder = "Enter Address" onChange={event => setAddress(event.currentTarget.value)} />
                </FormControl>
                <Button type = "submit" onClick = {newPropertyClicked}>Add Property</Button>
            </form>
            <Heading size='md'>Your Properties</Heading>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Description</Th>
                            <Th>Max Guests</Th>
                            <Th>Address</Th>
                            <Th>Edit</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {properties && properties.map && properties.map(property =>
                            <>
                            <Tr key = {property.id}>
                                <Td>{property.description}</Td>
                                <Td>{property.maxGuests}</Td>
                                <Td>{property.location}</Td>
                                <Td><ChakraLink as = {ReactRouterLink} to={"/property/" + property.id}><Button variant = "link">Edit</Button></ChakraLink></Td>
                                <Td><Button type = "submit" onClick = {deleteClicked(property.id)}>Delete</Button></Td>
                            </Tr>
                            </>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}