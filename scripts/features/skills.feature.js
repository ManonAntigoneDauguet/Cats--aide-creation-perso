/************** NECESSARIES IMPORTS *************/
import { getSelectedDefauts, getSelectedQualities } from "../index.js";
import { checkInputIsValid, avertIrrelevantValue } from "../utils.js";
import { getCaractRate, getCaract } from "./characteristics.feature.js";
import { returnSkillCost, returnSkillGain } from "./qualitiesAndDefaults.feature.js";


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
    displaySkillValues(skillData);
}

function displayBaseTable(skillData, type) {
    skillsContainer.innerHTML = "";
    const filteredData = skillData.filter(e => e.types.includes(type));
    filteredData.forEach(e => {
        const skillContainer = document.createElement("tr");
        const content = `
            <th scope="row" id='title-skill-${e.id}'>${e.name}</th>
            <td>
                <input type="number" class='skillInput' ref=${e.id} id="skill-${e.id}" min="0" max="16" />
            </td>
            <td class='skillRateTd' ref=${e.id} id="rate-skill-${e.id}">
                ${type == 'cat' && e.id == 14 ? 1 : 0}
            </td>
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
            if (type === 'cat' && Number(e.getAttribute('ref')) === 14) {
                checkInputIsValid(e, 0, 8);
                avertIrrelevantValue(e);
                displaySkillRatesClimbingForCat(e);
            } else {
                checkInputIsValid(e, 0, 16);
                avertIrrelevantValue(e);
                updateSkillAvailablePoints();
                displaySkillRates(e);
            }
            displaySkillValues(skillData);
        });
    })
}

function setSkillsTotalPoint() {
    const ron = Number(getCaractRate('ron'));
    const car = Number(getCaractRate('car'));
    let totalPoints = (ron + car) * 3
    const cost = returnSkillCost();
    const gain = returnSkillGain();
    totalPoints -= cost;
    totalPoints += gain;
    skillsTotalPoints.innerHTML = totalPoints;
    if (totalPoints < 0) {
        skillsTotalPoints.classList.add("error");
    } else {
        skillsTotalPoints.classList.remove("error");
    }
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

function displaySkillRatesClimbingForCat(refInput) {
    const td = document.getElementById(`rate-${refInput.id}`);
    const points = Number(refInput.value);
    if (points == 0) { td.innerHTML = 1 }
    else if (points == 1) { td.innerHTML = 2 }
    else if (points < 4) { td.innerHTML = 3 }
    else if (points < 8) { td.innerHTML = 4 }
    else if (points < 16) { td.innerHTML = 5 }
}

function displaySkillFormula(e) {
    if (e.caract.length == 1) { return e.caract[0] }
    else if (e.caract.length == 2) {
        return `(${e.caract[0]} + ${e.caract[1]})/2`;
    }
}

function displaySkillValues(skillData) {
    skillsInputs = document.querySelectorAll('.skillInput');
    skillsInputs.forEach(e => {
        const ref = Number(e.getAttribute('ref'));
        const rateTd = document.getElementById(`rate-skill-${ref}`);
        const rate = Number(rateTd.textContent);

        const valueTd = document.getElementById(`value-skill-${ref}`);
        const data = skillData.find(skill => skill.id === ref);

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

        if (data.id === 12) {
            addDiscretionMalusAndBonus();
        } else if (data.id === 26) {
            addJumpMalusAndBonus();
        } else if (data.id === 24) {
            addHumanInteractionMalusAndBonus();
        }

        if (data.special && rate === 0) {
            valueTd.innerHTML = "🚫";
        }
    })
}

function addDiscretionMalusAndBonus() {
    const discretionValueTd = document.getElementById("value-skill-12");
    discretionValueTd.classList.remove('good');
    discretionValueTd.classList.remove('bad');

    let allDefaults = getSelectedDefauts();
    allDefaults.forEach(e => {
        if (e.id == 16) {
            let discretionValue = Number(discretionValueTd.textContent);
            discretionValueTd.innerHTML = discretionValue -= 1;
            discretionValueTd.classList.add('bad');
        }
    })

    let allQualities = getSelectedQualities();
    allQualities.forEach(e => {
        if (e.id == 10) {
            let discretionValue = Number(discretionValueTd.textContent);
            discretionValueTd.innerHTML = discretionValue += 1;
            discretionValueTd.classList.add('good');
        }
    })
}

function addJumpMalusAndBonus() {
    const jumpValueTd = document.getElementById("value-skill-26");
    jumpValueTd.classList.remove('good');
    jumpValueTd.classList.remove('bad');

    let allQualities = getSelectedQualities();
    allQualities.forEach(e => {
        if (e.id == 11) {
            let jumpValue = Number(jumpValueTd.textContent);
            jumpValueTd.innerHTML = jumpValue += 1;
            jumpValueTd.classList.add('good');
        }
    })
}

function addHumanInteractionMalusAndBonus() {
    const valueSeductionTd = document.getElementById('formula-skill-28');
    let spans = valueSeductionTd.querySelectorAll('span');
    spans.forEach(span => span.remove());

    let allDefaults = getSelectedDefauts();
    allDefaults.forEach(e => {
        let span = document.createElement('span');
        span.classList.add('coussinetMalus');
        valueSeductionTd.appendChild(span);

        if (e.id == 10) {
            const valueReclamerTd = document.getElementById("value-skill-24");
            valueReclamerTd.classList.remove('good');
            valueReclamerTd.classList.remove('bad');
            let value = Number(valueReclamerTd.textContent);
            valueReclamerTd.innerHTML = value -= 1;
            valueReclamerTd.classList.add('bad');

            span.textContent = "(-1 vis-à-vis des humains)";
        }
        if (e.id === 7) {
            span.textContent = "(-1 vis-à-vis des chats)";
        }

    })

    let allQualities = getSelectedQualities();
    allQualities.forEach(e => {
        let span = document.createElement('span');
        span.classList.add('coussinetBonus');
        valueSeductionTd.appendChild(span);

        if (e.id == 2) {
            span.textContent = "(+1 vis-à-vis des chats)";
        }
        if (e.id == 4) {
            span.textContent = "(+1 vis-à-vis des humains)";
        }
        if (e.id == 7) {
            span.textContent = "(+1 vis-à-vis du sexe opposé*)";
        }
    })
}

function addCatInteractionMalusAndBonus() {
    //
}

export { displaySkills, setSkillsTotalPoint, displaySkillValues, addDiscretionMalusAndBonus, addJumpMalusAndBonus, addCatInteractionMalusAndBonus, addHumanInteractionMalusAndBonus }