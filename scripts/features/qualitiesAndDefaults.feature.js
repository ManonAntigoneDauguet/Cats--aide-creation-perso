/************** NECESSARIES IMPORTS *************/
import { displayOptions } from "../utils.js";

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
    displayQualities(data, breed, type)
    displayDefaults(data, breed, type)
}

function displayQualities(data, breed, type) {
    qualitiesDiv.innerHTML = "Qualités :";
    breed.qualities.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = e;
        qualitiesDiv.appendChild(li);
    })
    for (let i = breed.qualities.length; i < 2; i++) {
        const choice = document.createElement('li');
        const choiceInput = document.createElement('select');
        const filteredData = data.qualities.filter(e => e.types.includes(type));
        displayOptions(filteredData, choiceInput);
        choice.appendChild(choiceInput);
        qualitiesDiv.appendChild(choice);
    }
}

function displayDefaults(data, breed, type) {
    defaultsDiv.innerHTML = "Défauts :";
    breed.defaults.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = e;
        defaultsDiv.appendChild(li);
    })
    for (let i = breed.defaults.length; i < 3; i++) {
        const choice = document.createElement('li');
        const choiceInput = document.createElement('select');
        const filteredData = data.defaults.filter(e => e.types.includes(type));
        displayOptions(filteredData, choiceInput);
        choice.appendChild(choiceInput);
        defaultsDiv.appendChild(choice);
    }
}

export { displayQualitiesAndDefaults };