const displayWords = (words) => {
    let results = document.getElementById("results");
    const htmlString = words
        .map((word) =>
        //entry formatting as string
            `<div class="result">
                <div>
                    <a href="entry.html?entry=${word.UUID}"><span class="entryHead">${word.headword}, ${word.pos}</span></a>
                    <span class="entryCyr">(${word.cyrillic})</span>
                    <span class="entryipa">[${word.ipa}]</span>
                    <span class="entryDef">${word.gloss.join("; ")}</span>
                </div>
                <span class="entryOther">${word.examples.join("\n")}</span>
            </div>
            `)
        .join('');
    results.innerHTML += htmlString;
};