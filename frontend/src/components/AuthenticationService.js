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

    setUpToken(jwtToken) {
        sessionStorage.setItem("token", jwtToken);
    }
}

export default new AuthenticationService();