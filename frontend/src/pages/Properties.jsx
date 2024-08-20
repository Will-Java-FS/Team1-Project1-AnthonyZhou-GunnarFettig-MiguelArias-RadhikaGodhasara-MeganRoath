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
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [pets, setPets] = useState(false);


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
                address: address,
                city: city,
                state: state,
                zipcode: zipcode,
                price: parseFloat(price),
                bedrooms: parseInt(bedrooms, 10),
                bathrooms: parseInt(bathrooms, 10),
                numOfGuests: parseInt(maxGuests, 10),
                pets: pets
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

                {/* Probably can look better/simplified but just looking for initial functionality.  */}
                <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input type = "text" placeholder = "Enter Address" onChange={event => setAddress(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input type = "text" placeholder = "Enter City" onChange={event => setCity(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>State</FormLabel>
                    <Input type = "text" placeholder = "Enter State" onChange={event => setState(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Zip Code</FormLabel>
                    <Input type = "text" placeholder = "Enter Zip Code" onChange={event => setZipcode(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input type = "text" placeholder = "Enter Description" onChange={event => setDescription(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input type = "text" placeholder = "Enter Price" onChange={event => setPrice(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Bedrooms</FormLabel>
                    <NumberInput onChange={event => setBedrooms(event.currentTarget.value)} defaultValue = {5} min = {1}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Bathrooms</FormLabel>
                    <NumberInput onChange={event => setBathrooms(event.currentTarget.value)} defaultValue = {5} min = {1}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
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
                    <FormLabel>Pets</FormLabel>
                    <Input type = "text" placeholder = "Need to change this to be a checkbox. " onChange={event => setAddress(event.currentTarget.value)} />
                </FormControl>

                <Button type = "submit" onClick = {newPropertyClicked}>Add Property</Button>
            </form>
            <Heading size='md'>Your Properties</Heading>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            {/* <Th>Description</Th>
                            <Th>Max Guests</Th>
                            <Th>Address</Th>
                            <Th>Edit</Th>
                            <Th>Delete</Th> */}
                            <Th>Description</Th>
                            <Th>Max Guests</Th>
                            <Th>Address</Th>
                            <Th>City</Th>
                            <Th>State</Th>
                            <Th>Zipcode</Th>
                            <Th>Price</Th>
                            <Th>Bedrooms</Th>
                            <Th>Bathrooms</Th>
                            <Th>Number of Guests</Th>
                            <Th>Pets</Th>
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
                                <Td>{property.address}</Td>
                                <Td>{property.city}</Td>
                                <Td>{property.state}</Td>
                                <Td>{property.zipcode}</Td>
                                <Td>{property.price}</Td>
                                <Td>{property.bedrooms}</Td>
                                <Td>{property.bathrooms}</Td>
                                <Td>{property.num_of_guests}</Td>
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