/*
Old buttonSearch

const buttonSearch = (e) => {
    const searchString = searchInput.value.toLowerCase();
    const filteredLexicon = LEX.filter((word) =>

        word.search_word.toLowerCase().includes(searchString) ||
        word.gloss.some(gloss => gloss.includes(searchString))
    );

    displayWords(filteredLexicon);
};*/

function akuzSearch(term){
    const searchString = term;

    //Exact match
    const exactWord = LEX.filter((word) =>
        word.search_word.toLowerCase() == searchString
    );


    //contains word
    const containsWord = LEX.filter((word) =>
        word.search_word.toLowerCase().includes(searchString)
    );

    //Print results in section
    results.innerHTML += `<span class="results_section">Results for <i>${term}</i>:</span>`
    let termResults = exactWord.concat(containsWord)
    displayWords(termResults);

    //parse the searchTerm
    
    let parsedRootList = parseWord(term);

    let parsedRoot = parsedRootList[0];
    let postBases = parsedRootList.slice(1,parsedRootList.length);

    //exact match parsed root
    const exactParsedRoot = LEX.filter((word) =>
        word.search_word.toLowerCase() == parsedRoot
    );

    //contains parsed root
    const containsParsedRoot = LEX.filter((word) =>
        word.search_word.toLowerCase().includes(parsedRoot)
    );

    //Print results in section
    results.innerHTML += `<span class="results_section">Results for <i>${parsedRoot}</i>:</span>`
    let parsedResults = exactParsedRoot.concat(containsParsedRoot)
    displayWords(parsedResults);

    //exact match postbases
    let postBaseResults = new Array;
    postBases.foreach((item) =>{
        var pb = LEX.filter((word) => 
            word.search_word.toLowerCase() == item
            );
        results.innerHTML += `<span class="results_section">Results for <i>${item}</i>:</span>`
        displayWords(pb);
    });

};

//Search for English words
function englishSearch(term) {
    let filteredLexicon = LEX.filter((word) =>

        word.gloss.some(gloss => gloss.includes(searchString))
    );

    displayWords(filteredLexicon);
};

const searchController = (e) => {
    results.innerHTML = "";

    const searchString = searchInput.value.toLowerCase();

    if(document.getElementById("engSearch").checked){
        englishSearch(searchString);
    }
    else if(document.getElementById("akuzSearch").checked){
        akuzSearch(searchString);
    }
};