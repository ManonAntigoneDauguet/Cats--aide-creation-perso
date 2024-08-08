/************** NECESSARIES IMPORTS *************/
import { displayOptions } from "../utils.js";

/************** DOM ELEMENTS ********************/
const factionInput = document.getElementById('faction');
const breedInput = document.getElementById('breed');


/**
 * Display informations about presentation features at init
 * @param { Object } data as completes data with breed and factions
 */
function displayPresentation(data) {
    displayFactions(data);
    displayBreed(data);
}

async function displayFactions(data) {
    displayOptions(data.factions, factionInput, "faction");
}

async function displayBreed(data) {
    displayOptions(data.breed, breedInput, "breed");
}

function setReputation(qualityName) {
    const reputationSpan = document.getElementById('reputation');
    if (qualityName === 'réputation de matou') {
        reputationSpan.innerHTML = '1 à 4 selon résultat du dé'
    } else {
        reputationSpan.innerHTML = 0;
    }
}

export { displayPresentation, setReputation };