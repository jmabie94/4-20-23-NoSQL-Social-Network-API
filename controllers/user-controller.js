const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// needed?
/* const headCount = async () =>
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers);
 */

const userController = {
    // get all users
    getAllUser(req, res) {
        // adding .populate thoughts here so that get all users shows their thoughts
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .populate({
                path: 'friends',
                select: '-__v',
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get specific user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .populate({
                path: 'friends',
                select: '-__v',
            })
            .select('-__v')
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res
                        .status(404)
                        .json({ message: 'No user found with this ID!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create new user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    // delete user and all thoughts by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res
                        .status(404)
                        .json({ message: 'No user found with this ID!' });
                }
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(() => {
                res.json({ message: 'User and all their thoughts deleted!' });
            })
            .catch((err) => res.json(err));
    },

    // add friend
    addFriend({ params }, res) {
        // adding an additional User.findOneAndUpdate so that both people are added to eachother's friend lists when either is friend/user
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
            )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $addToSet: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    // delete friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this ID!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },
};

module.exports = userController;