const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');
const { moviesApiUpdate, moviesApiSingle, moviesApiSeries, moviesApiAnime, detailMovies, moviestvShowApi, movieCategories, getUsers, loginUser, registerUser, addFavoriteMovie, getFavoriteMovies, removeFavoriteMovie, commentMovie, commentReply, getComments } = require('../controller/homeController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/public/imges/products");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//get
router.get('/films/phim-moi-cap-nhat', moviesApiUpdate);
router.get('/films/phim-le', moviesApiSingle);
router.get('/films/phim-bo', moviesApiSeries);
router.get('/films/hoat-hinh', moviesApiAnime);
router.get('/films/tv-shows', moviestvShowApi);
router.get('/films/:slug', detailMovies);
router.get('/films/the-loai/:slug', movieCategories);
router.get('/users/:email', getUsers);
router.get('/favoriteMovies/:userId', getFavoriteMovies);
router.get('/getComments', getComments);

//post
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/addFavoriteMovie', addFavoriteMovie);
router.post('/removeFavoriteMovie', removeFavoriteMovie);
router.post('/comments', commentMovie)
router.post('/commentsReply/:id', commentReply);


module.exports = router;
