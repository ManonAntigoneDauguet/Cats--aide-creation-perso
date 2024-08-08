/************** NECESSARIES IMPORTS *************/
import { displayOptions } from "../utils.js";
import { displayDefaultsSelected, displayQualitiesSelected, getSelectedDefauts, getSelectedQualities } from "../index.js";
import { displaySkillValues, setSkillsTotalPoint } from "./skills.feature.js";
import { displayCharactValue } from "./characteristics.feature.js";
import { setReputation } from "./presentation.feature.js";

/************** DOM ELEMENTS ********************/
const qualitiesDiv = document.querySelector('.qualities');
const defaultsDiv = document.querySelector('.defaults');

/**
 * 
 * @param { Object } data as completes data with qualities and defaults
 * @param { String } breed as the selected breed
 * @param { String } type as the selected type
 */
function displayQualitiesAndDefaults(data, breed, type, skillData) {
    displayQualities(data, breed, type, skillData);
    displayDefaults(data, breed, type, skillData);
}

function displayQualities(data, breed, type, skillData) {
    qualitiesDiv.innerHTML = "Qualités :";
    breed.qualities.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = e;
        li.classList.add("qualitySelected");
        qualitiesDiv.appendChild(li);
    })
    for (let i = breed.qualities.length; i < 2; i++) {
        const choice = document.createElement('li');
        const choiceInput = document.createElement('select');
        const filteredData = data.qualities.filter(e => e.types.includes(type));
        displayOptions(filteredData, choiceInput, "quality");
        choice.appendChild(choiceInput);

        const selectedOption = document.createElement('span', type, skillData);
        choiceQualityEvent(choiceInput, selectedOption, type, skillData);
        choice.appendChild(selectedOption);
        qualitiesDiv.appendChild(choice);
    }
}

function displayDefaults(data, breed, type, skillData) {
    defaultsDiv.innerHTML = "Défauts :";
    breed.defaults.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = e;
        li.classList.add("defaultSelected");
        defaultsDiv.appendChild(li);
    })
    for (let i = breed.defaults.length; i < 3; i++) {
        const choice = document.createElement('li');
        const choiceInput = document.createElement('select');
        const filteredData = data.defaults.filter(e => e.types.includes(type));
        displayOptions(filteredData, choiceInput, "default");
        choice.appendChild(choiceInput);

        const selectedOption = document.createElement('span');
        choiceDefaultEvent(choiceInput, selectedOption, type, skillData);
        choice.appendChild(selectedOption);
        defaultsDiv.appendChild(choice);
    }
}

function returnSkillGain() {
    const all = getSelectedDefauts()
    let gain = 0;
    all.forEach(e => {
        gain += e.gain;
    }) 
    return gain;
}

function returnSkillCost() {
    const all = getSelectedQualities()
    let cost = 0;
    all.forEach(e => {
        cost += e.cost;
    }) 
    return cost;
}

function choiceQualityEvent(input, span, type, skillData) {
    input.addEventListener("change", (e) => {
        span.classList.add("qualitySelected");
        span.innerHTML = e.target.value,
        displayCharactValue();
        displayQualitiesSelected();
        setSkillsTotalPoint();
        displaySkillValues(skillData, type);
        setReputation(e.target.value);
    });
}

function choiceDefaultEvent(input, span, type, skillData) {
    input.addEventListener("change", (e) => {
        span.classList.add("defaultSelected");
        span.innerHTML = e.target.value;
        displayCharactValue();
        displayDefaultsSelected();
        setSkillsTotalPoint();
        displaySkillValues(skillData, type);
    });
}




export { displayQualitiesAndDefaults, returnSkillCost, returnSkillGain };