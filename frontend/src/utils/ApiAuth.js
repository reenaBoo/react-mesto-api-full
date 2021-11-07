class ApiAuth {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    register(dataAuth) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataAuth),
        }).then(this._checkStatus)
    }

    login(dataAuth) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataAuth),
        }).then(this._checkStatus)
    }

    checkToken() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(this._checkStatus)
    }
}

export const apiAuth = new ApiAuth({
    // baseUrl: 'https://api.siesta.nomoredomains.icu',
    baseUrl: 'http://localhost:3001',
})
