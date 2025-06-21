const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res, next) => {
        try {
            const exists = await UserService.checkExistingUsername(req.body.username);
            if (exists) return res.status(409).send("User đã tồn tại");

            const newUser = await UserService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await UserService.getUserByUsernameOrEmail(username);
            if (!user) return res.status(404).send('Không tìm thấy user');
            if (user.password !== password) return res.status(401).send('Sai mật khẩu');

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({
                token, user,
                fullname: user.fullname,
                role: user.role
            });
        } catch (err) {
            next(err);
        }
    },

    index: async (req, res, next) => {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (err) {
            next(err);
        }
    },

    user: async (req, res, next) => {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) return res.status(404).send('Không tìm thấy user');
            res.json(user);
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updated = await UserService.updateUser({ _id: req.params.id, ...req.body });
            if (!updated) return res.status(404).send('Không tìm thấy user để cập nhật');
            res.json(updated);
        } catch (err) {
            next(err);
        }
    },
};