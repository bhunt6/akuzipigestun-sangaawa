function fomaPrint(tkn, valid) {

	var results = document.getElementById("output");
	var content = document.createElement("P");

	results.innerHTML = "";
	if(!valid) {
		results.innerHTML = "Invalid entry."
	}
	
	else if (document.getElementById("up").checked){
		results.innerHTML = "<b>" + "Surface form:" + "</b>"+ "<br>" + "<br>" + tkn;
	}

	else {
		results.innerHTML = "<b>" + "Possible analyses:" + "</b>"+ "<br>" + "<br>";
		for(i=0; i<tkn.length; i++){
			for(j=0; j<tkn[i].length; j++){
				if(j == tkn[i].length - 1){
					content.innerHTML += (tkn[i][j] + "<br>" + "<br>" + "<hr>" + "<br>");
				}
				else{
					content.innerHTML += (tkn[i][j] + "\n+\n");
				}
			}
		results.appendChild(content);
		}
	}
}

function fomaPrintInvert(tkn, valid){

	var results = document.getElementById("output");
	var content = document.createElement("P");

	results.innerHTML = "";
	if(!valid) {
		results.innerHTML = "Invalid entry."
	}

	else {
		for(i=0; i<tkn.length; i++){
			content.innerHTML = (tkn[i] + "<br>" + "<br>" + "<hr>" + "<br>");
			results.appendChild(content);
		}
	}
}
