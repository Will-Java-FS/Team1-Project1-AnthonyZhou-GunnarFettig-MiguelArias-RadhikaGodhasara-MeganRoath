import axios from "axios";

class AuthenticationService {
    loginRenter(username, id) {
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("authenticatedUserId", id);
        sessionStorage.setItem("role", "renter");
        console.log("Successful renter login");
    }

    loginOwner(username, id) {
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("authenticatedUserId", id);
        sessionStorage.setItem("role", "owner");
        console.log("Successful owner login");
    }

    logout() {
        sessionStorage.setItem("authenticatedUser", null);
        sessionStorage.setItem("authenticatedUserId", null);
        delete axios.defaults.headers.common["Authorization"];
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(false);
    }

	loggedInUsername() {
		return sessionStorage.getItem("authenticatedUser");
	}

    loggedInUserId() {
		return sessionStorage.getItem("authenticatedUserId");
	}

    loggedInUserRole(){
        return sessionStorage.getItem("role");
    }

    isLoggedIn() {
        return sessionStorage.getItem("role") == "renter" || sessionStorage.getItem("role") == "owner";
    }

    setUpToken(token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        sessionStorage.setItem("token", token);
    }

    axiosToken() {
        if (this.isLoggedIn()) {
            axios.defaults.headers.common["Authorization"] = "Bearer " +
                                    sessionStorage.getItem("token");
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }
}

export default new AuthenticationService();