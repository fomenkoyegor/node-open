const Post = require('../models/Post');

const errHendler = require('../untils/errHendler');

// "GET" locallhost:3000/api/posts?offset=2&limit=5
const get = async (req, res) => {
    try {
        const query = {};
        if (req.query.start) {
            query.date = {
                $gte: req.query.start
            }
        }
        if (req.query.end) {
            if (!query.date) {
                query.date = {}
            }

            query.date['$lte'] = req.query.end
        }
        let posts = await Post
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit);

        res.status(200).json({
            data: posts,
            offset: req.query.offset ? req.query.offset : 0,
            limit: req.query.limit ? req.query.limit : 0,
        });
    } catch (e) {
        errHendler(res, e);
    }
};


// "GET" locallhost:3000/api/posts  {	"title":"test1",	"body":"asdadasdasd"}
const create = async (req, res) => {
    try {
        const post = await new Post({
            title: req.body.title,
            body: req.body.body,
            user: req.user.id,
        }).save();
        res.status(201).json(post);
    } catch (e) {
        errHendler(res, e)
    }
};


const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (err) {
        errHendler(res, err);
    }
};

const removeById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        const userId = req.user.id;
        if (post) {
            await Post.remove({_id: id});
            res.status(200).json({
                message: 'post removed',
                post
            });
        } else {
            res.status(301).json({
                message: 'post not found'
            });
        }

    } catch (err) {
        errHendler(res, err);
    }
};

const updateById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndUpdate(
            {_id: id},
            {$set: req.body},
            {new: true}
        );
        res.status(201).json(post);

    } catch (err) {
        errHendler(res, err);
    }
};

module.exports = {get, create, getById, removeById, updateById};



