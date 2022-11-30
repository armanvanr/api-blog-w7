const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { Post } = require("../models");

router.post('/posts', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    const checkTitle = await Post.findOne({ where: { title } });
    if (!title || !content) {
        res.status(400).json({
            success: false,
            errorMessage: "Title or content cannot be empty"
        });
        return;
    }
    if (checkTitle) {
        res.status(400).json({
            success: false,
            errorMessage: "Title already exists"
        });
        return;
    }
    const createdPost = await Post.create({
        title: title,
        content: content,
    });
    res.status(201).json({ posts: createdPost });
});

router.get('/posts', async (req, res) => {
    const posts = await Post.findAll({})
    const result = posts.map(post => {
        return post
    });

    res.json({ data: result })
});

module.exports = router;