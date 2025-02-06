
class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    getBeers() {
        return fetch(this.baseURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status} - ${response.statusText}`)
                }
                return response.json();
            })
            .catch((err) => `Unable to get all the beers from api.${err}`)
    }

    getBeer(id) {
        return fetch(`${this.baseURL}/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status} - ${response.statusText}`);
                }
                return response.json()
            })
            .catch((err) => `Unable to get specific bear from api.${err}`,);
    }

    getRandomBeer() {
        return fetch(`${this.baseURL}/random`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status} - ${response.statusText}`);
                }
                return response.json()
            })
            .catch((err) => `Unable to get specific bear from api.${err}`,);
    }
}
module.exports = ApiService;