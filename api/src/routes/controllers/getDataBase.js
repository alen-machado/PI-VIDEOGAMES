const { Videogame, Genre } = require("../../db")

const getDataBase = async () => {
   
    const del = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
        },
      });

      const info = del.map(v => {
        let genre = v.genres.map(e => e.name)
        let aux = genre.join(', ')
        
      return {
        id: v.id, 
        name: v.name,
        released: v.released,
        rating: v.rating,
        platforms: v.platforms.map(p => p),
        genres: aux.toString(),
        image: v.image,
        createdDatabase: v.createdDatabase
      }
      })
      return info
    };
module.exports = {getDataBase}