import { useState, useEffect } from 'react';
import { Navigate, Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Input, Button, NumberInput, NumberInputField, Flex,
        NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Heading, Checkbox } from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Properties() {
    const [description, setDescription] = useState('');
    const [maxGuests, setMaxGuests] = useState(15);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState();
    const [price, setPrice] = useState();
    const [bedrooms, setBedrooms] = useState(5);
    const [bathrooms, setBathrooms] = useState(5);
    const [pets, setPets] = useState(false);

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            AuthenticationService.axiosToken();
            await axios.get("http://localhost:8080/owner/" + AuthenticationService.loggedInUserId())
            .then(response => {
                if (response.status === 200) {
                    setProperties(response.data);
                }
            })
            .catch(error => {
                console.error('Error retriving properties!', error);
            });
        };

        fetchProperties();
    }, [properties]);

    const newPropertyClicked = async (event) => {
        event.preventDefault();
        await axios.post("http://localhost:8080/owner/" + AuthenticationService.loggedInUserId(), {
            userID: Number(AuthenticationService.loggedInUserId()),
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            description: description,
            price: price,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            guests: maxGuests,
            pets: pets
        })
        .then(response => {
            if (response.status === 201) {
                setProperties([...properties, response.data]);
            }
        })
        .catch(error => {
            console.error('Error adding a new property!', error);
        });
    };

    const deleteClicked = async (propertyId, event) => {
        event.preventDefault();
        await axios.delete("http://localhost:8080/owner/" + AuthenticationService.loggedInUserId() + "/property/" + propertyId)
        .then(response => {
            console.log(response.data);
            if (response.status == 204) {
                setProperties(properties.filter((value) => value.id != propertyId));
            }
        })
        .catch(error => {
            console.error('Error on property deletion attempt!', error);
        });
    }

    if (AuthenticationService.loggedInUserRole() == "owner") {
        return (
            <Flex p="3">
                <form onSubmit={newPropertyClicked}>
                    <Heading size='md'>Add a new property</Heading>

                    <FormControl isRequired>
                        <FormLabel>Address</FormLabel>
                        <Input type="text" placeholder="Enter Address" onChange={event => setAddress(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>City</FormLabel>
                        <Input type="text" placeholder="Enter City" onChange={event => setCity(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>State</FormLabel>
                        <Input type="text" placeholder="Enter State" onChange={event => setState(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Zip Code</FormLabel>
                        <Input type="number" placeholder="Enter Zip Code" onChange={event => setZipcode(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Input type="text" placeholder="Enter Description" onChange={event => setDescription(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input type="number" placeholder="Enter Price" onChange={event => setPrice(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Bedrooms</FormLabel>
                        <NumberInput onChange={(value) => setBedrooms(value)} defaultValue={5} min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Bathrooms</FormLabel>
                        <NumberInput onChange={(value) => setBathrooms(value)} defaultValue={5} min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Max Guests</FormLabel>
                        <NumberInput onChange={(value) => setMaxGuests(value)} defaultValue={15} min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Pets</FormLabel>
                        <Checkbox isChecked={pets} onChange={(event) => setPets(event.target.checked)}>Allow Pets</Checkbox>
                    </FormControl>

                    <Button type="submit">Add Property</Button>
                </form>
                <Heading size='md'>Your Properties</Heading>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Description</Th>
                                <Th>Address</Th>
                                <Th>City</Th>
                                <Th>State</Th>
                                <Th>Zipcode</Th>
                                <Th>Price</Th>
                                <Th>Bedrooms</Th>
                                <Th>Bathrooms</Th>
                                <Th>Max Guests</Th>
                                <Th>Pets</Th>
                                <Th>Edit</Th>
                                <Th>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {properties && properties.map && properties.map(property =>
                                <Tr key={property.id}>
                                    <Td>{property.description}</Td>
                                    <Td>{property.address}</Td>
                                    <Td>{property.city}</Td>
                                    <Td>{property.state}</Td>
                                    <Td>{property.zipcode}</Td>
                                    <Td>{property.price}</Td>
                                    <Td>{property.bedrooms}</Td>
                                    <Td>{property.bathrooms}</Td>
                                    <Td>{property.guests}</Td>
                                    <Td>{property.pets ? 'Yes' : 'No'}</Td>
                                    <Td>
                                        <ChakraLink as={ReactRouterLink} to={`/properties/${property.id}`}>
                                            <Button variant="link">Edit</Button>
                                        </ChakraLink>
                                    </Td>
                                    <Td>
                                        <Button type="button" onClick={(event) => deleteClicked(property.id, event)}>
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        );
    } else {
        return <Navigate to='/login' />
    }
}