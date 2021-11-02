function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image${card.link ? ' popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container-image">
        <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        <figure className="figure">
          <img src={card.link} alt={card.name} className="figure__image" />
          <figcaption className="popup__image-signature">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup