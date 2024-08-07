/************** NECESSARIES IMPORTS *************/
import { checkInputIsValid, toUppercaseFirstCharacter } from "./utils.js";
import { displayCharacteristics, characteristics, setCharacTotalPoints, displayCharactValue, addPOILMalusAndBonus } from "./features/characteristics.feature.js";
import { displayPresentation } from "./features/presentation.feature.js";
import { displayQualitiesAndDefaults } from "./features/qualitiesAndDefaults.feature.js";
import { displaySkills, setSkillsTotalPoint } from "./features/skills.feature.js";



/************** DOM ELEMENTS ********************/
const characterType = document.getElementById('type');
characterType.value = 'cat';
const breedInput = document.getElementById('breed');
const recapQualities = document.querySelector('.recapQualitiesAndDefaults--recapQualities');
const recapDefaults = document.querySelector('.recapQualitiesAndDefaults--recapDefaults');


async function getData() {
    const response = await fetch('./assets/data/data.json');
    data = await response.json();
}

async function getSkillData() {
    const response = await fetch('./assets/data/skills.json');
    skillData = await response.json();
}

function getCat(breed) {
    const cat = data.breed.find(e => e.name == breed);
    if (!cat) {
        return data.breed.find(e => e.name == 'autre...');
    }
    return cat;
}

async function init() {
    await getData();
    await getSkillData();
    characteristics.forEach(e => {
        e.input.value = 1;
        e.maxValueTd.innerHTML = e.actualMaxValue;
    })
    displayCharacteristics(skillData, characterType.value);
    displayPresentation(data);
    displayQualitiesAndDefaults(data, getCat(breedInput.value), characterType.value, skillData);
    displaySkills(skillData, characterType.value);
}


/******************* PAGE CREATION ******************/
let data;
let skillData;

init();

characterType.addEventListener("change", () => {
    // displayCharacteristics(skillData, characterType.value);
    switch (characterType.value) {
        case 'cat':
            characteristics.forEach(e => {
                e.maxValueTd.innerHTML = e.catMaxValue;
                e.actualMaxValue = e.catMaxValue;
                checkInputIsValid(e.input, 1, e.catMaxValue);
                setCharacTotalPoints(28);
            })
            breedInput.removeAttribute('disabled', '');
            break;
        case 'bastet':
            characteristics.forEach(e => {
                e.maxValueTd.innerHTML = e.bastetMaxValue;
                e.actualMaxValue = e.bastetMaxValue;
                checkInputIsValid(e.input, 1, e.bastetMaxValue);
                setCharacTotalPoints(26);
            })
            breedInput.setAttribute('disabled', '');
            breedInput.value = '';
            recapDefaults.innerHTML = "";
            recapQualities.innerHTML = "";
            break;

        case 'human':
            characteristics.forEach(e => {
                e.maxValueTd.innerHTML = e.humanMaxValue;
                e.actualMaxValue = e.humanMaxValue;
                checkInputIsValid(e.input, 1, e.humanMaxValue);
                setCharacTotalPoints(24);
            })
            breedInput.setAttribute('disabled', '');
            breedInput.value = '';
            recapDefaults.innerHTML = "";
            recapQualities.innerHTML = "";
            break;
    }
    displayQualitiesAndDefaults(data, getCat(breedInput.value), characterType.value, skillData);
    displaySkills(skillData, characterType.value);
    displayCharactValue();
})

breedInput.addEventListener("change", () => {
    setCharacTotalPoints(28);
    displayCharactValue();
    displayQualitiesAndDefaults(data, getCat(breedInput.value), characterType.value, skillData);
    displayQualitiesSelected();
    displayDefaultsSelected();
    setSkillsTotalPoint();
    if (breedInput.value === 'ragdoll') { addPOILMalusAndBonus(); }
})



function displayQualitiesSelected() {
    recapQualities.innerHTML = "";
    const all = document.querySelectorAll('.qualitySelected');
    all.forEach((selectedDOM) => {
        const selectedOption = data.qualities.find(d => d.name === selectedDOM.textContent);
        if (selectedOption) {
            const description = document.createElement('p');
            const content = `
                <em>${toUppercaseFirstCharacter(selectedOption.name)}</em> : 
                ${selectedOption.description}<br>
                <span class='bad'>Vous coûte ${selectedOption.cost} points de compétence.</span>
            `;
            description.innerHTML = content;
            recapQualities.appendChild(description);
        }
    })
}

function displayDefaultsSelected() {
    recapDefaults.innerHTML = "";
    const all = document.querySelectorAll('.defaultSelected');
    all.forEach((selectedDOM) => {
        let selectedOption = data.defaults.find(d => d.name === selectedDOM.textContent);
        if (selectedDOM.textContent === "score de Poil <= 2") {
            selectedOption = {'id': 50, 'name': "score de Poil <= 2", 'types' : ['cat'], 'description': 'Votre score de POIL ne peux pas dépasser 2.', 'gain': 0};
        };
        if (selectedOption) {
            const description = document.createElement('p');
            const content = `
                <em>${toUppercaseFirstCharacter(selectedOption.name)}</em> : 
                ${selectedOption.description}<br>
                <span class='good'>Vous offre ${selectedOption.gain} points de compétence.</span>
            `;
            description.innerHTML = content;
            recapDefaults.appendChild(description);
        }
    })
}

function getSelectedDefauts() {
    const list = [];
    const all = document.querySelectorAll('.defaultSelected');
    all.forEach((selectedDOM) => {
        if (selectedDOM.textContent === "score de Poil <= 2") {
            let obj = {'id': 50, 'name': "score de Poil <= 2", 'types' : ['cat'], 'description': 'Votre score de POIL ne peux pas dépasser 2', 'gain': 0};
            list.push(obj);
        };
        const selectedOption = data.defaults.find(d => d.name === selectedDOM.textContent);
        if (selectedOption) {
            list.push(selectedOption);
        }
    })
    return list;
}

function getSelectedQualities() {
    const list = [];
    const all = document.querySelectorAll('.qualitySelected');
    all.forEach((selectedDOM) => {
        const selectedOption = data.qualities.find(d => d.name === selectedDOM.textContent);
        if (selectedOption) {
            list.push(selectedOption);
        }
    })
    return list;
}



export { displayDefaultsSelected, displayQualitiesSelected, getSelectedDefauts, getSelectedQualities }