import { useState, useEffect } from 'react';
import axios from "axios";
import  { Navigate, Link } from 'react-router-dom'
import AuthenticationService from "../components/AuthenticationService";

export default function PropertiesEdit() {
    const [property, setProperty] = useState();
    useEffect(async () => {
        await axios.get("https://localhost:8000/properties/" + window.location.pathname)
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
            await axios.patch("https://localhost:8000/properties/" + window.location.pathname, {
                title: document.getElementById("titleUpdate").value,
                description: document.getElementById("descriptionUpdate").value,
                maxGuests: document.getElementById("maxGuestsUpdate").value,
                location: document.getElementById("addressUpdate").value 
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
            <h1>Edit your property</h1>
            <Link to="/properties"><button>Back</button></Link>
            <br/>
            <form id = "updateProperty">
                <label for = "title"><b>Title</b></label>
                <br/>
                <input type = "text" id = "titleUpdate" name = "title" value = {property.title} required />
                <br/>
                <label for = "description"><b>Description</b></label>
                <br/>
                <input type = "text" id = "descriptionUpdate" name = "description" value = {property.description} required />
                <br/>
                <label for = "maxGuests"><b>Max Guests</b></label>
                <br/>
                <input type = "number" id = "maxGuestsUpdate" name = "maxGuests" value = {property.maxGuests} required />
                <br/>
                <label for = "address"><b>Address</b></label>
                <br/>
                <input type = "text" id = "addressUpdate" name = "address" value = {property.location} required />
                <br/>
                <button type = "submit" onClick = {updatePropertyClicked}>Update Property</button>
            </form>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}