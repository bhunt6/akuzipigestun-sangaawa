function buildController(root, pos) {
    let posList = { "noun":"(N)",
        "verb":"(V)",
        "emotional root":"(EMO)",
        "postural root":"(POS)",
        "pronoun":"(N)"
}
    root += posList[pos];
    createDropdowns(root, pos);
}

function getMorphs(){
    let morphList = document.getElementsByClassName("include");
    let values = [];
    let result, gen;

    values[0] = morphList[0].textContent;
    for(let i=1; i<morphList.length; i++){
        values.push(morphList[i].value);
    }
    let joinedInfl = values.slice(1).join("^");
    if(joinedInfl in verbExeptions){
        joinedInfl = verbExeptions[joinedInfl];
    }
    gen = values[0] + "^" + joinedInfl;
    console.log(gen);
    //result = foma_apply_down(s2m, "qavaghtuq");
 
    result = foma_apply_down(m2s, gen);
    console.log(result);


    //print error message
    if (result === undefined || result.length == 0) {
        fomaPrintInvert("dummy", 0);
    }
    else {
        fomaPrintInvert(result, 1);
    }
}

function fomaPrintInvert(tkn, valid){

	let results = document.getElementById("results");
	let content = document.createElement("P");

	results.innerHTML = "";
	if(!valid) {
		results.innerHTML = "Unable to determine surface form."
	}

	else {
		for(i=0; i<tkn.length; i++){
			content.innerHTML = tkn[i];
			results.appendChild(content);
		}
	}
}

function populate(s1, s2){
    let caseMood = document.getElementById(s1);
    let infl = document.getElementById(s2);
    let nounCase = caseMood.value;
    let optionArray = [];
    infl.innerHTML = "";
    
    if(s1 == "case"){
        optionArray = nounInfl[nounCase];
    }

    else if (s1 == "mood"){
        if(caseMood.value.includes("Intr")){
            optionArray = verbIntr;
        }
        else{
            optionArray = verbTrns;
        }
    }

    for (let option in optionArray){
        let newOption = document.createElement("option");
        newOption.value = optionArray[option];
        newOption.innerHTML = optionArray[option];
        infl.options.add(newOption);
    }
    infl.dispatchEvent(new Event('change'));

}

function createDropdowns(base, pos){
    let builderArea = document.getElementById("wordBuilder");
    if(pos=="noun"){
        builderArea.innerHTML = `<span class="morph include" id="base">${base}</span>
                                <select class="morph" id="case" onchange="populate(this.id, 'possNum');" autocomplete="off">
                                    <option value="Default" selected disabled>Case</option>
						            <option value="Absolutive">Absolutive</option>
                                    <option value="Relative">Relative</option>
                                    <option value="Ablative Modalis">Ablative Modalis</option>
                                    <option value="Locative">Locative</option>
                                    <option value="Allative">Allative</option>
                                    <option value="Perlative">Perlative</option>
                                    <option value="Equative">Equative</option>
					            </select>
					            <select class="morph include" id="possNum" autocomplete="off">
						            <option value="default" selected disabled>Possession/Number</option>
					            </select>
                                <input id="searchButton" type="button" value="Generate" onclick="getMorphs(event)">
                                <div id="results"></div>`
    }
    else if(pos=="verb"){
        builderArea.innerHTML = `<span class="morph include" id="base">${base}</span>
                                <select class="morph include" id="mood" onchange="populate(this.id, 'perNum');" autocomplete="off">
						            <option value="default" selected disabled>Mood</option>
                                </select>
                                <select class="morph include" id="perNum" autocomplete="off">
						            <option value="default" selected disabled>Person/Number</option>
					            </select>
                                <input id="searchButton" type="button" value="Generate" onclick="getMorphs(event)">
                                <div id="results"></div>`;

        let moodList = document.getElementById("mood");
        for (let mood in verbMoods){
            let newOpt = document.createElement("option");
            newOpt.value = verbMoods[mood];
            newOpt.innerHTML = verbMoods[mood];
            moodList.options.add(newOpt);
        }
    }
    else if(pos=="pronoun"){
        builderArea.innerHTML =`<span class="morph" id="base">${base}</span>
                                <select class="morph" id="prnInfl" autocomplete="off">
						            <option value="default" selected>Case/Number</option>
					            </select>
                                <input id="searchButton" type="button" value="Generate" onclick="getMorphs(event)">
                                <div id="results"></div>`

        let prnList = document.getElementById("prnInfl");
        for (let prn in pronouns){
            let newOpt = document.createElement("option");
            newOpt.value = pronouns[prn];
            newOpt.innerHTML = pronouns[prn];
            prnList.options.add(newOpt);
        }
    }
}