const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const { createPost } = require('../controllers/postControllers/createPost');
const { getPosts } = require('../controllers/postControllers/getPosts');
const { updatePost } = require('../controllers/postControllers/updatePosts');
const { deletePost } = require('../controllers/postControllers/deletePost');

const { likePost } = require('../controllers/postControllers/likePost');
const { commentOnPost } = require('../controllers/postControllers/commentOnPost');
const { deleteComment } = require('../controllers/postControllers/deleteComment');
const { getComments } = require('../controllers/postControllers/getComments');
const { getALlPosts } = require('../controllers/postControllers/getAllPosts');
const { getFeed } = require('../controllers/postControllers/getFeed');
const { getSavedPosts } = require('../controllers/postControllers/getSavedPosts');
const { savePost } = require('../controllers/postControllers/savePost');
const { getLikedPosts } = require('../controllers/postControllers/getLikedPosts');

// Middleware for authentication
router.use(authMiddleware)


// Route and specific controllers :

// Get all posts of all users :
router.get('/allPosts',getALlPosts)

router.post('/createPost',createPost)

router.get('/posts',getPosts)
router.put('/updatePost/:postId',updatePost)
router.delete('/deletePost/:postId',deletePost)

router.put('/likePost/:postId',likePost)
router.put('/commentOnPost/:postId',commentOnPost)
router.get('/getComments/:postId',getComments)
router.delete('/deleteComment/:commentId',deleteComment)
router.put('/savePost/:postId', savePost);
router.get('/saved', getSavedPosts);
router.get('/liked',getLikedPosts)

router.get('/feed',getFeed);


module.exports = router;