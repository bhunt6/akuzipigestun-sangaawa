//functions for verbal and nominal paradigms

//Determine words partof speech and assign appropriate parser tags to the root
//the pass to the appropriate paradigm function
function controller(word, pos) {
    let root = word;
    if (pos == "noun") {
        root += "(N)";
        nominal(root);
    }
    else if (pos == "verb") {
        root += "(V)";
        verbal(root);
    }
    else if (pos == "emotional root") {
        root += "(EMO)";
        verbal(root);
    }
    else if (pos == "postural root") {
        root += "(POS)";
        verbal(root);
    }
    else if (pos == "pronoun") {
        root += "(N)";
    }
}


function nominal(root) {
    var stem = root;
    var tableContent = "";
    var tableZone = document.getElementById("tables");
    for (var nCase in nounInfl) {
        var forms = new Array;
        //alert("infl = " + nounInfl[nCase].length);
        for (var i = 0; i<nounInfl[nCase].length; i++) {
            var surString = "qikmigh" + "^" + nounInfl[nCase][i];
            //alert(surString);
            forms[i] = foma_apply_down(myNetInvert, surString);
        }
    
        tableContent += `<table class="tg">
        <thead>
            <tr>
                <th class="tg-d0ae1">${nCase}</th>
                <th class="tg-kyww"><span
                    style="text-decoration:none;">Singular</span></th>
                <th class="tg-kyww"><span
                    style="text-decoration:none;">Plural</span></th>
                <th class="tg-kyww"><span
                    style="text-decoration:none;">Dual</span></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="tg-kyww"><span
                    style="text-decoration:none;">Unpossessed</span></td>
                <td class="tg-d0ae">${forms[0][0]}</td>
                <td class="tg-d0ae">${forms[1][0]}</td>
                <td class="tg-d0ae">${forms[2][0]}</td>
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
    </table>`
    };
    tableZone.innerHTML = tableContent;
}

//function verbal(root, )

/*
<table class="tg">
    <thead>
        <tr>
            <th class="tg-d0ae"></th>
            <th class="tg-kyww"><span
                style="text-decoration:none;">Singular</span></th>
            <th class="tg-kyww"><span
                style="text-decoration:none;">Plural</span></th>
            <th class="tg-kyww"><span
                style="text-decoration:none;">Dual</span></th>
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