const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

// Đặt các route cụ thể trước (detail), rồi mới tới route chung (/:id)
router.get('/detail/login', UserController.detail)
router.get('/:id',            UserController.user)
router.get('/',               UserController.index)

router.post('/',              UserController.post_user)
router.put('/',               UserController.update_user)

module.exports = router
