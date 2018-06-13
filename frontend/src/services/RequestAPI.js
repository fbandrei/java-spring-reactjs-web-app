import {API_BASE_URL, ACCESS_TOKEN} from "../constants/constant";

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("Access token not set.");
    }

    return request({
        url: API_BASE_URL + "/users/me",
        method: 'GET'
    })
}

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    headers.append('Authorization', 'Bearer' + localStorage.getItem(ACCESS_TOKEN));
    options = Object.assign({}, {headers: headers}, options);
    return fetch(options.url, options)
        .then(response =>
            response.json().then(jsonResponse => {
                if (!response.ok) {
                    return Promise.reject(jsonResponse);
                }
                return jsonResponse;
            })
        );

}