const displayWords = (words) => {
    let results = document.getElementById("results");
    const htmlString = words
        .map((word) =>
        //entry formatting as string
            `<a href="entry.html?entry=${word.UUID}" class="result">
                <div class="entryContent">
                    <div class="entryTop">
                        <span class="entryHead">
                            <div class="headwordCont">${word.headword}</div>
                            <div class="tagCont">${word.tags}${word.pos}</div>
                        </span>
                        <span class="entryCyr">(${word.cyrillic})</span>
                        <span class="entryipa">/${word.ipa}/</span>
                    </div>
                    <div class="entryBottom">
                        <span class="entryDef">${word.gloss.join("; ")}</span>
                    </div>
                </div>
            </a>
            `)
        .join('');
    results.innerHTML += htmlString;
};
//code for displaying examples on card
//<span class="entryOther">${word.examples.join("\n")}</span>