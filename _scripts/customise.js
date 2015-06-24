var Customise  = (function() {
	var pub = {};
	
	/*
	 * Populates the sidebar with the users set options, if any.
	 */
	function showOptions() {
		var target = $("#sec_customise");
		var count = 0;
		$(target).empty();
		$(target).append("<h2>Your Options</h2>");
		if (Cookie.get("background") !== null) {
			$(target).append("<p>Background: " + Cookie.get("background") + "</p>");
			count ++;
		}
		if (Cookie.get("sidebar") !== null) {
			$(target).append("<p>Sidebar: " + Cookie.get("sidebar") + "</p>");
			count ++;
		}
		if (Cookie.get("content") !== null) {
			$(target).append("<p>Content: " + Cookie.get("content") + "</p>");
			count ++;
		}
		if (Cookie.get("font") !== null) {
			$(target).append("<p>Font: " + Cookie.get("font") + "</p>");
			count ++;
		}
		if (count === 0) {
			$(target).append("<p>You have not customised any options</p>");
		}
	}
	
	/*
	 * Restores to default settings
	 */
	 function restoreDefaults() {
	 	Cookie.clear("background");
		Cookie.clear("sidebar");
		Cookie.clear("content");
		Cookie.clear("font");
		showOptions();
		$("body").css("background-color", "#000");
		$("nav").css("background-color", "#F00");
		$("#div_RHS").css("background-color", "#EEE");
		$("body").css("font-family", "'Myriad Pro'");
	 }
	
	/*
	 * Updates the background upon click of radio button to provide instant feedback to the user
	 */
	function updateBackground() {
		var val = $(this).attr("value");
		$("body").css("background-color", val);
	}
	
	/*
	 * Updates the sidebar background upon click of radio button to provide instant feedback to the user
	 */
	function updateSidebar() {
		var val = $(this).attr("value");
		$("nav").css("background-color", val);
	}
	
	/*
	 * Updates the font upon click of radio button to provide instant feedback to the user
	 */
	function updateFont() {
		var val = $(this).attr("value");
		$("body").css("font-family", val);
	}
	
	/*
	 * Updates the content background upon click of radio button to provide instant feedback to the user
	 */
	function updateContent() {
		var val = $(this).attr("value");
		$("#div_RHS").css("background-color", val);
	}
	
	/*
	 * Updates the Cookies with the most recent changes
	 */
	function updateCookies() {
		Cookie.set("background", $("body").css("background-color"));
		Cookie.set("sidebar", $("nav").css("background-color"));
		Cookie.set("font", $("body").css("font-family"));
		Cookie.set("content", $("#div_RHS").css("background-color"));
		alert("Changes Saved.");
		showOptions();
	}
	
	pub.setup = function() {
		// Provide immediate changes to help the user test schemes before deciding
		$(".inputBackground").click(updateBackground);
		$(".inputSidebar").click(updateSidebar);
		$(".inputFont").click(updateFont);
		$(".inputContent").click(updateContent);
		$(".updateCookie").submit(updateCookies);
		$(".updateCookie").click(updateCookies);
		// Populates the sidebar, showing the users previously selected options, if any.
		showOptions();
		
		// Action if buton is clicked - restores default colours and font
		$(".restoreDefaults").click(restoreDefaults);
	};
	
	return pub;
}());

$(document).ready(Customise.setup);