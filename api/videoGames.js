const express = require("express");
const router = express.Router();

const REPLACE_ME = "HELP REPLACE ME!!!!";

const {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
} = require("../db/videoGames");

// GET - /api/video-games - get all video games
router.get("/", async (req, res, next) => {
  try {
    // awaits a call to fetch data with a function from the db
    const videoGames = await getAllVideoGames();
    // sending the response to the server
    res.send(videoGames);
  } catch (error) {
    next(error);
  }
});

// GET - /api/video-games/:id - get a single video game by id
router.get("/:id", async (req, res, next) => {
  try {
    // making a request to retrieve a single video game based on id
    const videoGame = await getVideoGameById(req.params.id);
    // sending the data to the server to display the single video game from the url
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

// POST - /api/video-games - create a new video game
router.post("/", async (req, res, next) => {
  // LOGIC GOES HERE
  try {
    // updating the api by adding a new video game with the body data from the request
    const videoGame = await createVideoGame(req.body);
    // sending the new video game into the api
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/video-games/:id - update a single video game by id
router.put("/:id", async (req, res, next) => {
  // LOGIC GOES HERE
  try {
    // updating a video game by the id and the body of json data sent in
    const videoGame = await updateVideoGame(req.params.id, req.body);
    // sending the data into the video game api table
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete("/:id", async (req, res, next) => {
  // LOGIC GOES HERE
  try {
    const videoGame = await deleteVideoGame(req.params.id);
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
