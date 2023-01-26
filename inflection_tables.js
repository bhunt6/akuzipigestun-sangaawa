//functions for verbal and nominal paradigms

//Determine words part of speech and assign appropriate parser tags to the root
//then pass to the appropriate paradigm function
function controller(word, head, pos, underE) {
    let root = word;
    if (pos == "noun") {
        console.log("root:", root)
        if(root[root.length-1] == "k"){
            root = root.slice(0, -1) + "g";
        }
        else if(root[root.length-1] == "w"){
            if(root[root.length-2] == "k"){
                root = root.slice(0, -2) + "w";
            }
            else{
                root = root.slice(0, -2) + "ghw";
            }
        }
        else if(underE || root[root.length-1] == "a"){
            root = root.slice(0, -1) + "e";
            console.log(root)
        }
        else{
            root = root.slice(0, -1) + "gh"
        }

        if(head[head.length-1] == "*"){
            root+="*";
        }
        root += "[N]";
        nominal(root);
    }
    else if (pos == "verb") {
        root += "[V]";
        verbal(root);
    }
    else if (pos == "emotional root") {
        root += "[EMO]";
        verbal(root);
    }
    else if (pos == "postural root") {
        root += "[POS]";
        verbal(root);
    }
    else if (pos == "pronoun") {
        root += "[N]";
    }
}

function nominal(root) {
    var tableContent = "";
    var tableZone = document.getElementById("tables");
    var transducer = myNetInvert;
    for (var nCase in nounInfl) {
        let forms = new Array;
        //alert("infl = " + nounInfl[nCase].length);
        for (let i = 0; i<nounInfl[nCase].length; i++) {
            let surString = root + nounInfl[nCase][i];
            console.log(surString)
            forms[i] = foma_apply_down(transducer, surString);
        }
    
        tableContent += `
        <button type="button" class="collapsible">${nCase}</button>
        <div class="table_cont">
        <table class="tg">
        <colgroup>
            <col style="min-width: 8rem">
            <col>
            <col>
            <col>
        </colgroup>
        <thead>
            <tr>
                <th class="tg-d0ae1"></th>
                <th class="tg-kyww"><span
                    style="text-decoration:none;">Singular (one)</span></th>
                <th class="tg-kyww"><span
                    style="text-decoration:none;">Dual (two)</span></th>
                <th class="tg-kyww"><span
                    style="text-decoration:none;">Plural (3 or more)</span></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="tg-kyww"><span
                    style="text-decoration:none;">Unpossessed</span></td>
                <td class="tg-d0ae">${forms[0][0]}</td>
                <td class="tg-d0ae">${forms[2][0]}</td>
                <td class="tg-d0ae">${forms[1][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">My (1s)</span></td>
                <td class="tg-d0ae">${forms[3][0]}</td>
                <td class="tg-d0ae">${forms[5][0]}</td>
                <td class="tg-d0ae">${forms[4][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">Our<sub>2</sub> (1d)</span></td>
                <td class="tg-d0ae">${forms[9][0]}</td>
                <td class="tg-d0ae">${forms[11][0]}</td>
                <td class="tg-d0ae">${forms[10][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">Our<sub>3+</sub> (1p)</span></td>
                <td class="tg-d0ae">${forms[6][0]}</td>
                <td class="tg-d0ae">${forms[8][0]}</td>
                <td class="tg-d0ae">${forms[7][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">Your (2s)</span></td>
                <td class="tg-d0ae">${forms[12][0]}</td>
                <td class="tg-d0ae">${forms[14][0]}</td>
                <td class="tg-d0ae">${forms[13][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">Your<sub>2</sub> (2d)</span></td>
                <td class="tg-d0ae">${forms[18][0]}</td>
                <td class="tg-d0ae">${forms[20][0]}</td>
                <td class="tg-d0ae">${forms[19][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">Your<sub>3+</sub> (2p)</span></td>
                <td class="tg-d0ae">${forms[15][0]}</td>
                <td class="tg-d0ae">${forms[17][0]}</td>
                <td class="tg-d0ae">${forms[16][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">His/her/its (3s)</span></td>
                <td class="tg-d0ae">${forms[21][0]}</td>
                <td class="tg-d0ae">${forms[23][0]}</td>
                <td class="tg-d0ae">${forms[22][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">Their<sub>2</sub> (3d)</span></td>
                <td class="tg-d0ae">${forms[27][0]}</td>
                <td class="tg-d0ae">${forms[29][0]}</td>
                <td class="tg-d0ae">${forms[28][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">Their<sub>3+</sub> (3p)</span></td>
                <td class="tg-d0ae">${forms[24][0]}</td>
                <td class="tg-d0ae">${forms[26][0]}</td>
                <td class="tg-d0ae">${forms[25][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">4s</span></td>
                <td class="tg-d0ae">${forms[30][0]}</td>
                <td class="tg-d0ae">${forms[32][0]}</td>
                <td class="tg-d0ae">${forms[31][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">4d</span></td>
                <td class="tg-d0ae">${forms[36][0]}</td>
                <td class="tg-d0ae">${forms[38][0]}</td>
                <td class="tg-d0ae">${forms[37][0]}</td>
            </tr>
            <tr>
                <td class="tg-kyww"><span style="text-decoration:none;">4p</span></td>
                <td class="tg-d0ae">${forms[33][0]}</td>
                <td class="tg-d0ae">${forms[35][0]}</td>
                <td class="tg-d0ae">${forms[34][0]}</td>
            </tr>
        </tbody>
    </table>
    </div>`
    };
    tableZone.innerHTML = tableContent;
}

