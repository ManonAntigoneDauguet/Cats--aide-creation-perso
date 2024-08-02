/************** NECESSARIES IMPORTS *************/
import { checkInputIsValid } from "./utils.js";
import { displayCharacteristics, characteristics, setCharacTotalPoints } from "./features/characteristics.feature.js";
import { displayPresentation } from "./features/presentation.feature.js";
import { displayQualitiesAndDefaults } from "./features/qualitiesAndDefaults.feature.js";



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

function getCat(breed) {
    const cat = data.breed.find(e => e.name == breed);
    if (!cat) {
        return data.breed.find(e => e.name == 'autre...');
    }
    return cat;
}

async function init() {
    await getData();
    characteristics.forEach(e => {
        e.input.value = 1;
        e.maxValueTd.innerHTML = e.actualMaxValue;
    })
    displayCharacteristics();
    displayPresentation(data);
    displayQualitiesAndDefaults(data, getCat(breedInput.value), characterType.value);
    getAllQualitiesSelected();
    getAllDefaultsSelected();
}


/******************* PAGE CREATION ******************/
let data;

init();

characterType.addEventListener("change", () => {
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
            break;
    }
    displayQualitiesAndDefaults(data, getCat(breedInput.value), characterType.value);
})

breedInput.addEventListener("change", () => {
    displayQualitiesAndDefaults(data, getCat(breedInput.value), characterType.value);
    getAllQualitiesSelected();
    getAllDefaultsSelected();
})



function getAllQualitiesSelected() {
    recapQualities.innerHTML = "";
    const all = document.querySelectorAll('.qualitySelected');
    all.forEach((selectedDOM) => {
        const selectedOption = data.qualities.find(d => d.name === selectedDOM.textContent);
        const description = document.createElement('p');
        description.innerHTML = selectedOption.description;
        recapQualities.appendChild(description);
    })
}

function getAllDefaultsSelected() {
    recapDefaults.innerHTML = "";
    const all = document.querySelectorAll('.defaultSelected');
    all.forEach((selectedDOM) => {
        const selectedOption = data.defaults.find(d => d.name === selectedDOM.textContent);
        const description = document.createElement('p');
        description.innerHTML = selectedOption.description;
        recapDefaults.appendChild(description);
    })
}

export { getAllDefaultsSelected, getAllQualitiesSelected }