function go(lang) {
    let height = parseInt(document.getElementById("height").value);
    let width = parseInt(document.getElementById("width").value);

    window.location.href = `generation.html?width=${width}&height=${height}&lang=${lang}`;
}