const express = require("express");
const router = express.Router();
const marvelData = require("../data/marvelData");

router.get("/", async (req, res) => {
  try {
    res.render("marvel/index", { title: "Character Finder" });
  } catch (e) {
    res.status(404).send({ error: e });
  }
});

router.post("/search", async (req, res) => {
  searchTerm = req.body.searchTerm;

  if (!searchTerm) {
    res
      .status(400)
      .render("marvel/error", { error: "Error 400 :Search Term not provided" });
    return;
  }
  if (typeof searchTerm != "string") {
    res
      .status(400)
      .render("marvel/error", {
        error: "Error 400 :Search Term must be string.",
      });
    return;
  }
  if (searchTerm.trim().length < 1) {
    res
      .status(400)
      .render("marvel/error", { error: "Error 400 :Search Term is empty." });
    return;
  }

  try {
    const movies = await marvelData.getData(searchTerm);
    if (!movies) {
      res
        .status(404)
        .render("marvel/error", { error: "Error 404 :No data found." });
      return;
    }
    res.render("marvel/search", {
      movies: movies,
      searchTerm: searchTerm,
      title: "Characters Found",
    });
  } catch (e) {
    res.status(404).render("marvel/error", { error: e });
  }

  router.get("/characters/:id", async (req, res) => {
    try {
      const movies = await marvelData.getDataById(req.params.id);
      if (!movies) {
        res
          .status(404)
          .render("marvel/error", { error: "Error 404 :No data found." });
        return;
      }
      res.render("marvel/characters", {
        movies: movies,
        img: movies.thumbnail.path + "/portrait_xlarge.jpg",
        searchTerm: searchTerm,
        title: movies.name,
        desc: movies.description
      });
    } catch (e) {
      res.status(404).render("marvel/error", { error: e });
    }
  });
});

module.exports = router;
