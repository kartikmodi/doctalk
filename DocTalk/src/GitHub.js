var allUserData;
var fullNamesAndUserName;
var numberOfResponses = 0;
$.getJSON("https://api.github.com/users", {
	aynsc : false
}, function(data) {
	console.log(data);
	allUserData = data;
	fullNamesAndUserName = new Array(allUserData.length);
	for (var i = 0; i < allUserData.length; i++) {
		fullNamesAndUserName[i] = new Array(3);
	}
	for (var j = 0; j < 2; j++) {
	//for (var j = 0; j < allUserData.length; j++) {
		fullNamesAndUserName[j][0] = allUserData[j].login;
		var k = 0;
		$.getJSON("https://api.github.com/users/" + fullNamesAndUserName[j][0],
				function(data) {
			numberOfResponses++;
			console.log("NAme and Follower" + data.name + data.followers);
			fullNamesAndUserName[k][1] = data.name;
			fullNamesAndUserName[k][2] = data.followers;
			k++;
		});
	}
	
});

setInterval(function(){
	$("#searchterm").keyup(function(e) {
//		if(numberOfResponses==allUserData.length){
		if(numberOfResponses==2){
			console.log("Fullanmes"+fullNamesAndUserName);
		var inputPattern = $("#searchterm").val();
						var searchedUsers = [];
						var count = 0;
						for (i = 0; i < fullNamesAndUserName.length; i++) {
			if (fullNamesAndUserName[i][1] && fullNamesAndUserName[i][1].indexOf(inputPattern) != -1) {
				var temp  = [];
				temp[0] = fullNamesAndUserName[i][1];
				temp[1] = fullNamesAndUserName[i][2];
				searchedUsers[count] = temp;
				count++;
			}
		}
		var searchedUsers =searchedUsers.sort(function(a,b){ return a[1] > b[1] ? 1 : -1; });
		searchedUsers.forEach(function(data) {
			$("#results").empty();
			$('#results').append(data[0]);
			console.log(searchedUsers);
		});}
	});	
	
},1000);
