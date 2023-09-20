// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
// Create web server
const app = express();
// Register middleware
app.use(bodyParser.json());
app.use(cors());
// Create an object to store post and comments
const postsAndComments = {};
// Create a function to handle event
const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        postsAndComments[id] = { id, title, comments: [] };
    }
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = postsAndComments[postId];
        post.comments.push({ id, content, status });
    }
    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = postsAndComments[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
};
// Create a route to handle event
app.get('/postsandcomments', (req, res) => {
    res.send(postsAndComments);
});
// Create a route to handle event
app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});
//