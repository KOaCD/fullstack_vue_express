const express = require('express');
const mongodb = require('mongodb');
require('dotenv').config()

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.send(201).send();
});
// Delete Post
router.delete('/:id', async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    (`mongodb+srv://${process.env.DB_user}:${process.env.DB_pw}@cluster0-b6sbw.mongodb.net/`,{
        useNewUrlParser: true
    });

    return client.db(process.env.DB_name).collection('posts');
}

module.exports = router;