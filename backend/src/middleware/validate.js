const { validationResult, body } = require('express-validator')

const contactRules = [
  body('name').trim().notEmpty().withMessage('Nome é obrigatório').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('E-mail inválido').normalizeEmail(),
  body('subject').optional().trim().isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Mensagem é obrigatória').isLength({ min: 10, max: 2000 }),
]

function handleValidation(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    })
  }
  next()
}

module.exports = { contactRules, handleValidation }
