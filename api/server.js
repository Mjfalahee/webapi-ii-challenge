const express = require('express');

const blogsRouter = require('../blogs/blogs-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Server is running</h>
    `);
  });

server.use('/api/posts', blogsRouter);

module.exports = server; 
