import done from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip({isOpen, error, onClose}) {
    return (
        <div className={`popup ${isOpen ? ' popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__auth-icon" src={error ? fail : done} alt="изображение"/>
                <p className="popup__title-auth">{error ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;