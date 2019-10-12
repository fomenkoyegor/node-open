const Post = require('../models/Post');
const Comment = require('../models/Commets');

const errHendler = require('../untils/errHendler');


const get = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (e) {
        errHendler(res, e);
    }
};



const create = async (req, res) => {
    try {
        const comment = await new Comment({
            title: req.body.title,
            post: req.query.postId || req.body.postId,
            user: req.user.id,
        }).save();
        res.status(201).json(comment);
    } catch (e) {
        errHendler(res, e)
    }
};


const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findById(id);
        res.status(200).json(comment);
    } catch (err) {
        errHendler(res, err);
    }
};

const removeById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findById(id);
        if (comment) {
            await Comment.remove({_id: id});
            res.status(200).json({
                message: 'comment removed',
                comment
            });
        } else {
            res.status(301).json({
                message: 'comment not found'
            });
        }

    } catch (err) {
        errHendler(res, err);
    }
};

const updateById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findByIdAndUpdate(
            {_id: id},
            {$set: req.body},
            {new: true}
        );
        res.status(201).json(comment);

    } catch (err) {
        errHendler(res, err);
    }
};

module.exports = {get, create, getById, removeById, updateById};



