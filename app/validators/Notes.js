const errors = require('../utils/errors');

class NotesValidator {
  static create(req, res, next) {
    req.checkBody('title', 'can not be empty').notEmpty();
    req.checkBody('title', 'length is too long').isLength({ min: 0, max: 400 });
    req.checkBody('message', 'can not be empty').notEmpty();
    req.checkBody('message', 'length is too long').isLength({ min: 0, max: 4000 });
    const error = req.validationErrors();
    if (error) {
      return next(new errors.BadRequestError(error));
    }
    req.sanitizeBody('title').escape().trim();
    req.sanitizeBody('message').escape();
    return next();
  }

  static getNotes(req, res, next) {
    if (req.query.offset !== undefined && req.query.limit !== undefined) {
      req.checkQuery('offset', `must be a number between 0 - ${Number.MAX_SAFE_INTEGER}`)
        .isInt({ min: 0, max: Number.MAX_SAFE_INTEGER });
      req.checkQuery('limit', 'must be a number between 1 - 100')
        .isInt({ min: 1, max: 100 });
      const error = req.validationErrors();
      if (error) {
        return next(new errors.BadRequestError(error));
      }
    }
    return next();
  }

  static getNote(req, res, next) {
    const errorMessage = 'Id is not a number';
    req.checkParams('id', errorMessage).isNumeric();
    const error = req.validationErrors();
    if (error) {
      return next(new errors.BadRequestError(errorMessage));
    }
    return next();
  }

  static updateNote(req, res, next) {
    const errorMessage = 'Id is not a number';
    req.checkParams('id', errorMessage).isNumeric();
    const error = req.validationErrors();
    if (error) {
      return next(new errors.BadRequestError(errorMessage));
    }
    return next();
  }

  static removeNote(req, res, next) {
    const errorMessage = 'Id is not a number';
    req.checkParams('id', errorMessage).isNumeric();
    const error = req.validationErrors();
    if (error) {
      return next(new errors.BadRequestError(errorMessage));
    }
    return next();
  }
}

module.exports = NotesValidator;
