function parseWord(term) {
    const userInput = cyrillic_to_latin(term);

    const result = foma_apply_down(myNet, userInput);
    let token = new Array;
    //console.log("result: ", result)
    if (result === undefined || result.length == 0) {
        return false;
    }

    else{
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
        //setParse(token);

        // Array to hold all morphophonological symbols
        var symbols = ["~", "–", ")"];
        var finalList = new Array;

        let shortestParse = token.reduce((prev, next) => prev.length > next.length ? next : prev)

        for (var m = 0; m < shortestParse.length; m++) {
            searchToken = shortestParse[m].split("[")[0];

            for (var s = 0; s < symbols.length; s++) {
                symSplit = searchToken.split(symbols[s]);
                searchToken = symSplit[symSplit.length - 1];
            }

            
            if (searchToken.charAt(0) == "f") {
                var tmp = searchToken;
                searchToken = "~<sub>" + tmp.charAt(0) + "</sub>" + tmp.substr(1);
            }
            if(searchToken != "") {
                finalList.push(searchToken)
            }
        }   
        finalList.push(token[0][token[0].length-1])
        //console.log("finallist:", finalList)
        return finalList;
        
    }
}