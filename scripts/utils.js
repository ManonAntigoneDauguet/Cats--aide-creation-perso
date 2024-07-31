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
 */
function displayOptions(subData, input) {
    const option = document.createElement("option");
    option.setAttribute("value", "");
    option.innerHTML = "- -";
    input.appendChild(option);
    subData.forEach(e => {
        const option = document.createElement("option");
        option.setAttribute("value", e.name);
        option.innerHTML = e.name;
        input.appendChild(option);
    })
}

export { checkInputIsValid, displayOptions };