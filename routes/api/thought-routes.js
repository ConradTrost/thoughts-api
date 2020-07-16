// /api/thoughts
// Get get all thoughts
// GET single thought by ID
// POST to create new thought (push thoughts _id to associated users 'thoughts' array field)
// PUT, update thought by _id
// DELETE, rm thought by id

// /api/thoughts/:thoughtId/reactions
// POST, create a reaction stired in a thoughts 'reactions' array field
// DELETE to pull/remove a reaction by reactionId value

const router = require('express').Router();

const {
     getAllThoughts,
     addThought
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)

router
    .route('/:userId')
    .post(addThought)
    
module.exports = router;
