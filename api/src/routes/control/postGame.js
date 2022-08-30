const { Videogame, Genre } = require("../../db")

const postGame = async (req, res, next) => {
     const {name, description, rating, released, image, genres, platforms} = req.body
    try {
        const newVideoGame = await Videogame.create({
            name,
            description,
            rating,
            released,
            image,
            platforms
            
        })

        genres.map( async c => {
            let search = await Genre.findAll(
                {where: {name : c}}
            )
            if (search) {
                newVideoGame.addGenre(search)
            }
          })

        

          res.status(200).send('videoJuego creado con exito')
    } catch (error) {
        next(error)
    }
}

module.exports = {postGame}