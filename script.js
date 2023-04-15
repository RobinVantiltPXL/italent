"use strict"

const params = new URLSearchParams(window.location.search);

// spa navigation + url based
const voorstelling = document.getElementById("voorstelling");
const overzicht = document.getElementById("overzicht");
const selectie = document.getElementById("selectie");
const reflectie = document.getElementById("reflectie");

navigateTo(params.get("section"));

document.getElementById("voorstellingButton").addEventListener('click', () => navigateTo(null));
document.getElementById("overzichtButton").addEventListener('click', () => navigateTo("overzicht"));
document.getElementById("selectieButton").addEventListener('click', () => navigateTo("selectie"));
document.getElementById("reflectieButton").addEventListener('click', () => navigateTo("reflectie"));

function navigateTo(section) {
    voorstelling.classList.add("displayNone");
    overzicht.classList.add("displayNone");
    selectie.classList.add("displayNone");
    reflectie.classList.add("displayNone");

    switch (section) {
        case "overzicht":
            params.set("section", "overzicht");
            overzicht.classList.remove("displayNone");
            break;
        case "selectie":
            params.set("section", "selectie");
            selectie.classList.remove("displayNone");
            break;
        case "reflectie":
            params.set("section", "reflectie");
            reflectie.classList.remove("displayNone");
            break;
        default:
            params.delete("section");
            voorstelling.classList.remove("displayNone");
            break;
    }
    updateUrl();
}


/* toggle portfolio */
const main = document.getElementById("main");
const body = document.getElementsByTagName("body")[0];
document.getElementById("bgButton").addEventListener("click", (el) => {
    el.target.classList.toggle("true")
    main.style.visibility = main.style.visibility == "hidden" ? "" : "hidden";
});

// toggle tools
const tools = document.getElementById("tools");
const toolArrow = document.getElementById("toolArrow");
toolArrow.addEventListener("click", () => {
    tools.classList.toggle("hidden");
    toolArrow.innerText = toolArrow.innerText === "^" ? 
        "v" : "^";
    toolArrow.classList.toggle("true");
});

// switch background
const spaceBg = "bg.js", pxlBg = "bg2.js"
const spaceButton = document.getElementById("spaceButton");
const pxlButton = document.getElementById("pxlButton");
let bgScript;

const bgParam = params.get("bg");
if (bgParam === "pxl") {
    setBg(pxlBg);
    spaceButton.classList.remove('true');
    pxlButton.classList.add('true');
} else {
    setBg(spaceBg);
}

spaceButton.addEventListener('click', () => {
    setNewBg(spaceBg);
    spaceButton.classList.add('true');
    pxlButton.classList.remove('true');

    params.remove("bg");
    updateUrl();
});
pxlButton.addEventListener('click', () => {
    setNewBg(pxlBg);
    spaceButton.classList.remove('true');
    pxlButton.classList.add('true');

    params.set("bg", "pxl");
    updateUrl();
});

function setNewBg(bg) {
    if (bgScript.src.includes(bg)) return;
    document.head.removeChild(bgScript);
    document.body.removeChild(document.getElementsByTagName('canvas')[0]);
    setBg(bg + "?" + crypto.randomUUID()); // force reload by making name unique
}

function setBg(bg) {
    bgScript = document.createElement("script");
    bgScript.type = "module"
    bgScript.src = bg;
    document.head.appendChild(bgScript)
}

/* Select activity*/

const reports = document.getElementsByClassName('report');
const activityReportSelect = document.getElementById("activityReportSelect");
activityReportSelect.addEventListener("change", (event) => {
    for (const report of reports) {
        report.classList.add("hidden");
    }
    reports[event.target.value].classList.remove("hidden")
})

// UTIL

function updateUrl() {
    const newRelativePathQuery = window.location.pathname + '?' + params.toString();
    history.pushState(null, '', newRelativePathQuery);
}