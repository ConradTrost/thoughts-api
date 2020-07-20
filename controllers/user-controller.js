const { Thought, User } = require('../models');

const userController = {
    addUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400);
        })
    },

    getUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData)) // problem not here??
        .catch(err => {
            console.log(err);
            res.status(400)
        })
    },

    getUserById({params}, res) {
        User.findOne({ _id: params.userId })
        .populate({
            path: 'thoughts',
            select: ['thoughtText']
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400);
        })
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
    },

    removeUser({params}, res) {
        User.findOneAndDelete({ _id: params.userId })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
            )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with id' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },

    removeFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' })
                return;
            };
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    }
}

module.exports = userController;
