const { Videogame, Genre } = require("../../db")

const deleteGame = async (req, res, next) => {

    const { id } = req.params;

    try {
       const game = await Videogame.destroy({ where: {id},
       include: Genre }) 

       if (game.length > 0) return res.send({ msg: "Game deleted correctly." });
        res.send({ msg: "Game doesn't exists" });
    } catch (error) {
        next(error)
    }
}
module.exports = {deleteGame}