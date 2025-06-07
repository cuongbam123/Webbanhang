const UserService = require('../services/UserService')

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers()
      res.json(users)
    } catch (err) {
      next(err)
    }
  },

  user: async (req, res, next) => {
    try {
      const user = await UserService.getUserById(req.params.id)
      res.json(user)
    } catch (err) {
      next(err)
    }
  },

  detail: async (req, res, next) => {
    try {
      const { username, password } = req.query
      const user = await UserService.getUserByUsernameOrEmail(username)
      if (!user) return res.status(404).send("Không tìm thấy user")
      if (user.password !== password) return res.status(401).send("Sai mật khẩu")
      res.json(user)
    } catch (err) {
      next(err)
    }
  },

  post_user: async (req, res, next) => {
    try {
      const exists = await UserService.checkExistingUsername(req.body.username)
      if (exists) return res.status(409).send("User đã tồn tại")
      const newUser = await UserService.createUser(req.body)
      res.status(201).json(newUser)
    } catch (err) {
      next(err)
    }
  },

  update_user: async (req, res, next) => {
    try {
      const updated = await UserService.updateUser(req.body)
      if (!updated) return res.status(404).send("Không tìm thấy user để cập nhật")
      res.json(updated)
    } catch (err) {
      next(err)
    }
  },
}
