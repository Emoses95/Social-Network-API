// ObjectId() method for converting thougthtId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts 
    getThoughtss(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return Thought.findOneAndUpdate(
                    { username: req.body.username },
                    { thoughtText: req.body.thoughtText },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(200).json(`${username} thought has been created`)
                    : res.json('Created the application 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Updates and thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Deletes an application from the database. Looks for an app by ID.
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
        ).then(() => res.json({ message: 'Thought has been deleted.' }))
            .catch((err) => res.status(500).json(err))
    },
    // Create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true, }
        ).then((reaction) =>
            !reaction
                ? res.status(404).json({ message: 'There is no thought with this ID!' })
                : res.json(reaction)
        )
            .catch((err) => res.status(500).json(err))
    },
    // Delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { runValidators: true, new: true, }
        ).then((reaction) =>
            !reaction
                ? res.status(404).json({ message: 'There is no thought with this ID!' })
                : res.json(reaction)
        )
            .catch((err) => res.status(500).json(err))
    }
};



