/************** NECESSARIES IMPORTS *************/
import { displayOptions } from "../utils.js";
import { getAllDefaultsSelected, getAllQualitiesSelected } from "../index.js";

/************** DOM ELEMENTS ********************/
const qualitiesDiv = document.querySelector('.qualities');
const defaultsDiv = document.querySelector('.defaults');

/**
 * 
 * @param { Object } data as completes data with qualities and defaults
 * @param { String } breed as the selected breed
 * @param { String } type as the selected type
 */
function displayQualitiesAndDefaults(data, breed, type) {
    displayQualities(data, breed, type);
    displayDefaults(data, breed, type);
}

function displayQualities(data, breed, type) {
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

        const selectedOption = document.createElement('span');
        choiceQualityEvent(choiceInput, selectedOption);
        choice.appendChild(selectedOption);
        qualitiesDiv.appendChild(choice);
    }
}

function displayDefaults(data, breed, type) {
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
        choiceDefaultEvent(choiceInput, selectedOption);
        choice.appendChild(selectedOption);
        defaultsDiv.appendChild(choice);
    }
}


function choiceQualityEvent(input, span) {
    input.addEventListener("change", (e) => {
        span.classList.add("qualitySelected");
        span.innerHTML = e.target.value,
        getAllQualitiesSelected();
    });
}

function choiceDefaultEvent(input, span) {
    input.addEventListener("change", (e) => {
        span.classList.add("defaultSelected");
        span.innerHTML = e.target.value;
        getAllDefaultsSelected();
    });
}




export { displayQualitiesAndDefaults };