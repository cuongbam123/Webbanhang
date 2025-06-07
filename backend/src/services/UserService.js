const Users = require('../models/user')

const getAllUsers = async () => {
    return await Users.find()
}

const getUserById = async (id) => {
    return await Users.findOne({ _id: id })
}

const getUserByUsernameOrEmail = async (username) => {
    return await Users.findOne({
        $or: [{ username: username }, { email: username }]
    })
}

const createUser = async (data) => {
    return await Users.create(data)
}

const updateUser = async (data) => {
    const user = await Users.findOne({ _id: data._id })
    if (!user) return null

    user.fullname = data.fullname
    user.username = data.username
    user.password = data.password

    await user.save()
    return user
}

const checkExistingUsername = async (username) => {
    return await Users.findOne({ username })
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsernameOrEmail,
    createUser,
    updateUser,
    checkExistingUsername
}
