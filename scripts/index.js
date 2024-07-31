/************** NECESSARIES IMPORTS *************/
import { checkInputIsValid, displayOptions } from "./utils.js";
import { displayCharacteristics, characteristics, updateCharacAvailablePoints } from "./features/characteristics.feature.js";
import { displayPresentation } from "./features/presentation.feature.js";
import { displayQualitiesAndDefaults } from "./features/qualitiesAndDefaults.feature.js";



/************** DOM ELEMENTS ********************/
const characterType = document.getElementById('type');
characterType.value = 'cat';
const breedInput = document.getElementById('breed');



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
                updateCharacAvailablePoints();
            })
            breedInput.removeAttribute('disabled', '');
            break;
        case 'bastet':
            characteristics.forEach(e => {
                e.maxValueTd.innerHTML = e.bastetMaxValue;
                e.actualMaxValue = e.bastetMaxValue;
                checkInputIsValid(e.input, 1, e.bastetMaxValue);
                updateCharacAvailablePoints();
            })
            breedInput.setAttribute('disabled', '');
            breedInput.value = '';
            break;

        case 'human':
            characteristics.forEach(e => {
                e.maxValueTd.innerHTML = e.humanMaxValue;
                e.actualMaxValue = e.humanMaxValue;
                checkInputIsValid(e.input, 1, e.humanMaxValue);
                updateCharacAvailablePoints();
            })
            breedInput.setAttribute('disabled', '');
            breedInput.value = '';
            break;
    }
    displayQualitiesAndDefaults(data, getCat(breedInput.value), characterType.value);
})

breedInput.addEventListener("change", () => {
    displayQualitiesAndDefaults(data, getCat(breedInput.value), characterType.value);
})
