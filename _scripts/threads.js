var Threads = (function() {
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
	 * Finds the depth of the parameter
	 */
	function depthTest(currentPost) {
		var depth = 0;
		while ($(currentPost).parent()[0].nodeName !== "posts") {
			currentPost = $(currentPost).parent()[0];
			depth ++;
		}
		return depth;
	}
	
	/*
	 * Toggles the visibility of a post
	 */
	function showHidePost() {
		$(this).siblings().toggle("easeOutQuart");
		$(this)
	}
	
	/*
	 * Extracts all the post data and adds it to the containter
	 * Assigns action event to post allowing the user to toggle post visibility
	 */
	function threadBuilder(data) {
		var target = $("#sec_threadContainer");
		var dataList = $(data).find("post");
		var count = 0;
		
		$(dataList).each(function() {
			// The container to hold the post
			$(target).append("<div class=\"div_post\">");
			var replyContainer = $(target).children(".div_post")[count];
			
			// Find the posts details
			var username = $(this).find("username")[0].textContent;
			var dateTag = $(this).find("date")[0];
			var day = $(dateTag).find("day")[0].textContent;
			var month = $(dateTag).find("month")[0].textContent;
			var year = $(dateTag).find("year")[0].textContent;
			var timeTag = $(this).find("time")[0];
			var hour = $(timeTag).find("hour")[0].textContent;
			var minute = $(timeTag).find("minute")[0].textContent;
			var second = $(timeTag).find("seconds")[0].textContent;
			var text = $(this).find("text")[0].textContent;
			
			// Converts to 12h time
			if (hour > 12) {
				hour = hour - 12;
				second = second + "pm";
			} else {
				second = second + "am";	
			}
			
			// Get gender
			var gender;
			$.ajax({
				type:"GET",
				async:false,
				url:"_xml/users.xml",
				cache:false,
				success: function(data) {
					$($(data).find("user")).each(function() {
						if ($(this).find("username")[0].textContent === username){
							gender = $(this).find("gender")[0].textContent;	
						}
					});
				}
			});
			// Will hold the URL to the users profile picture
			var picturePNG = "userImages/" + username + ".png";
			var pictureJPG = "userImages/" + username + ".jpg";
			var pictureURL = picturePNG;;
			
			// Checks to see if user has a profile picture. If not give default male / female
			/*if (!urlExists(picturePNG)) {
				
				if (!urlExists(pictureJPG)) {
					// Neither picture exists
					if (gender === "Female") {
						pictureURL = "userImages/default_female.png";
					}else {
						pictureURL = "userImages/default_male.png";
					}
				}else {
				// .png doesnt exist but .jpg does so use that
					if (urlExists(picturePNG)) {
						pictureURL = pictureJPG;
					}
				}
			}*/
			
			// I had a problem with the pics and this seems to fix it to an extent
			if (gender === "Female") {
				pictureURL = "userImages/default_female.png";
			}
			if(gender === "Male") {
				pictureURL = "userImages/default_male.png";
			}
			if (urlExists(picturePNG)) {
				pictureURL = pictureJPG;
			}
			
			if (urlExists(picturePNG)) {
				pictureURL = picturePNG;	
			}
			
			// Append the post details to the container
			$(replyContainer).append("<p class = \"timestamp\"><span class=\"date\">" + month +  " " + day +  " " + year +  "  ----  " + hour +  ":" + minute +  ":" + second + "</span><span class=\"postNumber\">Post #" + (count+1) + " [-]</span</p>");	
			$(replyContainer).append("<div class = \"username\"><img src=\"" + pictureURL + "\" alt=\"" + username + "'s profile picture\"><p><strong>" + username + "</strong></p></div>");
			$(replyContainer).append("<p class=\"text\">" + text + "</p>");
			
			// Gets the depth of the current post
			var d = depthTest(this);
			$(replyContainer).css("margin-left", d*15);
			
			count++;
        });
		// Allows the post to be hidden
		$(".timestamp").click(showHidePost);
	}
	
	/*
	 * Preps the container and page before calling threadBuilder() 
	 * Adds in thread title and additional information
	 */
	function generateThread() {
		// Prep the container by clearing everything out of it
		$("#sec_threadContainer").empty();
		// Hide the welcome blurb
		$("#sect_welcomeBlurb").css("display", "none");
		// Modify the header to contain content about the thread.
		$("header").html("<div class=\"givePattern\"><h1>" + $(this).html() + "</h1></div><h2>This is a subtitle</h2><p>This should be the thread question or discussion.</p><p>This could span a few paragraphs...</p>");
		//  Get the URL of the thread XML file
		var threadURL = $(this).attr("id");
		$.ajax({
			type:"GET",
			url:threadURL,
			cache:false,
			success: function(data) {
				threadBuilder(data);
			}
		});
	}
	
	/*
	 * Populates the sidebar with a list of threads
	 */
	function getLinks(data, target) {
		// Prep the container by clearing everything out of it
		$(target).empty();
		// Create a new list to hold the thread titles
		$(target).append("<ul>");
		var ul = $(target).children("ul");
		// Add a list title
		$(ul).append("<li><h2>Threads</h2></li>");
		// For each 'thread' get the title and add it to a new list item
		// Make the id of each item the XML URL address for easy access
		$(data).find("thread").each( function() {
			var title = $(this).find("title")[0].textContent;
			var postURL = $(this).find("posts")[0].textContent;
			$(ul).append("<li class=\"li_threads\" id=\"_xml/"+ postURL + "\">" + title + "</li>");
		});
		// Close the list
		$(target).append("</ul>");
		// Assign click events for each thread title
		$(".li_threads").click( 
			generateThread
		);
	}
	
	pub.setup = function() {
		// Sets up the thread links in the sidebar
		var navThreads = $("#sec_navThreads");
		var xmlURL = "_xml/forum.xml";
		$.ajax({
			type:"GET",
			url:xmlURL,
			cache:false,
			success: function(data) {
				getLinks(data, navThreads);
			}
		});
	};
	
	return pub;
}());

$(document).ready(Threads.setup);