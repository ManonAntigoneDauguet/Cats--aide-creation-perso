/************** NECESSARIES IMPORTS *************/
import { checkInputIsValid } from "../utils.js";

/************** DOM ELEMENTS ********************/
const skillsContainer = document.querySelector('.skillsContainer');


function displaySkills(skillData, type) {
    skillsContainer.innerHTML = "";
    const filteredData = skillData.filter(e => e.types.includes(type));
    filteredData.forEach(e => {
        const skillContainer = document.createElement("div");
        skillContainer.classList.add('couple-label-input');
        skillContainer.classList.add('skillContainer');


        const content = `
            <label for="skill-${e.id}">${e.name}</label>
            <input type="number" class='skillInput' id="skill-${e.id}" min="0" max="5" />
        `

        skillContainer.innerHTML = content;
        skillsContainer.appendChild(skillContainer)
    });

    const all = document.querySelectorAll('.skillInput');
    all.forEach(e => {
        e.value = 0;
        e.addEventListener("change", () => {
            checkInputIsValid(e, 0, 5);
        });
    })
}

export { displaySkills }