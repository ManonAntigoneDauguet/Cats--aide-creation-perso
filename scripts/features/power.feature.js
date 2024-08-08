/************** NECESSARIES IMPORTS *************/

import { avertIrrelevantValue, checkInputIsValid } from "../utils.js";
import { getCaract } from "./characteristics.feature.js";


/************** DOM ELEMENTS ********************/
const powerContainer = document.querySelector('.powerContainer');
const powerTotalPoints = document.querySelector('.powerTotalPoints');
const powerAvailablePoints = document.querySelector('.powerAvailablePoints');

let type;

function displayPower(powerData, newType) {
    type = newType;
    displayPowerBaseTable(powerData);
    setPowerTotalPoints();
}

function displayPowerBaseTable(powerData) {
    powerContainer.innerHTML = '';
    powerData.forEach(e => {
        const content = `
            <tr>
                <th scope="row">${e.name}</th>
                <td>
                    <input type="number" class='powerInput' id="power-${e.id}" min="0" max="16" />
                </td>
                <td class='powerRateTd' id="rate-power-${e.id}">
                    ${type == 'cat' && e.id == 14 ? 1 : 0}
                </td>
                <td class='powerMaxValueTd' id="max-power-${e.id}">
                    ${returnPowerMaxValue(e)}
                </td>
            </tr>
        `
        powerContainer.innerHTML += content;

        const powerInputs = document.querySelectorAll('.powerInput');
        powerInputs.forEach(e => {
            e.addEventListener("change", () => {
                checkInputIsValid(e, 0, 16);
                avertIrrelevantValue(e);
                updatePowerAvailablePoints();
                displayPowerRates(e);
            })
        })
    });
    updatePowerAvailablePoints();
}

function setPowerTotalPoints() {
    const vib = Number(getCaract('vib'));
    switch (vib) {
        case 1: powerTotalPoints.innerHTML = 2; break;
        case 2: powerTotalPoints.innerHTML = 4; break;
        case 3: powerTotalPoints.innerHTML = 8; break;
        case 4: powerTotalPoints.innerHTML = 16; break;
        case 5: powerTotalPoints.innerHTML = 24; break;
    }
    updatePowerAvailablePoints();
}

function updatePowerAvailablePoints() {
    let sum = 0;
    const powerInputs = document.querySelectorAll('.powerInput');
    powerInputs.forEach(e => sum += Number(e.value));
    powerAvailablePoints.innerHTML = powerTotalPoints.textContent - sum;
    if (powerAvailablePoints.innerHTML < 0) {
        powerAvailablePoints.classList.add("error");
        powerAvailablePoints.classList.remove("succes");
    } else if (powerAvailablePoints.innerHTML == 0) {
        powerAvailablePoints.classList.remove("error");
        powerAvailablePoints.classList.add("succes");
    }
    else {
        powerAvailablePoints.classList.remove("error");
        powerAvailablePoints.classList.remove("succes");
    }
}

function displayPowerRates(refInput) {
    const td = document.getElementById(`rate-${refInput.id}`);
    const points = Number(refInput.value);
    if (points == 0) { td.innerHTML = 0 }
    else if (points == 1) { td.innerHTML = 1 }
    else if (points < 4) { td.innerHTML = 2 }
    else if (points < 8) { td.innerHTML = 3 }
    else if (points < 16) { td.innerHTML = 4 }
    else if (points == 16) { td.innerHTML = 5 }

    const maxValueTd = document.getElementById(`max-${refInput.id}`);
    if(Number(td.textContent) > Number(maxValueTd.textContent)) {
        td.classList.add('error');
    } else {
        td.classList.remove('error');
    }
}

function returnPowerMaxValue(e) {
    if (type == 'cat') {
        return e.catMax;
    } else if (type == 'bastet') {
        return e.bastetMax;
    } else if (type == 'human') {
        return e.humanMax;
    }
}

export { displayPower, setPowerTotalPoints }