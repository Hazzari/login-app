/**
 * Function inputErrorTemplate.
 * @param {string} msg
 */
function inputErrorTemplate(msg) {
    return `
    <div class="invalid-feedback">${msg}</div>
    `;
}

/**
 * Function showInputError. Add input error.
 * @param {HTMLHtmlElement} el
 */
export function showInputError(el) {
    const parent = el.parentElement;
    const msg = el.dataset.invalidMessage || 'Invalid input';
    const template = inputErrorTemplate(msg);

    if (parent.parentNode.querySelector('.is-invalid')) {
        return null;
    } else {
        el.classList.add('is-invalid');
        parent.insertAdjacentHTML('beforeend', template);
    }
}

/**
 * Function removeInputError. Remove input error.
 * @param {HTMLHtmlElement} el
 */
export function removeInputError(el) {
    const parent = el.parentElement;
    const err = parent.querySelector('.invalid-feedback');
    if (!err) return null;

    el.classList.remove('is-invalid');
    parent.removeChild(err);
}