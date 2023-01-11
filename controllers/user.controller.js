const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password')
    res.status(200).json(users)
}

module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('params err : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('id err : ' + err)
    }).select('-password')
}
    
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('params err : ' + req.params.id)

    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true},
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(400).send({message: err})})
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('params err : ' + req.params.id)

    try {
        await UserModel.remove({ _id: req.params.id })
        res.status(200).json({ message: "deleted" })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
    return res.status(400).send('params err : ' + req.params.id)

    try {
        // add to the folower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true}
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(400).send({message: err})})
        // add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true}
        )
        // .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(400).send({message: err})})
    } catch (err) {
        return res.status(500).json({ message: err })
    }
} 

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
    return res.status(400).send('params err : ' + req.params.id)

    try {
        // add to the folower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upsert: true}
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(400).send({message: err})})
        // add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true}
        )
        // .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(400).send({message: err})})
    } catch (err) {
        return res.status(500).json({ message: err })
    }
} 
