function getUser() {
	document.write("The home.js file has been called");
	$.ajax({
		url: 'http://localhost:8181/users',
		success : function(data) {
			document.write(data);
		}
	})
}