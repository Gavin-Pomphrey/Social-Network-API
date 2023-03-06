//import required modules
const { User, Thought } = require('../models');

module.exports = {
    //find all usersand populate friends but exclude __v
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then((users) => res.json(users))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //find user by id and populate both thoughts and friends but exclude __v
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })

            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create a new user and return the new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch(err => res.status(400).json(err));
    },

    //update a user by id and return the updated user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete a user by id and return the deleted user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            }
            )
            .catch(err => res.status(400).json(err));
    },

    //add a friend to a user's friend list by id and return the updated user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            }
            )
            .catch(err => res.status(400).json(err));
    },

    //delete a friend from a user's friend list by id and return the updated user
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            })
            .catch(err => res.status(400).json(err));
    }
};
