/************** NECESSARIES IMPORTS *************/
import { checkInputIsValid } from "../utils.js";
import { getCaract } from "./characteristics.feature.js";


/************** DOM ELEMENTS ********************/
const skillsContainer = document.querySelector('.skillsContainer');
const skillsTotalPoints = document.querySelector('.skillsTotalPoints');
const skillsAvailablePoints = document.querySelector('.skillsAvailablePoints');
let skillsInputs;
let skillsRateTd;
let skillValueTd;
let skillFormulaTd;


function displaySkills(skillData, type) {
    displayBaseTable(skillData, type);
    setSkillsTotalPoint();
    displaySkillValues(skillData, type);
}

function displayBaseTable(skillData, type) {
    skillsContainer.innerHTML = "";
    const filteredData = skillData.filter(e => e.types.includes(type));
    filteredData.forEach(e => {
        const skillContainer = document.createElement("tr");
        const content = `
            <th scope="row">${e.name}</th>
            <td>
                <input type="number" class='skillInput' ref=${e.id} id="skill-${e.id}" min="0" max="16" />
            </td>
            <td class='skillRateTd' ref=${e.id} id="rate-skill-${e.id}">0</td>
            <td class='skillFormulaTd' ref=${e.id} id="formula-skill-${e.id}">${displaySkillFormula(e)}</td>
            <td class='skillValueTd' ref=${e.id} id="value-skill-${e.id}"></td>
        `
        skillContainer.innerHTML = content;
        skillsContainer.appendChild(skillContainer)
    });

    skillFormulaTd = document.querySelectorAll('.skillFormulaTd');
    skillValueTd = document.querySelectorAll('.skillValueTd');
    skillsInputs = document.querySelectorAll('.skillInput');
    skillsInputs.forEach(e => {
        e.value = 0;
        e.addEventListener("change", () => {
            checkInputIsValid(e, 0, 16);
            avertIrrelevantValue(e);
            updateSkillAvailablePoints();
            displaySkillRates(e);
            displaySkillValues(skillData, type);
        });
    })
}

function setSkillsTotalPoint() {
    const ron = Number(getCaract('ron'));
    const car = Number(getCaract('car'));
    skillsTotalPoints.innerHTML = (ron + car) * 3;
    updateSkillAvailablePoints();
}

function updateSkillAvailablePoints() {
    let sum = 0;
    skillsInputs.forEach(e => sum += Number(e.value));
    skillsAvailablePoints.innerHTML = skillsTotalPoints.textContent - sum;
    if (skillsAvailablePoints.innerHTML < 0) {
        skillsAvailablePoints.classList.add("error");
        skillsAvailablePoints.classList.remove("succes");
    } else if (skillsAvailablePoints.innerHTML == 0) {
        skillsAvailablePoints.classList.remove("error");
        skillsAvailablePoints.classList.add("succes");
    }
    else {
        skillsAvailablePoints.classList.remove("error");
        skillsAvailablePoints.classList.remove("succes");
    }
}

function displaySkillRates(refInput) {
    const td = document.getElementById(`rate-${refInput.id}`);
    const points = Number(refInput.value);
    if (points == 0) { td.innerHTML = 0 }
    else if (points == 1) { td.innerHTML = 1 }
    else if (points < 4) { td.innerHTML = 2 }
    else if (points < 8) { td.innerHTML = 3 }
    else if (points < 16) { td.innerHTML = 4 }
    else if (points == 16) { td.innerHTML = 5 }
}

function displaySkillFormula(e) {
    if (e.caract.length == 1) { return e.caract[0] }
    else if (e.caract.length == 2) {
        return `(${e.caract[0]} + ${e.caract[1]})/2`;
    }
}

function displaySkillValues(skillData, type) {
    const filteredData = skillData.filter(e => e.types.includes(type));
    skillsInputs = document.querySelectorAll('.skillInput');
    skillsInputs.forEach(e => {
        const ref = Number(e.getAttribute('ref'));
        const rateTd = document.getElementById(`rate-skill-${ref}`);
        const rate = Number(rateTd.textContent);

        const valueTd = document.getElementById(`value-skill-${ref}`);
        const data = filteredData.find(e => e.id === ref);

        if (data.caract.length == 1) {
            const resultFormula = Number(getCaract(data.caract[0]));
            const value = rate + resultFormula;
            valueTd.innerHTML = value;
        } else if (data.caract.length == 2) {
            const caract1 = Number(getCaract(data.caract[0]));
            const caract2 = Number(getCaract(data.caract[1]));
            const resultFormula = Math.floor((caract1 + caract2) / 2);
            const value = rate + resultFormula;
            valueTd.innerHTML = value;
        }
    })
}

function avertIrrelevantValue(input) {
    const scales = [0, 1, 2, 4, 8, 16];
    if (!scales.includes(Number(input.value))) {
        input.classList.add('irrelevant');
    } else {
        input.classList.remove('irrelevant');
    }
}


export { displaySkills, setSkillsTotalPoint, displaySkillValues }