const express = require('express');
const messages = require('../constant/messages');
const composeResponse = require('../util/composeResponse');
const { Todo } = require('../models/todos/todo');

const posts = {};

const routes = app => {
  const router = express.Router();

  router.post('/posts', (req, res) => {
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
    const id = randomBytes(4).toString('hex');
    const { title, content } = req.body;

    posts[id] = { id, title, content };
    res.status(201).send(posts[id]);
  });

  router.get('/posts', (req, res) => {
    // Todo.find({}, { __v: 0 })
    //   .then(result => {
    //     return composeResponse.success(res, messages.SUCCESS, result);
    //   })
    //   .catch(e => {
    //     return composeResponse.error(res, messages.INTERNAL_SERVER_ERROR, e);
    //   });

    res.send(posts);
  });

  app.use('/', router);
};

module.exports = routes;
