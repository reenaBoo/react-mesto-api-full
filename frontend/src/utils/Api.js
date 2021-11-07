class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`https://api.siesta.nomoredomains.icu/cards`, {
      headers: this._headers,
      method: 'GET',
      credentials: 'include',
    })
      .then(this._checkStatus)
  }

  postNewCard(card) {
    return fetch(`https://api.siesta.nomoredomains.icu/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(this._checkStatus)
  }

  getUserInfo() {
    return fetch(`https://api.siesta.nomoredomains.icu/users/me`, {
      headers: this._headers,
      method: 'GET',
      credentials: 'include',
    })
      .then(this._checkStatus)
  }

  editUserInfo(profile) {
    return fetch(`https://api.siesta.nomoredomains.icu/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: profile.name,
        about: profile.about
      })
    })
      .then(this._checkStatus)
  }

  editUserAvatar(avatar) {
    console.log(avatar)
    return fetch(`https://api.siesta.nomoredomains.icu/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
      .then(this._checkStatus)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`https://api.siesta.nomoredomains.icu/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkStatus)
  }

  deleteCard(cardId) {
    return fetch(`https://api.siesta.nomoredomains.icu/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkStatus)
  }
}

export const api = new Api({
  url: 'http://localhost:3001',
  // url: 'https://api.siesta.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json',
  },
})
