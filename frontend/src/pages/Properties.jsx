import { useState, useEffect } from 'react';
import { Navigate, Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Input, Button, NumberInput, NumberInputField,
        NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Heading, Checkbox } from '@chakra-ui/react'
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
    const [available, setAvailable] = useState(false);

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:8080/properties");
                if (response.status === 200) {
                    setProperties(response.data.results.filter((value) => value.owner.username === AuthenticationService.loggedInUsername()));
                }
            } catch (error) {
                console.error('Error when attempting to retrieve properties!', error);
            }
        };

        fetchProperties();
    }, []);

    const newPropertyClicked = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/properties", {
                ownerID: parseInt(AuthenticationService.loggedInUserId(), 10),
                address: address,
                city: city,
                state: state,
                zipcode: zipcode,
                description: description,
                price: parseFloat(price),
                bedrooms: parseInt(bedrooms, 10),
                bathrooms: parseInt(bathrooms, 10),
                numOfGuests: parseInt(maxGuests, 10),
                pets: pets,
                available: available
            });
            if (response.status === 201) {
                setProperties([...properties, response.data]);
            }
        } catch (error) {
            console.error('Error on property addition attempt!', error);
        }

    };

    const deleteClicked = async (propertyId, event) => {
        event.preventDefault();
        await axios.delete("http://localhost:8080/properties/" + propertyId)
        .then(response => {
            console.log(response.data);
            if (response.status == 200) {
                setProperties(properties.filter((value) => value.id != propertyId));
            }
        })
        .catch(error => {
            console.error('Error on property deletion attempt!', error);
        });
    }

    if (AuthenticationService.isLoggedInOwner()) {
        return (
            <>
                <form>
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
                        <Input type="text" placeholder="Enter Zip Code" onChange={event => setZipcode(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Input type="text" placeholder="Enter Description" onChange={event => setDescription(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input type="text" placeholder="Enter Price" onChange={event => setPrice(event.currentTarget.value)} />
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

                    <FormControl isRequired>
                        <FormLabel>Pets</FormLabel>
                        <Checkbox isChecked={pets} onChange={(event) => setPets(event.target.checked)}>Allow Pets</Checkbox>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Available</FormLabel>
                        <Checkbox isChecked={available} onChange={(event) => setAvailable(event.target.checked)}>Is it available?</Checkbox>
                    </FormControl>


                    <Button type="submit" onClick={newPropertyClicked}>Add Property</Button>
                </form>
                <Heading size='md'>Your Properties</Heading>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
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
                                <Tr key={property.id}>
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
                                    <Td>{property.pets ? 'Yes' : 'No'}</Td>
                                    <Td>
                                        <ChakraLink as={ReactRouterLink} to={`/property/${property.id}`}>
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
            </>
        );
    } else {
        return <Navigate to='/login' />
    }
}