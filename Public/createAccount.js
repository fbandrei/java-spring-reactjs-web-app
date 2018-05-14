function createAccount() {
	var x = document.forms.namedItem("accountForm");
	var username = x.elements[0].value;
	var password = x.elements[1].value;
	var firstname = x.elements[2].value;
	var lastname = x.elements[3].value;
	
	console.log(username);
	
	$.ajax({
		url: 'http://localhost:8181/addUser',
		success : function(data) {
			console.log(data);
		}
	})
}