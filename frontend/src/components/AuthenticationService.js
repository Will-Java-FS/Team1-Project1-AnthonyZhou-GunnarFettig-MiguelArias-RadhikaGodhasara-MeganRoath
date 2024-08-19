import axios from "axios";

class AuthenticationService {
    loginRenter(username) {
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("role", "Renter");
        console.log("Successful login");
    }
  
    loginOwner(username) {
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("role", "Owner");
        console.log("Successful login");
    }
  
    logout() {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(false);
    }
  
	loggedInUsername() {
		return sessionStorage.getItem("authenticatedUser");
	}

    isLoggedIn() {
        return sessionStorage.getItem("role") === "Renter" | "Owner";
    }

    isLoggedInRenter() {
		return sessionStorage.getItem("role") === "Renter";
    }

    isLoggedInOwner() {
        return sessionStorage.getItem("role") === "Owner";
    }

    setUpToken(token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        sessionStorage.setItem("token", token);
    }
}

export default new AuthenticationService();