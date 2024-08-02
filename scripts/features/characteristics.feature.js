/************** NECESSARIES IMPORTS *************/
import { checkInputIsValid } from "../utils.js";
import { setSkillsTotalPoint, displaySkillValues } from "./skills.feature.js";


/************** DOM ELEMENTS ********************/
const gri = { "input": document.getElementById('gri'), "maxValueTd": document.getElementById('griMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const oei = { "input": document.getElementById('oei'), "maxValueTd": document.getElementById('oeiMaxValue'), "catMaxValue": 5, "bastetMaxValue": 4, "humanMaxValue": 4, "actualMaxValue": 5 };
const poi = { "input": document.getElementById('poi'), "maxValueTd": document.getElementById('poiMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const que = { "input": document.getElementById('que'), "maxValueTd": document.getElementById('queMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 4, "actualMaxValue": 5 };
const ron = { "input": document.getElementById('ron'), "maxValueTd": document.getElementById('ronMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const car = { "input": document.getElementById('car'), "maxValueTd": document.getElementById('carMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const vib = { "input": document.getElementById('vib'), "maxValueTd": document.getElementById('vibMaxValue'), "catMaxValue": 5, "bastetMaxValue": 4, "humanMaxValue": 3, "actualMaxValue": 5 };
const cou = { "input": document.getElementById('cou'), "maxValueTd": document.getElementById('couMaxValue'), "catMaxValue": 5, "bastetMaxValue": 5, "humanMaxValue": 5, "actualMaxValue": 5 };
const cha = { "input": document.getElementById('cha'), "maxValueTd": document.getElementById('chaMaxValue'), "catMaxValue": 5, "bastetMaxValue": 4, "humanMaxValue": 5, "actualMaxValue": 3 };
const characteristics = [gri, oei, poi, que, ron, car, vib, cou, cha];
const characTotalPoints = document.querySelector('.caracTotalPoints');
const characAvailablePoints = document.querySelector('.caracAvailablePoints');

/**
 * Add event listeners on caracteristics features at init
 */
function displayCharacteristics(skillData, type) {
    characteristics.forEach(e => {
        e.input.addEventListener("change", () => {
            checkInputIsValid(e.input, 1, e.actualMaxValue);
            updateCharacAvailablePoints();
            setSkillsTotalPoint();
            displaySkillValues(skillData, type);
        })
    })
    updateCharacAvailablePoints();
}

function setCharacTotalPoints(newTotal) {
    characTotalPoints.innerHTML = newTotal;
    updateCharacAvailablePoints();
    
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

function getCaract(caracShortName) {
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

export { characteristics, displayCharacteristics, setCharacTotalPoints, getCaract };