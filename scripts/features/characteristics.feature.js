/************** NECESSARIES IMPORTS *************/
import { checkInputIsValid } from "../utils.js";
import { setSkillsTotalPoint, displaySkillValues } from "./skills.feature.js";
import { getSelectedDefauts, getSelectedQualities } from "../index.js";
import { displayDetailsHitLevel } from "./hitLevel.feature.js";
import { setPowerTotalPoints } from "./power.feature.js";


/************** DOM ELEMENTS ********************/
const gri = { "input": document.getElementById('gri'), "valueTd": document.getElementById('griValue'), "maxValueTd": document.getElementById('griMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const oei = { "input": document.getElementById('oei'), "valueTd": document.getElementById('oeiValue'), "maxValueTd": document.getElementById('oeiMaxValue'), "catMaxValue": 5, "bastetMaxValue": 4, "humanMaxValue": 4, "actualMaxValue": 5 };
const poi = { "input": document.getElementById('poi'), "valueTd": document.getElementById('poiValue'), "maxValueTd": document.getElementById('poiMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const que = { "input": document.getElementById('que'), "valueTd": document.getElementById('queValue'), "maxValueTd": document.getElementById('queMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 4, "actualMaxValue": 5 };
const ron = { "input": document.getElementById('ron'), "valueTd": document.getElementById('ronValue'), "maxValueTd": document.getElementById('ronMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const car = { "input": document.getElementById('car'), "valueTd": document.getElementById('carValue'), "maxValueTd": document.getElementById('carMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const vib = { "input": document.getElementById('vib'), "valueTd": document.getElementById('vibValue'), "maxValueTd": document.getElementById('vibMaxValue'), "catMaxValue": 5, "bastetMaxValue": 4, "humanMaxValue": 3, "actualMaxValue": 5 };
const cou = { "input": document.getElementById('cou'), "valueTd": document.getElementById('couValue'), "maxValueTd": document.getElementById('couMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const cha = { "input": document.getElementById('cha'), "valueTd": document.getElementById('chaValue'), "maxValueTd": document.getElementById('chaMaxValue'), "catMaxValue": 5, "bastetMaxValue": 4, "humanMaxValue": 5, "actualMaxValue": 3 };
const characteristics = [gri, oei, poi, que, ron, car, vib, cou, cha];
const characTotalPoints = document.querySelector('.caracTotalPoints');
const characAvailablePoints = document.querySelector('.caracAvailablePoints');

/**
 * Add event listeners on caracteristics features at init
 */
function displayCharacteristics(skillData) {
    displayCharactValue();
    characteristics.forEach(e => {
        e.input.addEventListener("change", () => {
            checkInputIsValid(e.input, 1, e.actualMaxValue);
            updateCharacAvailablePoints();
            setSkillsTotalPoint();
            displayCharactValue();
            displaySkillValues(skillData);
            setPowerTotalPoints();
            displayDetailsHitLevel();
        })
    })
    updateCharacAvailablePoints();
}

function setCharacTotalPoints(newTotal) {
    characTotalPoints.innerHTML = newTotal;
    updateCharacAvailablePoints();
    characteristics[2].actualMaxValue = characteristics[2].catMaxValue;
    document.getElementById("poiMaxValue").innerHTML = characteristics[2].catMaxValue;
}

function updateCharacAvailablePoints() {
    let sum = 0;
    characteristics.forEach(e => sum += Number(e.input.value));
    characAvailablePoints.innerHTML = characTotalPoints.textContent - sum;
    if (characAvailablePoints.innerHTML < 0) {
        characAvailablePoints.classList.add("error");
        characAvailablePoints.classList.remove("succes");
    } else if (characAvailablePoints.innerHTML == 0) {
        characAvailablePoints.classList.remove("error");
        characAvailablePoints.classList.add("succes");
    }
    else {
        characAvailablePoints.classList.remove("error");
        characAvailablePoints.classList.remove("succes");
    }
}

function getCaractRate(caracShortName) {
    switch (caracShortName) {
        case 'oei': return oei.input.value;
        case 'gri': return gri.input.value;
        case 'poi': return poi.input.value;
        case 'que': return que.input.value;
        case 'ron': return ron.input.value;
        case 'car': return car.input.value;
        case 'vib': return vib.input.value;
        case 'cou': return cou.input.value;
        case 'cha': return cha.input.value;
    }
}

function getCaract(caracShortName) {
    switch (caracShortName) {
        case 'oei': return oei.valueTd.textContent;
        case 'gri': return gri.valueTd.textContent;
        case 'poi': return poi.valueTd.textContent;
        case 'que': return que.valueTd.textContent;
        case 'ron': return ron.valueTd.textContent;
        case 'car': return car.valueTd.textContent;
        case 'vib': return vib.valueTd.textContent;
        case 'cou': return cou.valueTd.textContent;
        case 'cha': return cha.valueTd.textContent;
    }
}

function displayCharactValue() {
    characteristics.forEach(e => {
        e.valueTd.innerHTML = e.input.value;
        switch (e.input.id) {
            case 'poi': addPOILMalusAndBonus(); break;
            case 'oei': addOEILMalusAndBonus(); break;
            case 'que': addQUEUEMalusAndBonus(); break;
            case 'cou': addCOUSSINETLMalusAndBonus(); break;
            case 'car': addCARESSEMalusAndBonus(); break;
        }
        if (Number(e.valueTd.textContent) > e.actualMaxValue || Number(e.valueTd.textContent) <= 0) {
            e.valueTd.classList.add('error');
        } else {
            e.valueTd.classList.remove('error');
        }
    })
}

function addPOILMalusAndBonus() {
    const valueTd = document.getElementById("poiValue");
    valueTd.removeAttribute("class")
    const maxValueTd = document.getElementById("poiMaxValue");
    maxValueTd.removeAttribute("class")

    let allDefaults = getSelectedDefauts();
    allDefaults.forEach(e => {
        if (e.id === 50) {
            maxValueTd.classList.add('bad');
            characteristics[2].actualMaxValue = 2;
            checkInputIsValid(characteristics[2].input, 1, 2);
            maxValueTd.innerHTML = 2;
        }
    })

    let allQualities = getSelectedQualities();
    allQualities.forEach(e => {
        if (e.id == 3) {
            let value = Number(valueTd.textContent);
            valueTd.innerHTML = value += 1;
            valueTd.classList.add('good');
        }
    })

    displayDetailsHitLevel();
}

function addCOUSSINETLMalusAndBonus() {
    const valueTd = document.getElementById("couValue");
    valueTd.removeAttribute("class");

    let allDefaults = getSelectedDefauts();
    allDefaults.forEach(e => {
        if (e.id === 14) {
            let value = Number(valueTd.textContent);
            valueTd.innerHTML = value -= 1;
            valueTd.classList.add('bad');
        }
        if (e.id === 5) {
            let value = Number(valueTd.textContent);
            valueTd.innerHTML = value -= 1;
            valueTd.classList.add('bad');
        }
        if (e.id === 7) {
            valueTd.classList.add('coussinetMalus__7')
        }
        if (e.id === 10) {
            valueTd.classList.add('coussinetMalus__10')
        }
    })

    let allQualities = getSelectedQualities();
    allQualities.forEach(e => {
        if (e.id == 2) {
            valueTd.classList.add('coussinetBonus__2')
        }
        if (e.id == 4) {
            valueTd.classList.add('coussinetBonus__4')
        }
        if (e.id == 7) {
            valueTd.classList.add('coussinetBonus__7')
        }
    })
}

function addQUEUEMalusAndBonus() {
    const valueTd = document.getElementById("queValue");
    valueTd.removeAttribute("class");

    let allQualities = getSelectedQualities();
    allQualities.forEach(e => {
        if (e.id == 14) {
            let value = Number(valueTd.textContent);
            valueTd.innerHTML = value += 1;
            valueTd.classList.add('good');
        }
    })

    let allDefaults = getSelectedDefauts();
    allDefaults.forEach(e => {
        if (e.id === 2) {

            let value = Number(valueTd.textContent);
            valueTd.innerHTML = value -= 1;
            valueTd.classList.add('bad');
        }
    })
}

function addCARESSEMalusAndBonus() {
    const valueTd = document.getElementById("queValue");
    valueTd.removeAttribute("class")

    let allQualities = getSelectedQualities();
    allQualities.forEach(e => {
        if (e.id == 13) {
            let value = Number(valueTd.textContent);
            valueTd.innerHTML = value += 1;
            valueTd.classList.add('good');
        }
    })
}

function addOEILMalusAndBonus() {
    const valueTd = document.getElementById("oeiValue");
    valueTd.removeAttribute("class")

    let allQualities = getSelectedQualities();
    allQualities.forEach(e => {
        if (e.id == 1) {
            let value = Number(valueTd.textContent);
            valueTd.innerHTML = value += 1;
            valueTd.classList.add('good');
        }
    })
}

export { characteristics, displayCharacteristics, setCharacTotalPoints, getCaractRate, getCaract, displayCharactValue, addPOILMalusAndBonus };