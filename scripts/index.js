const characterType = document.getElementById('type');
characterType.value = 'cat';
const caracAvailablePoints = document.querySelector('.caracAvailablePoints');
const factionInput = document.getElementById('faction');
const breedInput = document.getElementById('breed');

const gri = { "input": document.getElementById('gri'), "maxValueTd": document.getElementById('griMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const oei = { "input": document.getElementById('oei'), "maxValueTd": document.getElementById('oeiMaxValue'), "catMaxValue": 5, "bastetMaxValue": 4, "humanMaxValue": 4, "actualMaxValue": 5 };
const poi = { "input": document.getElementById('poi'), "maxValueTd": document.getElementById('poiMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const que = { "input": document.getElementById('que'), "maxValueTd": document.getElementById('queMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 4, "actualMaxValue": 5 };
const ron = { "input": document.getElementById('ron'), "maxValueTd": document.getElementById('ronMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const car = { "input": document.getElementById('car'), "maxValueTd": document.getElementById('carMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const vib = { "input": document.getElementById('vib'), "maxValueTd": document.getElementById('vibMaxValue'), "catMaxValue": 5, "bastetMaxValue": 4, "humanMaxValue": 3, "actualMaxValue": 5 };
const cou = { "input": document.getElementById('cou'), "maxValueTd": document.getElementById('couMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const cha = { "input": document.getElementById('cha'), "maxValueTd": document.getElementById('chaMaxValue'), "catMaxValue": 5, "bastetMaxValue": 4, "humanMaxValue": 5, "actualMaxValue": 3 };
const caracteristics = [gri, oei, poi, que, ron, car, vib, cou, cha];

async function displayPresentation() {
    const response = await fetch('./assets/data/data.json');
    const data = await response.json();
    displayFactions(data);
    displayBreed(data);
}

async function displayFactions(data) {
    const option = document.createElement("option");
    option.setAttribute("value", "");
    option.innerHTML = "- -";
    factionInput.appendChild(option);
    data.factions.forEach(e => {
        const option = document.createElement("option");
        option.setAttribute("value", e.name);
        option.innerHTML = e.name;
        factionInput.appendChild(option);
    })
}

async function displayBreed(data) {
    const option = document.createElement("option");
    option.setAttribute("value", "");
    option.innerHTML = "- -";
    breedInput.appendChild(option);
    data.breed.forEach(e => {
        const option = document.createElement("option");
        option.setAttribute("value", e.name);
        option.innerHTML = e.name;
        breedInput.appendChild(option);
    })
}

function checkInputIsValid(input, min, max) {
    console.log("value : ", input.value, " min : ", min, " max : ", max)
    if (input.value < min) { input.value = min; }
    if (input.value > max) { input.value = max; }
}

function updatecaracAvailablePoints() {
    let sum = 0;
    caracteristics.forEach(e => sum += Number(e.input.value));
    caracAvailablePoints.innerHTML = 28 - sum;
    if (caracAvailablePoints.innerHTML < 0) {
        caracAvailablePoints.classList.add("error");
        caracAvailablePoints.classList.remove("succes");
    } else if (caracAvailablePoints.innerHTML == 0) {
        caracAvailablePoints.classList.remove("error");
        caracAvailablePoints.classList.add("succes");
    }
    else {
        caracAvailablePoints.classList.remove("error");
        caracAvailablePoints.classList.remove("succes");
    }
}

function init() {
    caracteristics.forEach(e => {
        e.input.value = 1;
        e.maxValueTd.innerHTML = e.actualMaxValue;
    })
    updatecaracAvailablePoints();
    displayPresentation();
}

init();

characterType.addEventListener("change", () => {
    switch (characterType.value) {
        case 'cat':
            caracteristics.forEach(e => {
                e.maxValueTd.innerHTML = e.catMaxValue;
                e.actualMaxValue = e.catMaxValue;
                checkInputIsValid(e.input, 1, e.catMaxValue);
                updatecaracAvailablePoints();
            })
            break;
        case 'bastet':
            caracteristics.forEach(e => {
                e.maxValueTd.innerHTML = e.bastetMaxValue;
                e.actualMaxValue = e.bastetMaxValue;
                checkInputIsValid(e.input, 1, e.bastetMaxValue);
                updatecaracAvailablePoints();
            })
            break;

        case 'human':
            caracteristics.forEach(e => {
                e.maxValueTd.innerHTML = e.humanMaxValue;
                e.actualMaxValue = e.humanMaxValue;
                checkInputIsValid(e.input, 1, e.humanMaxValue);
                updatecaracAvailablePoints();
            })
            break;
    }
})

caracteristics.forEach(e => {
    e.input.addEventListener("blur", () => {
        checkInputIsValid(e.input, 1, e.actualMaxValue);
        updatecaracAvailablePoints();
    })
})
