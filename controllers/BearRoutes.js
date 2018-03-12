const express = require('express');
const bearRouter = express.Router();
const Bear = require('../models/schema.js');

const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_SEVER_ERROR = 500;
const STATUS_CREATED_SUCCESS = 201;
const STATUS_OK = 200;


bearRouter.post('/bears', (req, res) => {
  if( req.body.species &&  req.body.latinName) {
    const bear = new Bear(req.body);

    bear
    .save()
    .then(savedBear => {
      res.status(STATUS_CREATED_SUCCESS).json(savedBear);
    })
    .catch(err => {
      res.status(STATUS_SEVER_ERROR).send({ error: "There was an error while saving the Bear to the Database" })
    });
  } else {
    res.status(STATUS_BAD_REQUEST).json({ errorMessage: "Please provide both species and latinName for the Bear." });
  }
})

bearRouter.get('/bears', (req, res) => {
    Bear.find({})
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => {
        res.status(500).json({ error: "The information could not be retrieved." });
      });
  });

bearRouter.get('/bears/:id', (req, res) => {
  Bear.findById(req.params.id)
    .then(id => {
      res.status(200).json(id);
    })
      .catch(err => {
        res.status(404).json({ message: "The Bear with the specified ID does not exist." })
      })
  })


bearRouter.delete('/bears/:id', (req, res) => {
  Bear.findByIdAndRemove(req.params.id)
  .then(id => {
    res.status(200).json(bears);
  })
  .catch(err => {
    res.status(404).json({ message: "The Bear with the specified ID does not exist." })
})

bearRouter.put('/bears/:id', (req, res) => {
  Bear.findByIdAndUpdate(req.params.id)
  .save(id => {
    res.status(200)
  })
  .then

  
})

module.exports = bearRouter;