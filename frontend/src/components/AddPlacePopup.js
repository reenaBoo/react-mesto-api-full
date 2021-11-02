import React from 'react';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link
    });
  }

  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen, onClose])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input id="place-input" value={name || ''} onChange={handleChangeName} className="form__input form__input_type_place" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="place-input-error form__input-error"></span>
      <input id="url-input" value={link || ''} onChange={handleChangeLink} className="form__input form__input_type_url" type="url" name="link" placeholder="Ссылка на картинку" required />
      <span className="url-input-error form__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;