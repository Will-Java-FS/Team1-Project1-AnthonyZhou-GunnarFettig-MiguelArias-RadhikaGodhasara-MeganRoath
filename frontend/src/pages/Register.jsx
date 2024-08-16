import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const registerClicked = async (event) => {
        event.preventDefault();
        var selectedRole = "Renter";
        if (document.getElementById("owner").checked) {selectedRole = "Owner";}

        await axios.post("https://localhost:8080/register", {
            username: document.getElementById("usernameRegister").value,
            password: document.getElementById("passwordRegister").value,
            role: selectedRole
        })
        .then(response => {
            console.log(response.data);
            if (response.ok) {
                return <Navigate to = '/login' />
            }
        })
        .catch(error => {
            console.error('Error on register attempt!', error);
        });
    }

    // TODO: If submit fails show message and/or change colors, etc
    // TODO: add password restrictions
    return (
        <form id = "userRegister">
            <p>I am looking to:</p>
            <input type = "radio" id = "renter" name = "user_type" value = "Renter" required />
            <label for = "renter">Rent a property</label><br/>
            <input type = "radio" id = "owner" name = "user_type" value = "Owner" required />
            <label for = "owner">List my property</label><br/>
            <br/>
            <label for = "username"><b>Username</b></label>
            <br/>
            <input type = "text" placeholder = "Enter Username" id = "usernameRegister" name = "username" required />
            <br/>
            <label for = "password"><b>Password</b></label>
            <br/>
            <input type = "password" placeholder = "Enter Password" id = "passwordRegister" name = "password" required /> 
            <br/>
            <button type = "submit" onClick = {registerClicked}>Register</button>
            <br/>
            <Link to = "/login">Already have an account? Login here.</Link>
        </form>
    )
}