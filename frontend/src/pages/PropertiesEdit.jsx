import { useState, useEffect } from 'react';
import  { Navigate, Link as ReactRouterLink, useParams } from 'react-router-dom'
import { Link as ChakraLink, FormControl, FormLabel, FormErrorMessage, Button, NumberInput, NumberInputField, Heading, Checkbox,
        NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Input } from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function PropertiesEdit() {
    const { id } = useParams();

    const [description, setDescription] = useState('');
    const [maxGuests, setMaxGuests] = useState(5);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState();
    const [price, setPrice] = useState();
    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(2);
    const [pets, setPets] = useState(false);

    const [property, setProperty] = useState('');

    useEffect(() => {
        AuthenticationService.axiosToken();
        axios.get("http://localhost:8080/properties/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status == 200) {
                if (response.data.user.id == AuthenticationService.loggedInUserId()) {
                    setProperty(response.data);

                    setAddress(response.data.address);
                    setBathrooms(response.data.bathrooms);
                    setBedrooms(response.data.bedrooms);
                    setCity(response.data.city);
                    setDescription(response.data.description);
                    setMaxGuests(response.data.guests);
                    setPets(response.data.pets);
                    setPrice(response.data.price);
                    setState(response.data.state);
                    setZipcode(response.data.zipcode);
                }
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve property id: ' + id, error);
        });
    }, []);

    if (AuthenticationService.loggedInUserRole() == "owner") {
        const updatePropertyClicked = async (event) => {
            event.preventDefault();
            await axios.put("http://localhost:8080/owner/" + AuthenticationService.loggedInUserId() + "/property/" + id, {
                userID: Number(AuthenticationService.loggedInUserId()),
                address: address,
                city: city,
                state: state,
                zipcode: Number(zipcode),
                description: description,
                price: Number(price),
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                guests: maxGuests,
                pets: pets
            })
            .then(response => {
                console.log(response.data);
                if (response.status == 200) {
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
            <form key = {property.id} onSubmit={updatePropertyClicked}>
                <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input type="text" value={address} onChange={event => setAddress(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input type="text" value={city} onChange={event => setCity(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>State</FormLabel>
                    <Input type="text" value={state} onChange={event => setState(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Zip Code</FormLabel>
                    <Input type="number" value={zipcode} onChange={event => setZipcode(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input type="text" value={description} onChange={event => setDescription(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input type="number" value={price} onChange={event => setPrice(event.currentTarget.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Bedrooms</FormLabel>
                    <NumberInput onChange={(value) => setBedrooms(value)} defaultValue={bedrooms} min={1}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Bathrooms</FormLabel>
                    <NumberInput onChange={(value) => setBathrooms(value)} defaultValue={bathrooms} min={1}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Max Guests</FormLabel>
                    <NumberInput onChange={(value) => setMaxGuests(value)} defaultValue={maxGuests} min={1}>
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
                <Button type = "submit">Update Property</Button>
            </form>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}