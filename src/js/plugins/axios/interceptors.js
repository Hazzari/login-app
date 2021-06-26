const isTokenKey = 'my_app_token';

function setToken(req) {
    console.log(req);
    const isAuthUrl = req.url.includes('auth');

    if (!isAuthUrl) {
        req.headers['x-access-token'] = localStorage.getItem(isTokenKey);
    }
    return req;

}

function setTokenOnLogin(res) {
    const isLoginUrl = res.config.url.includes('login');
    if (isLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(isTokenKey, token);
    }
    return res;
}

function getClearResponse(res) {
    return res.data;
}

function onError(err) {
    console.dir(err);
    return Promise.reject(err);
}

export default function (axios) {
    // call interceptors
    axios.interceptors.request.use(setToken);
    axios.interceptors.response.use(setTokenOnLogin); // при успешном ответе от сервера выполнится(setTokenOnLogin)
    axios.interceptors.response.use(getClearResponse, onError); // при успешном ответе от сервера выполнится(setTokenOnLogin)

}