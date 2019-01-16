const express = require('express');
const mongodb = require('mongodb').MongoClient;

const router = express.Router();



//Get Posts

router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});
// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function  loadPostCollection() {
    const client = await mongodb.connect('mongodb://localhost:27017/', {useNewUrlParser:true},(err, db)=>{
        if(err) throw err;
        let dbo = db.db("micropost");
        return dbo.collection("posts").find({}).toArray();
        //db.close();
    });
    return client;
    //return client.db('micropost').collection('posts').find({}).toArray();
}


module.exports = router;
