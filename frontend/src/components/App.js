import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, useHistory } from 'react-router-dom';
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { apiAuth } from "../utils/ApiAuth";
import Login from "./Login";

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [mesError, setMesError] = useState(false);
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((profileInfo) => {
        setCurrentUser(profileInfo.data)
      })
      .catch((rej) => console.log(rej))
  }, [])

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res.data)
      })
      .catch((rej) => console.log(rej));
  }, [])

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen('');
  }

  function handlePopupClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closeAllPopups();
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  function handleUpdateUser(profile) {
    api
      .editUserInfo(profile)
      .then(({data: newProfile}) => {
        setCurrentUser(newProfile)
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  function handleUpdateAvatar(avatar) {
    api
      .editUserAvatar(avatar)
      .then(({data: newProfile}) => {
        setCurrentUser(newProfile)
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  function handleCardLike(card) {
    // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some(i => i === currentUser._id);

    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((rej) => console.log(rej))
  }

  function handleAddPlaceSubmit(card) {

    api
      .postNewCard(card)
      .then(({data})=>{
        setCards([data, ...cards])
        closeAllPopups()
      })
      .catch((rej) => console.log(rej))
  }

  function handleRegister({ password, email }) {
    apiAuth
        .register({
          password: password,
          email: email,
        })
        .then(() => {
          setIsInfoTooltipPopupOpen(true)
          setMesError(false)
          history.push('/sign-in')
        })
        .catch(() => {
          setIsInfoTooltipPopupOpen(true)
          setMesError(true)
        })
  }

  function handleLogin({ password, email }) {
    apiAuth
        .login({
          password,
          email,
        })
        .then((res) => {
          if (res.message === '???????? ???????????????? ??????????????') {
            checkToken()
          }
        })
        .catch(() => {
          setMesError(true)
          // setIsInfoTooltipPopupOpen(true)
        })
  }

  function auth(id, email) {
    setLoggedIn(true)
    setUserAuth({
      id,
      email,
    })
  }

  function checkToken() {
    apiAuth
        .checkToken()
        .then((res) => {
          auth(res.data._id, res.data.email)
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        })
  }

  useEffect(() => {
    loggedIn ? history.push('/') : history.push('/sign-in')
  }, [loggedIn])

  // ???????????????? ???????????????????????? ?????? ??????????
  useEffect(() => {
    checkToken();
    loggedIn ? history.push('/') : history.push('/sign-in')
  }, [])

  // ?????????? ????????????????????????
  function handleSignOutButtonClick() {
    exit()
  }
  function exit() {
    localStorage.removeItem('token')
    setLoggedIn(false)
    setUserAuth({})
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header handleLogout={handleSignOutButtonClick} userAuth={userAuth}/>
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} error={mesError} onClose={handlePopupClose}/>
        <Switch>
          <Route path="/sign-up">
            <Register onSubmit={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onSubmit={handleLogin} />
          </Route>
          <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
          />
        </Switch>
        <Footer />

        <ImagePopup card={selectedCard} onClose={handlePopupClose} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handlePopupClose} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handlePopupClose} onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handlePopupClose} onUpdateAvatar={handleUpdateAvatar} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
