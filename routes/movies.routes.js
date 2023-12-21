// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((celebrities) => res.render("movies/new-movie", { celebrities }))
    .catch((error) => console.log(error));
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch(() => res.render("movies/new-movie"));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => res.render("movies/movie-details", { movie }))
    .catch((error) => console.log(error));
});

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((error) => console.log(error));
});

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;

  Promise.all([Movie.findById(id), Celebrity.find()])
    .then(([movie, celebrities]) =>
      res.render("movies/edit-movie", { movie, celebrities })
    )
    .catch((error) => console.log(error));
});

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect(`/movies/${id}`))
    .catch((error) => console.log(error));
});

module.exports = router;
