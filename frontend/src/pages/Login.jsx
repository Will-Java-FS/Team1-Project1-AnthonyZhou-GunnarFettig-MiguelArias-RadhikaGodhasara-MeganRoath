import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Login() {
    const loginClicked = async (event) => {
        event.preventDefault();
        await axios.post("https://localhost:8000/login", {
                username: document.getElementById("usernameLogin").value,
                password: document.getElementById("passwordLogin").value
        })
        .then(response => {
            if (response.ok) {
                if (response.data.role === "Renter") {AuthenticationService.loginRenter(response.data.username);}
                else {AuthenticationService.loginOwner(response.data.username);}
                AuthenticationService.setUpToken(response.data.token);
                return <Navigate to = '/redirect' />
            }
        })
        .catch(error => {
            console.error('Error on login attempt!', error);
        });
    }

    // TODO: If submit fails show message and/or change colors, etc
    return (
        <form id = "userLogin">
            <label for = "username"><b>Username</b></label>
            <br/>
            <input type = "text" placeholder = "Enter Username" id = "usernameLogin" name = "username" required />
            <br/>
            <label for = "password"><b>Password</b></label>
            <br/>
            <input type = "password" placeholder = "Enter Password" id = "passwordLogin" name = "password" required />  
            <br/>
            <button type = "submit" onClick = {loginClicked}>Login</button>
            <br/>
            <Link to="/register">Dont have an account? Sign up here.</Link>
        </form>
    )
}