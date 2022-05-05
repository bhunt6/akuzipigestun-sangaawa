function parseSearch() {
    results.innerHTML = "";
    const userInputRaw = searchInput.value.toLowerCase();

    const userInput = cyrillic_to_latin(userInputRaw);

    const result = foma_apply_down(myNet, userInput);

    if (result === undefined || result.length == 0) {
        results.innerHTML = "No results found"
    }

    else {
        var token = new Array;
        for (var i = 0; i < result.length; i++) {
            var morphemes = new Array;
            var inflNotSplit = result[i].split("-");

            for (var m = 0; m < inflNotSplit.length; m++) {
                if (inflNotSplit[m].includes("[N]")) {
                    inflSplit = inflNotSplit[m].split("[N]");
                    tmp = morphemes.concat(inflSplit);
                    morphemes = tmp;
                }
                else if (inflNotSplit[m].includes("[V]")) {
                    inflSplit = inflNotSplit[m].split("[V]");
                    tmp = morphemes.concat(inflSplit);
                    morphemes = tmp;
                }
                else {
                    morphemes.push(inflNotSplit[m]);
                }
            }
            token.push(morphemes)
        }
        setParse(token);

        // Array to hold all morphophonological symbols
        var symbols = ["~", "–", ")"];

        for (var m = 0; m < token[0].length; m++) {
            searchToken = token[0][m].split("[")[0];

            for (var s = 0; s < symbols.length; s++) {
                symSplit = searchToken.split(symbols[s]);
                searchToken = symSplit[symSplit.length - 1];
            }

            if (searchToken.charAt(0) == "f") {
                var tmp = searchToken;
                searchToken = tmp.charAt(0) + "+" + tmp.substr(1);
            }

            if (searchToken != "") {
                buttonSearch(searchToken);
            }
        }   
    }
}