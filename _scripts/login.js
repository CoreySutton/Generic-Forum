/** Module for login/out funtions
 *
 * This provides the basic login/logout checks
 * required for Lab 6. 
 *
 * Requires cookie.js
 */
var Login = (function () {

    var pub = {}; // public interface

	/** Check that a username is valid
	 *
	 * Checks that a string is a valid username.
     * Valid usernames consist of letters, numbers,
     * and underscores, and are not empty.	 
	 *
	 * str the string to check
	 *
	 * return true if str passes the test, false otherwise
	 */
    function isValidUsername(str) {
        var pattern;
        pattern = /^[A-Za-z0-9_]+$/;
        return pattern.test(str);
    }

	/** Get the username currently logged in
     *	
	 * This function returns the username of the
	 * person currently logged in, or null if there
	 * is none.
	 *
	 * return the current username or null
	 */
    function getUsername() {
        return Cookie.get("username");
    }

    function setUsername(username) {
        Cookie.set("username", username);
        document.getElementById("logoutUser").innerHTML = username;
    }

    function clearUsername() {
        Cookie.clear("username");
        document.getElementById("logoutUser").innerHTML = "";
    }

    function doLogin() {
        var username, password;
        username = document.getElementById("loginUser").value;
        password = document.getElementById("loginPassword").value;
        if (!isValidUsername(username)) {
            alert("You need to enter a valid username");
        } else if (username === password) {
            setUsername(username);
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "block";
        } else {
            alert("Username and Password don't match");
        }
        return false;
    }

    function doLogout() {
        document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
        clearUsername();
        return false;
    }

    pub.setup = function () {
        document.getElementById("loginForm").onsubmit = doLogin;
        document.getElementById("logoutForm").onsubmit = doLogout;

        if (getUsername()) {
            document.getElementById("logoutUser").innerHTML = getUsername();
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "block";
        } else {
            document.getElementById("login").style.display = "block";
            document.getElementById("logout").style.display = "none";
        }
    };

    return pub;
}());

if (window.addEventListener) {
    window.addEventListener('load', Login.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Login.setup);
} else {
    alert("Could not attach 'Login.setup' to the 'window.onload' event");
}