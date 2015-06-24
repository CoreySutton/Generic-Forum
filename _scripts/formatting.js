var Formatting = (function() {
	var pub = {};
	/*
	 * This checks to see if the user has previously set Cookies that contain their 
	 * display prefrences. If they exist then apply them to the page.
	 */
	function checkForCookies() {
		if (Cookie.get("background") !== null) {
			$("body").css("background-color", Cookie.get("background"));
		}
		if (Cookie.get("sidebar") !== null) {
			$("nav").css("background-color", Cookie.get("sidebar"));
		}
		if (Cookie.get("font") !== null) {
			$("body").css("font-family", Cookie.get("font"));
		}
		if (Cookie.get("content") !== null) {
			$("#div_RHS").css("background-color", Cookie.get("content"));
		}
	}
	
	pub.setup = function() {
		// Makes div_RHS fill the entire window 
		$("#div_RHS").css("min-height", $(window).height());
		// Check for customisation Cookies
		checkForCookies();
	};
	
	return pub;
}());

$(document).ready(Formatting.setup);