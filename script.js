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
let bgScript;

setBg(spaceBg);

const spaceButton = document.getElementById("spaceButton");
const pxlButton = document.getElementById("pxlButton");
spaceButton.addEventListener('click', () => {
    setNewBg(spaceBg);
    spaceButton.classList.add('true');
    pxlButton.classList.remove('true');
});
pxlButton.addEventListener('click', () => {
    setNewBg(pxlBg);
    spaceButton.classList.remove('true');
    pxlButton.classList.add('true');
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

/* Radio button event */

const radioButtons = document.querySelectorAll("input[name='selection']");
radioButtons.forEach(el => el.addEventListener('change', () => selectionChanged()));


// Selection changed
const reports = document.getElementsByClassName('report');
function selectionChanged() {
    let report;
    radioButtons.forEach(el => {
        report = reports[el.value];
        if (el.checked) {
            el.parentNode.classList.add('selected')
            report.classList.remove('hidden')
        } else {
            el.parentNode.classList.remove('selected');
            report.classList.add('hidden')
        }
    });
}