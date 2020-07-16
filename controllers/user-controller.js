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
    }
}

module.exports = userController;
