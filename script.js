/* toggle portfolio */
const main = document.getElementById("main");
const body = document.getElementsByTagName("body")[0];
body.addEventListener("dblclick", () => {
    main.style.visibility = main.style.visibility == "hidden" ? "" : "hidden";
});

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