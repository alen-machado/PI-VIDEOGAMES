const { getAllGames } = require("../controllers/getAllGames")


const getByName = async (req, res, next) => {

    try {
        const {name} = req.query

        const games = await getAllGames()

        if (name) {

         const game = games.filter(e => e.name.toLowerCase()?.includes(name.toLowerCase()))
         
         if (game) {
            res.status(200).json(game)
         } else {
            res.status(400).send('este juego no existe')
         }
        } else {
            res.status(200).json(games) 
        }
    } catch (error) {
        next(error)
    }
    
}

module.exports = {getByName}