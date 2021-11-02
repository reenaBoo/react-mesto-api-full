function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={`popup ${isOpen ? ' popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
          <form className="form form_type_user" name={name} onSubmit={onSubmit}>
            <h2 className="form__title">{title}</h2>
            {children}
            <button className="form__save-button" type="submit">{buttonText}</button>
          </form>
      </div>
    </div>
  )
}

export default PopupWithForm;