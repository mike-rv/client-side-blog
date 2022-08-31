const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());


let posts = [
    {id: 1, post: "Found this new app called Fakebook",comment1: "This is cool"},
    {id: 2, post: "Hello everyone ",comment1: "Hello ID 2"}  
]


app.get('/', (req, res) => {
    res.send(posts);
})

app.post('/', (req, res) => {
    const newPostContent = req.body.post
    const newId = posts[posts.length - 1].id + 1
    const newPost = { id: newId, post: newPostContent }
    res.status(201).send(newPost)
    posts.push(newPost)
})

app.get("/:id", (req, res) => {

    try {
        const postId = parseInt(req.params.id)

        const selectedPost = posts.find(posts => posts.id === postId)
        if (!selectedPost) {
            throw new Error('This post is not accessible')
        }
        res.send(selectedPost)

    } catch(err) {
        res.status(404).send({message: err.message })
    }

})
        

app.post("/:id", (req, res) => {
    console.log(req.body)
    const postId = parseInt(req.params.id);
    let newComment = req.body.comment;
    commentCount = "Comment "+ (Object.keys(posts[postId - 1]).length - 1).toString();
    console.log(commentCount)
    posts[postId - 1] = {...posts[postId -1], [commentCount]: newComment}
    commentCount++ 
    res.status(201).send(posts[postId - 1]);

    

    
})







module.exports = app;
