function start() {
    let searchParams = new URLSearchParams(window.location.search);

    let lang = searchParams.get("lang");

    fetch(`bingo-${lang}.txt`)
        .then(res => res.text())
        .then(text => populateTables(text));
}

function populateTables(rawText) {
    let texts = parseText(rawText);
    shuffleArray(texts);

    let searchParams = new URLSearchParams(window.location.search);

    let width = parseInt(searchParams.get("width"));
    let height = parseInt(searchParams.get("height"));

    let table = document.getElementById("main");

    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        let row = table.insertRow();

        for (let cellIndex = 0; cellIndex < width; cellIndex++) {
            let cell = row.insertCell();

            const textIndex = rowIndex * width + cellIndex;

            if (textIndex >= texts.length) {
                // Maybe provide a more helpful error message?
                continue;
            }
            
            cell.innerHTML += `<div class="long">${texts[textIndex].short}</div>`;
            cell.innerHTML += `<div class="short">${texts[textIndex].long}</div>`;

            if (texts[textIndex].code != undefined) {
                eval(texts[textIndex].code);
            }
        }
    }
}

function parseText(text) {
    return text.split("\n")
        .map(line => {
            [short, long, code] = line.split("--").map(part => part.trim());

            return { short, long, code };
        });
}

// taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
