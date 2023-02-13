const displayWords = (words) => {
    let results = document.getElementById("results");
    const htmlString = words
        .map((word) =>
        //entry formatting as string
            `<a href="entry.html?entry=${word.UUID}" class="result">
                <div>
                    <span class="entryHead">${word.headword}, ${word.pos}</span>
                    <span class="entryCyr">(${word.cyrillic})</span>
                    <span class="entryipa">/${word.ipa}/</span>
                    <span class="entryDef">${word.gloss.join("; ")}</span>
                </div>
                <span class="entryOther">${word.examples.join("\n")}</span>
            </a>
            `)
        .join('');
    results.innerHTML += htmlString;
};