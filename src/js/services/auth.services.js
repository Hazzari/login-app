import axios from '../plugins/axios';

/**
 * Function login. Make login request to API.
 * @param {String} email
 * @param {String} password
 * @return {Response} response
 */
export async function login(email, password) {
    try {
        const response = await axios.post(
            `/auth/login`,
            JSON.stringify({email, password}),
        );
        return response.data;

    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}
