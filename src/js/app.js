import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from "./helpers/validate";
import { removeInputError, showInputError } from './views/forms';
import { login } from "./services/auth.services";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.services";

const {form, inputEmail, inputPassword} = UI;
const inputs = [inputEmail, inputPassword];

// Events
form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit();
});

inputs.forEach(el => {
    el.addEventListener('focus', () => {
        removeInputError(el);
    });
});

// Handlers
async function onSubmit() {
    const isValidForm = inputs.every((el) => {
        const isValidInput = validate(el);

        if (!isValidInput) {
            showInputError(el);
        }
        return isValidInput;
    });

    if (!isValidForm) return null;

    try {
        await login(inputEmail.value, inputPassword.value);
        await getNews();
        notify({msg: 'Login success', className: 'alert-success'});
        form.reset();
    } catch (err) {
        notify({msg: 'Login not success', className: 'alert-danger', timeout: 5000});
    }
}


