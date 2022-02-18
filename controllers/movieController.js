const db = require('../database/models')
const Movie = db.Movies
const Genre = db.Genres
const Actor = db.Actors

const movieController = {
    home: (req,res)=>{
        Movie.findAll()
            .then((movies)=>{
                res.render('home', {movies, user: req.session.userLogged})
            })
    },
    detail: (req, res)=>{
        Movie.findByPk(req.params.id,{
            include: [{association:'genres'},{association:'actors'}]
        })
            .then(movie =>{
                res.render('detail', {movie, user: req.session.userLogged})
            })
    },
    create: (req, res)=>{
        Genre.findAll()
            .then((genres)=>{
                res.render('create-movie', {genres})
        })
    },
    createSend: (req, res)=>{
        Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.releaseDate,
                length: req.body.length,
                genre_id: req.body.genres
            })
            res.redirect('/')
    },
    update: (req, res)=>{
        const movie = Movie.findByPk(req.params.id)
        const genres = Genre.findAll()

        Promise.all([movie, genres])
            .then(([movie, genres])=>{
                res.render('edit-movie', {movie, genres})
            })
        // Movie.findByPk(req.params.id,{
        //     include: [{association:'genres'}]
        // })
        //     .then(movie =>{
        //             res.render('edit-movie', {movie})
        //         })
    },
    updateSend: (req, res)=>{
        Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.releaseDate,
            length: req.body.length,
            genre_id: req.body.genres
        },
        {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/movies/' + req.params.id) 
    },
    delete: (req, res)=>{
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })      
        res.redirect('/')
    }
}

module.exports = movieController;