function controller(word, pos) {
    let root = word;
    if (pos == "noun") {
        root += "(N)";
        createDropdowns(root, pos);
        populate()
    }
    else if (pos == "verb") {
        root += "(V)";
        createDropdowns(root, pos);
    }
    else if (pos == "emotional root") {
        root += "(EMO)";
        createDropdowns(root, pos);
    }
    else if (pos == "postural root") {
        root += "(POS)";
        createDropdowns(root, pos);
    }
    else if (pos == "pronoun") {
        root += "(N)";
        createDropdowns(root, pos);
    }
    else{
        return
    }
}

function getMorphs(){
    var morphList = document.getElementsbyClassName("morph");
    return morphList.join("^");

}

function createDropdowns(base, pos){
    let builderArea = document.getElementbyId("wordBuilder");
    if(pos=="noun"){
        builderArea.innerHTML = `<span class="morph" id="base">${base}</span>
                                <select class="morph" id="case" autocomplete="off">
						            <option value="Absolutive" selected>Absolutive</option>
                                    <option value="Relative">Relative</option>
                                    <option value="Ablative Modalis">Ablative Modalis</option>
                                    <option value="Locative">Locative</option>
                                    <option value="Allative">Allative</option>
                                    <option value="Perlative">Perlative</option>
                                    <option value="Equative">Equative</option>
					            </select>
					            <select class="morph" id="possNum" autocomplete="off">
						            <option value="default" selected>Possession/Number</option>
					            </select>
                                <input id="searchButton" type="button" value="Generate" onclick="getMorphs(event)">`
    }
    else if(pos=="verb"){
        builderArea.innerHTML = `<span class="morph" id="base">${base}</span>
                                <select class="morph" id="mood" autocomplete="off">
						            <option value="default" selected>Mood</option>
                                </select>`;

        let moodList = document.getElementbyID("mood");
        for (let mood in verbMoods){
            let newOpt = document.createElement("option");
            newOpt.value = verbMoods[mood];
            newOpt.innerHTML = verbMoods[mood];
            moodList.options.add(newOption);
        }

        builderArea.innerHTML += `<select class="morph" id="perNum" autocomplete="off">
						            <option value="default" selected>Person/Number</option>
					            </select>
                                <input id="searchButton" type="button" value="Generate" onclick="getMorphs(event)">`
    }
    else if(pos=="pronoun"){
        builderArea.innerHTML =`<span class="morph" id="base">${base}</span>
                                <select class="morph" id="prnInfl" autocomplete="off">
						            <option value="default" selected>Case/Number</option>
					            </select>
                                <input id="searchButton" type="button" value="Generate" onclick="getMorphs(event)">`

        let prnList = document.getElementbyID("prnInfl");
        for (let prn in pronouns){
            let newOpt = document.createElement("option");
            newOpt.value = pronouns[prn];
            newOpt.innerHTML = pronouns[prn];
            prnList.options.add(newOption);
        }
    }
}