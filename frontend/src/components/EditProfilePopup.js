import React from 'react';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input id="name-input" className="form__input form__input_type_name" onChange={handleChangeName} value={name || ''} type="text" name="user" placeholder="Как вас зовут?" minLength="2" maxLength="40" required />
      <span className="name-input-error form__input-error"></span>
      <input id="job-input" className="form__input form__input_type_job" onChange={handleChangeDescription} value={description || ''} type="text" name="about" placeholder="Место работы" minLength="2" maxLength="200" required />
      <span className="job-input-error form__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;