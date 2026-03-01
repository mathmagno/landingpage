const { Router } = require('express')
const rateLimit = require('express-rate-limit')
const { contactRules, handleValidation } = require('../middleware/validate')
const ctrl = require('../controllers/contactController')

const router = Router()

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5,
  message: { success: false, message: 'Muitas tentativas. Tente novamente em 1 hora.' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/', submitLimiter, contactRules, handleValidation, ctrl.create)
router.get('/', ctrl.findAll)
router.get('/:id', ctrl.findOne)
router.patch('/:id/read', ctrl.markAsRead)
router.delete('/:id', ctrl.remove)

module.exports = router
