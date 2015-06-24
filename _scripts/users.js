var Users = (function() {
	var pub = {};
	
	/*
	 * Checks if the URL leads to something that exists
	 */
	function urlExists(url) {
		var http = new XMLHttpRequest();
		http.open('HEAD', url, false);
		http.send();
		return http.status!==404;
	}
	
	/*
	 * Displays all of the users along with all their details and profile pictures
	 */
	function displayUsers(data) {
		var target = $("#sec_userContainer");
		var dataList = $(data).find("user");
		var count = 0;
		$(dataList).each(function() {
			
			// Gather the users information
			var username = $(this).find("username")[0].textContent;
			var firstname = $(this).find("firstname")[0].textContent;
			var lastname = $(this).find("lastname")[0].textContent;
			var gender = $(this).find("gender")[0].textContent;
			var signature = $(this).find("signature")[0];
			
			// Checks if the users has a signature
			if (!$(signature).length) {
				signature = "";	
			} else {
				signature = $(this).find("signature")[0].textContent;	
			}
			
			// Will hold the URL to the users profile picture
			var pictureURL = "userImages/" + username + ".png";
			
			// Checks to see if user has a profile picture. If not give default male / female
			if (!urlExists(pictureURL)) {
				if (gender === "Male") {
					pictureURL = "userImages/default_male.png";
				}else {
					pictureURL = "userImages/default_female.png";
				}
			}
			
			//Create the container to hold the user information
			$(target).append("<div class=\"div_user\" id=\"" + username + "\">");
			var container = $(target).children(".div_user")[count];
			
			// Add the users information to the container
			$(container).append("<hr>");
			$(container).append("<a target=\"_self\" href=\"" + pictureURL + "\"><img class=\"profilePicture\" src=\"" + pictureURL + "\" alt=\"" + username + "'s profile picute\"></a>");	
			$(container).append("<div class=\"div_details\"><p><strong>" + username + "</strong></p><p>" + firstname + " " +  lastname + "</p><p>" + gender + "</p><p><b><i>" + signature + "</i></b></p></div>");
			$(container).append("<hr>");
			count++;
        });
	}
	
	/*
	 * Add links to all the users in the sidebar
	 */
	function getLinks(data, target) {
		$(target).empty();
		$(target).append("<ul>");
		var ul = $(target).children("ul");
		$(ul).append("<li><h2>Users</h2></li>");
		$(data).find("user").each( function() {
			var username = $(this).find("username")[0].textContent;
			$(ul).append("<li class=\"li_threads\"><a href=\"#" + username + "\">" + username + "</li>");
		});
		$(target).append("</ul>");
	}
	
	pub.setup = function() {
		var navUsers = $("#sec_navUsers");
		var xmlURL = "_xml/users.xml";
		$.ajax({
			type:"GET",
			url:xmlURL,
			cache:false,
			success: function(data) {
				getLinks(data, navUsers);
			}
		});
		$.ajax({
			type:"GET",
			url:xmlURL,
			cache:false,
			success: function(data) {
				displayUsers(data);
			}
		});
	};
	
	return pub;
}());

$(document).ready(Users.setup);