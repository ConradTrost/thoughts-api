// /api/users 
// GET all users
// GET user by id and thought/friend data
// POST new user
// PUT, update user by _id
// DELETE, rm user by _id
// Remove associated thoughts when deleted

// /api/users/:userId/friends/:friendId

const router = require('express').Router();

const {
    addUser,
    getUsers,
    getUserById,
    addFriend,
    removeFriend,
    updateUser,
    removeUser
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getUsers)
    .post(addUser)

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser)

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;