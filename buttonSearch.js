const buttonSearch = (e) => {
    const searchString = searchInput.value.toLowerCase();
    const filteredLexicon = LEX.filter((word) =>

        word.search_word.toLowerCase().includes(searchString) ||
        word.gloss.some(gloss => gloss.includes(searchString))
    );

    displayWords(filteredLexicon);
};