/** Module for cookie support
 *
 * This module provides some utility functions to
 * make using cookies easier. URI encoding is used
 * to make most names and values safe to store,
 * but JSON (or other) encoding of compelx types
 * is left to the user.
 */
var Cookie = (function () {
    var pub = {}; // Public interface

    /** Set a cookie value
     *
     * This function sets a new value to a cookie.
     * If a cookie with the given name already exists, then
     * it's current value is overwritten. Otherwise a new
     * cookie name-value pair is created.
     *
     * Expiry times are given in hours. If none is given then the
     * cookie persists until the browser closes. If a negative (past)
     * value is given then the cookie expires immediately, but
     * Cookie.clear() is better for that.
     *
     * name is the name of the cookie to set
     * value is the value to set
     * hours is the expiry time from now
     */
    pub.set = function (name, value, hours) {
        var date, expires;
        value = encodeURIComponent(value);
        name = encodeURIComponent(name);
        if (hours) {
            date = new Date();
            date.setHours(date.getHours() + hours);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    /** Retrieve a cookie value
     *
     * This attempts to retrieve the value of a cookie that has
     * previously been set. If no value is found (the cookie has
     * not been set or has expired), then null is returned.
     *
     * name is the name of the cookie to retrieve
     *
     * return the stored value, or null if none exists
     */
    pub.get = function (name) {
        var nameEq, cookies, cookie, i;
        nameEq = encodeURIComponent(name) + "=";
        cookies = document.cookie.split(";");
        for (i = 0; i < cookies.length; i += 1) {
            cookie = cookies[i].trim();
            if (cookie.indexOf(nameEq) === 0) {
                return decodeURIComponent(cookie.substring(nameEq.length, cookie.length));
            }
        }
        return null;
    };

    /** Clear a cookie value
     *
     * This function removes the value (if any) associated
     * with the given cookie name.
     *
     * name is the name of the cookie to clear
     */
    pub.clear = function (name) {
        pub.set(name, "", -1);
    };

    return pub; // Expose the public interface
}());

