const { Videogame, Genre } = require("../../db")
const { getAllGames } = require("../controllers/getAllGames")

const getPlatforms = async (req, res, next) => {
    
 try {

    const games = await getAllGames()

    platforms = games.map(e => e.platforms)
    platforms = platforms.flat()
     platforms = [...new Set(platforms)].sort()
    res.send(platforms)
 } catch (error) {
    next(error)
 }
}

module.exports = {getPlatforms}