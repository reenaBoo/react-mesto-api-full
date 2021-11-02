// это файл контроллеров

const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(200)
      .send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      next(err);
    });
};

module.exports.findCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200)
      .send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      } else if (card.owner.toString() === req.user._id) {
        Card.deleteOne({ _id: card._id })
          .then(res.status(200)
            .send({ message: 'Карточка удалена' }));
      } else {
        next(new ForbiddenError('Запрещено удалять карточки чужих пользователей'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, {
      new: true,
      runValidators: true,
    })
    .then((card) => {
      if (card) {
        res.status(200)
          .send({ data: card });
      } else {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, {
      new: true,
      runValidators: true,
    })
    .then((card) => {
      if (card) {
        res.status(200)
          .send({ data: card });
      } else {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      next(err);
    });
};
