const { Videogame, Genre } = require("../../db")

const getDataBase = async () => {
   
    const del = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
        },
      });
      return del;
    };
module.exports = {getDataBase}