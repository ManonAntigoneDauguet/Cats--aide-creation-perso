/**
 * Check if a input's value is between a min and a max
 * @param { HTMLElement } input 
 * @param { Number } min 
 * @param { Number } max 
 */
function checkInputIsValid(input, min, max) {
    if (input.value < min) { input.value = min; }
    if (input.value > max) { input.value = max; }
}

/**
 * Create options in a select input from data
 * @param { Array } subData 
 * @param { HTMLElement } input 
 * @param { String } dataCategory for the id of options 
 */
function displayOptions(subData, input, dataCategory) {
    const option = document.createElement("option");
    option.setAttribute("value", "");
    option.innerHTML = "- -";
    input.appendChild(option);
    subData.forEach(e => {
        const option = document.createElement("option");
        option.setAttribute("value", e.name);
        option.setAttribute("id", `${dataCategory}-${e.id}`)
        option.innerHTML = e.name;
        input.appendChild(option);
    })
}

function toUppercaseFirstCharacter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function avertIrrelevantValue(input) {
    const scales = [0, 1, 2, 4, 8, 16];
    if (!scales.includes(Number(input.value))) {
        input.classList.add('irrelevant');
    } else {
        input.classList.remove('irrelevant');
    }
}

export { checkInputIsValid, displayOptions, toUppercaseFirstCharacter, avertIrrelevantValue };