function intransitiveVerbs() {

}

function transitiveVerbs() {

}


function verbal(root) {
    var tableContent = "";
    var tableZone = document.getElementById("tables");
    var transducer = myNetInvert;
    var forms = new Object;
    for(var vMood in verbMoods) {
        forms[vMood] = [];
            var mood = verbMoods[vMood];
            if(mood.includes(".Intr")) {
                for(let j=0; j<verbIntr.length; j++){
                    let inflections = mood + verbIntr[j];
                    for(var exception in verbExeptions){
                        if(inflections == exception) {
                            let surfaceForm = root + verbExeptions[exception];
                            forms[vMood].push(foma_apply_down(transducer, surfaceForm));
                            console.log(foma_apply_down(transducer, surfaceForm))
                        }
                        else{
                            let surfaceForm = root + inflections;
                            forms[vMood].push(foma_apply_down(transducer, surfaceForm));
                        }
                    }
                }
            }
            else{
                for(let j=0; j<verbTrns.length; j++){
                    let surfaceForm = root + mood + verbTrns[j];
                    forms[vMood].push(foma_apply_down(transducer, surfaceForm));
                }
            }
    }


    tableZone.innerHTML = tableContent;
}

/*
tableContent += `
    <button type="button" class="collapsible">${vMood}</button>
    <table class="tg">
    <colgroup>
        <col style="width: 8rem">
        <col>
        <col>
        <col>
    </colgroup>
    <thead>
        <tr>
            <th class="tg-d0ae1"></th>
            <th class="tg-kyww"><span
                style="text-decoration:none;">Singular (one)</span></th>
            <th class="tg-kyww"><span
                style="text-decoration:none;">Dual (two)</span></th>
            <th class="tg-kyww"><span
                style="text-decoration:none;">Plural (3 or more)</span></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="tg-kyww"><span
                style="text-decoration:none;">unpossessed</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">3s
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">3p
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">3d
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">1s
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">1p
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">1d
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">2s
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">2p
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">2d
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">4s
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">4p
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
        <tr>
            <td class="tg-kyww"><span style="text-decoration:none;">4d
                possessor</span></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
            <td class="tg-d0ae"></td>
        </tr>
    </tbody>
</table>*/