const client = require("./client");
const util = require("util");

const REPLACE_ME = "HELP REPLACE ME!!!!";

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
  // create a try/catch to handle the async function and build a better way to handle errors
  try {
    // grabbing the data from the client data
    const { rows: videoGames } = await client.query(
      `SELECT * FROM videoGames;`
    );
    // returning the data pulled from the client data
    return videoGames;
  } catch (error) {
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  // Using a try/catch function to handle any errors
  try {
    // pulling data from the client based on the id passed into the function
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );
    // returning the data
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
  // Using a try/catch function to handle errors
  try {
    // taking in the data passed in from the body of the request and posting the data to the client database
    const {
      rows: [videoGame],
    } = await client.query(
      `INSERT INTO videoGames(name, description, price, "inStock", "isPopular", "imgUrl")
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
      [
        body.name,
        body.description,
        body.price,
        body.inStock,
        body.isPopular,
        body.imgUrl,
      ]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
  // LOGIC GOES HERE
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `UPDATE videoGames SET ${setString} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );

    return videoGame;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
  // LOGIC GOES HERE
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `DELETE FROM videoGames 
        WHERE id=$1
        RETURNING *;`,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
