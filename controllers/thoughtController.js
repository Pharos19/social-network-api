const { User, Thought } = require('../models')

module.exports = {
    //get all thoughts
    getThought(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    //get one thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => {
                if(!thought) {
                    res.status(404).json({ message: 'No Thought found with that ID' })
                }
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err))
    },
    //create thought and push to user thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then((thought) => {
                if(!thought) {
                    res.status(404).json({ message: 'No Thought found with that ID' })
                }
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err))
    },
    //update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if(!thought) {
                    res.status(404).json({ message: 'No Thought found with that ID' })
                }
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err))
    },
    //delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if(!thought) {
                    res.status(404).json({ message: 'No Thought found with that ID' })
                }
                User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            })
            .then((user) => {
                if(!user) {
                    res.status(404).json({ message: 'No User found with that ID' })
                }
                res.json({ message: 'Thought deleted' })
            }).catch((err) => res.status(500).json(err))
    },
    //create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if(!thought) {
                    res.status(404).json({ message: 'No Thought found with that ID' })
                }
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err))
    },
    //delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if(!thought) {
                    res.status(404).json({ message: 'No Thought found with that ID' })
                }
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err))
    }
}