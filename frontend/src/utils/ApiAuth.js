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
        return fetch(`http://localhost:3000/signup`, {
            method: 'POST',
            credentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataAuth),
        }).then(this._checkStatus)
    }

    login(dataAuth) {
        return fetch(`http://localhost:3000/signin`, {
            method: 'POST',
            credentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataAuth),
        }).then(this._checkStatus)
    }

    checkToken(token) {
        return fetch(`http://localhost:3000/users/me`, {
            method: 'GET',
            credentials: true,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then(this._checkStatus)
    }
}

export const apiAuth = new ApiAuth({
    baseUrl: 'http://localhost:3000',
})
