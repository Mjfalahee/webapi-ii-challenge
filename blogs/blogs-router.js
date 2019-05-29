const Blogs = require('./blogs-model');

const express = require('express');

const router = express.Router();


// {
//   title: "The post title", // String, required
//   contents: "The post contents", // String, required
//   created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
// }

//Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Blogs.find()
        res.status(200).json(posts);
    }
    catch (error) {
            res.status(500).json({
                success: false,
                message: 'The posts information could not be retrieved.',
            });
        }
});

//get a specific post

router.get('/:id', async (req, res) => {
    try {
    const post = await Blogs.findById(req.params.id);
    if (post.length > 0) {
        res.status(200).json(post);
    }
    else {
        res.status(404).json({
            message: 'The post with the specified ID does not exist.'
            });
        }
    }
    catch (error) {
            res.status(500).json({
                message: 'The post information could not be retrieved.'
            });
        }
});


// needs to return the newly created post but only returns the id
router.post('/', async (req, res) => {
    const {title, contents} = req.body;
    if (!title || !contents) {
        res.status(400).json({
            success: false,
            message: 'Please provide title and contents for the post.',
        })
    }
    try {
        const postid = await Blogs.insert({title, contents});
        res.status(201).json(postid);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'There was an error while saving the post to the database'})
    }
});

// deletes a specific post
//Deletes the post, but doesn't return properly

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    //find post
    try {
        const post = await Blogs.findById(id);
        console.log(post);
        if (post == 0) {
            return post;
        }
        else {
            console.log('Inside find!');
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
                });
            }
        }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Delete failed. Post could not be retrieved.'
        })
    }

    //delete post
    try {
    const deleted = await Blogs.remove(id);

        if (deleted > 0) {
        res.status(200).json({
            message: 'The post has been deleted'
        });
          }  
        else {
        console.log('Inside delete!');
        res.status(404).json({
            message: "The post specified by that ID could not be found."
        })
    }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The post could not be removed.'
        })
    }
})

//get comments from a specific post
//works

router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Blogs.findPostComments(req.params.id);

        if (comments.length > 0) {
            res.status(200).json(comments);
        }
        else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'The comments information could not be retrieved.'
        })
    }
})


//post new comment
// broken
router.post('/:id/comments', async (req, res) => {
    try {
        const comment = await Blogs.insertComment(req.body);
        res.status(201).json(comment);
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error while saving the comment to the database'
        })
    }
});


//update a specific post

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;

    if (!title || !contents) {
        return res.status(400).json({
            message: 'Please provide title and contents for the post.'
        });
    }

    try {
        const post = await Blogs.update(id, {title, contents})
        if (post == 0) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            });
        }

        else {
            res.status(201).json(post);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The post information could not be modified'
        });
    }
})
module.exports = router;

