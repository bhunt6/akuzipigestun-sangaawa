//Old buttonSearch
const buttonSearch = (e) => {
    var searchString = searchInput.value.toLowerCase();
    const filteredLexicon = LEX.filter((word) =>

        word.search_word.toLowerCase().includes(searchString) ||
        word.gloss.some(gloss => gloss.includes(searchString))
    );

    displayWords(filteredLexicon);
};

function exactMatch(term){
    let searchString = term;

    //Exact match
    let exactWord = LEX.filter((word) =>
    word.search_word.toLowerCase() == searchString
);
    return exactWord;
}

function containsMatch(term){
    let searchString = term;

    //contains word
    let containsWord = LEX.filter((word) =>
    word.search_word.toLowerCase().includes(searchString)
    );

    let startsWord = LEX.filter((word) =>
    word.search_word.toLowerCase().startsWith(searchString)
    );

    let containsResults = startsWord.concat(containsWord.filter((item) => startsWord.indexOf(item) < 0));

    return containsResults;
}

function printSearch(displayTerm, first, second = []){
    //Print results in section
    let termResults = first.concat(second.filter((item) => first.indexOf(item) < 0));
    if(termResults && termResults.length){
        results.innerHTML += `<span class="results_section">Results for <i>${displayTerm}</i>:</span>`;
    }
    displayWords(termResults);
}

function akuzSearch(term){
    //parse the searchTerm
    let parsedRootList = parseWord(term);

    if(parsedRootList){
        
        let initialMatch = exactMatch(term);
        if(initialMatch.length){
            printSearch(term, initialMatch);
        }

        let parsedRoot = parsedRootList[0];
        var postBases = parsedRootList.slice(1,parsedRootList.length);
        setParse(parsedRootList);

        //exact match parsed root
        var exactParsedRoot = exactMatch(parsedRoot);
        var containsParsedRoot = containsMatch(parsedRoot);
        printSearch(parsedRoot, exactParsedRoot, containsParsedRoot);

        //exact match postbases
        for(let i=0; i < postBases.length-1; i++){
            var pb = LEX.filter((word) =>
                word.search_word.toLowerCase() == postBases[i]
            );
            if(pb && pb.length){
                results.innerHTML += `<span class="results_section">Results for <i>${postBases[i]}</i>:</span>`
            }
            displayWords(pb);
        }
    }
    //exact and contains searches if word could not be parsed
    else{
        var exactWord = exactMatch(term);
        var containsWord = containsMatch(term);
        printSearch(term, exactWord, containsWord);
    }
};

//Search for English words
function englishSearch(term) {
    //search for exact match in gloss first
    let filteredGlossExact = LEX.filter((word) =>

        word.gloss.some(gloss => gloss == term)
    );

    //search for contained in gloss
    let filteredGloss = LEX.filter((word) =>

        word.gloss.some(gloss => gloss.includes(term)) ||
        word.gloss.join("; ").includes(term)
    );

    //search for match in examples
    let filteredExamples = LEX.filter((word) =>

        word.examples.some(example => example.includes(term))
    );

    //search for match in notes
    let filteredNotes = LEX.filter((word) =>

        word.notes.some(note => note.includes(term))
    );

    //join all results together
    let filteredLexicon = filteredGlossExact.concat(filteredGloss.filter((item) => filteredGlossExact.indexOf(item) <0));
    filteredLexicon = filteredLexicon.concat(filteredExamples.filter((item) => filteredLexicon.indexOf(item) < 0));
    filteredLexicon = filteredLexicon.concat(filteredNotes.filter((item) => filteredLexicon.indexOf(item) < 0));

    displayWords(filteredLexicon);
};

const searchController = (e) => {
    //clear out results and parse divs
    results.innerHTML = "";
    dummy = "";
    setParse(dummy);

    const searchString = searchInput.value.toLowerCase();

    //English search
    if(document.getElementById("engSearch").checked){
        englishSearch(searchString);
    }
    //Akuzipik search
    else if(document.getElementById("akuzSearch").checked){
        akuzSearch(searchString);
    }
};

const setParse = (token) => {
    if(token == ""){
        document.getElementById("parse").style.display = "none";
    }
    else{
        document.getElementById("parse").style.display = "flex";
        const morphs = document.getElementById("morphs");
        let output = `<span class='base'>${token[0]}</span>`;
    
        for(i=1; i<token.length; i++){
            output += `<span class='morpheme'>+ ${token[i]}</span>`;
        }
    
        morphs.innerHTML = output;
    }
};
