import {API_BASE_URL, ACCESS_TOKEN} from "../constants/constant";

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("Access token not set.");
    }
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    })
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function confirmRegistration(token) {

    console.log(token);
    return request({
        url: API_BASE_URL + "/auth/confirm?token=" + token,
        method: 'GET'
    });
}

export function getAccounts() {
    return request({
        url: API_BASE_URL + "/getAccounts",
        method: 'GET'
    })
}

export function createAccount(account) {
    return request({
        url: API_BASE_URL + "/createAccount",
        method: 'POST',
        body: JSON.stringify(account)
    });
}
export function getBudgetData(year,month) {
    return request({
        url: API_BASE_URL + "/getBudgetData/?year=" + year + "?month=" + month,
        method: 'GET'
    })
}


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });


    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
    const defaults = {headers: headers};
    console.log("token: " + localStorage.getItem(ACCESS_TOKEN));
    options = Object.assign({}, defaults, options);
    console.log(options);
    return fetch(options.url, options)
        .then(response =>
            response.json().then(jsonResponse => {
                console.log(jsonResponse, response.ok);
                if (!response.ok) {
                    return Promise.reject(jsonResponse);
                }
                return jsonResponse;
            })
        );

}