import { useState, useEffect } from 'react';
import axios from "axios";
import  { Navigate, Link } from 'react-router-dom'
import AuthenticationService from "../components/AuthenticationService";

export default function Properties() {
    const [properties, setProperties] = useState();
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
                ownerUsername: AuthenticationService.loggedInUsername(),
                title: document.getElementById("titleNew").value,
                description: document.getElementById("descriptionNew").value,
                maxGuests: document.getElementById("maxGuestsNew").value,
                location: document.getElementById("addressNew").value 
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
            <h1>Your Properties</h1>
            <br/>
            <form id = "newProperty">
                <h>Add a new property</h>
                <br/>
                <label for = "title"><b>Title</b></label>
                <br/>
                <input type = "text" placeholder = "Enter Title" id = "titleNew" name = "title" required />
                <br/>
                <label for = "description"><b>Description</b></label>
                <br/>
                <input type = "text" placeholder = "Enter Description" id = "descriptionNew" name = "description" required />
                <br/>
                <label for = "maxGuests"><b>Max Guests</b></label>
                <br/>
                <input type = "text" placeholder = "Enter Max Guests" id = "maxGuestsNew" name = "maxGuests" required />
                <br/>
                <label for = "address"><b>Address</b></label>
                <br/>
                <input type = "text" placeholder = "Enter Address" id = "addressNew" name = "address" required />
                <br/>
                <button type = "submit" onClick = {newPropertyClicked}>Add Property</button>
            <br/>
            <Link to="/register">Dont have an account? Sign up here.</Link>
            </form>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Max Guests</th>
                    <th>Address</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                <tbody>
                    {properties && properties.map && properties.map(property =>
                        <>
                        <tr key = {property.id}>
                            <th>{property.title}</th>
                            <th>{property.description}</th>
                            <th>{property.maxGuests}</th>
                            <th>{property.location}</th>
                            <th><Link to={"/property/" + property.id}><button>Edit</button></Link></th>
                            <th><button type = "submit" onClick = {deleteClicked(property.id)}>Login</button></th>
                        </tr>
                        </>
                    )}
                </tbody>
            </table>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}