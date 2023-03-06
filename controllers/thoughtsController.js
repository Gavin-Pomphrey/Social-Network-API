//import required models
const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts
    getAllThoughts(req, res) {
        thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get thought by id
    getThoughtById(req, res) {
        thought.findOne({ _id: req.params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create thought
    createThought(req, res) {
        thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            })
            .catch(err => res.json(err));
    },

    //update thought by id with new content
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete thought by id and remove from user's thoughts array
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((deletedThought) => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return User.findOneAndUpdate(
                    { username: deletedThought.username },
                    { $pull: { thoughts: req.params.thoughsId } },
                    { new: true }
                );
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            })
            .catch(err => res.json(err));
    },

    //add reaction to thought by id
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            })
            .catch(err => res.json(err));
    },

    //delete reaction by id
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            })
            .catch(err => res.json(err));
    }
};