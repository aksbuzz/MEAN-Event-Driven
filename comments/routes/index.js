const express = require('express');
const messages = require('../constant/messages');
const composeResponse = require('../util/composeResponse');
const { Todo } = require('../models/todos/todo');

const commentsByPostId = {};

const routes = app => {
  const router = express.Router();

  router.post('/posts/:id/comments', (req, res) => {
    // if (!req.body.text) {
    //   return composeResponse.error(res, messages.BAD_REQUEST);
    // }

    // const todo = new Todo({ text: req.body.text });

    // todo
    //   .save()
    //   .then(result => {
    //     return composeResponse.success(res, messages.SUCCESS, result);
    //   })
    //   .catch(e => {
    //     return composeResponse.error(res, messages.INTERNAL_SERVER_ERROR, e);
    //   });

    console.log('I am in');
    const commentId = randomBytes(4).toString('hex');
    const { commentContents } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, commentContents });
    console.log(comments);
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
  });

  router.get('/posts/:id/comments', (req, res) => {
    // Todo.find({}, { __v: 0 })
    //   .then(result => {
    //     return composeResponse.success(res, messages.SUCCESS, result);
    //   })
    //   .catch(e => {
    //     return composeResponse.error(res, messages.INTERNAL_SERVER_ERROR, e);
    //   });

    res.send(commentsByPostId[req.params.id] || []);
  });

  app.use('/api', router);
};

module.exports = routes;
