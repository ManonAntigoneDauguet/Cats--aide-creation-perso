/************** NECESSARIES IMPORTS *************/
import { getCaract } from "./characteristics.feature.js";


/************** DOM ELEMENTS ********************/
const hitLevelContainer = document.querySelector('.hitLevelContainer');


let type;

function displayHitLevel(newType) {
    type = newType;
    displayDetailsHitLevel();
}

function displayDetailsHitLevel() {
    if (type == 'cat') { displayCatDetailsHitLevel(); }
    else { displayHumanDetailsHitLevel(); }
}

function displayCatDetailsHitLevel() {
    hitLevelContainer.innerHTML = '';
    const poilValue = getCaract('poi');
    for (let i = 1; i <= poilValue; i++) {
        const content = `
            <tr>
                <td>${i}${i == 1 ? 'er' : 'e'} niveau</td>
                <td>Malus de -${i} aux jets</td>
            </tr>
        `
        hitLevelContainer.innerHTML += content;
    }
}

function displayHumanDetailsHitLevel() {
    hitLevelContainer.innerHTML = '';
    let poilValue = getCaract('poi');
    poilValue = Number(poilValue);
    let i, j;
    for (i = 1, j = 1; i <= poilValue + 5; i++, j++) {
        const content = `
            <tr>
                <td>
                ${i}${i == 1 ? 'er' : 'e'}
                ${i + 1 <= poilValue + 5 ? `et ${i + 1}e niveaux` : 'niveau'}
                </td>
                <td>Malus de -${j} aux jets</td>
            </tr>
        `
        hitLevelContainer.innerHTML += content;
        i++;
    }
}

export { displayHitLevel, displayDetailsHitLevel }