const { getAllGames } = require("../controllers/getAllGames")
const { Videogame, Genre } = require("../../db")
require("dotenv").config();
const {API_KEY} = process.env;
const axios = require('axios');

const getIdGame = async (req, res, next) => {
 try {
    const { id } = req.params

   //  const games = await getAllGames()
   //  const gameId = games.filter(r => r.id === id)
   //  if(gameId.length) {
   //     res.json(gameId)
   //  } else {
   //      res.json('id invalido')
   //  }
   if(!id.includes('-')){

      const apiUrl = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );

     
    const apiData = await apiUrl.data

    let game = [{
      id: apiData.id,
      name: apiData.name,
      description: apiData.description_raw,
      image: apiData.background_image,
      released: apiData.released,
      rating: apiData.rating, 
      genres: apiData.genres.map( d => d.name),
      platforms: apiData.platforms.map( d => d.platform.name)
  }]
             
  game.length ?            //Si encuentra los resultados que pedi que me los devuelva y en caso de que no, una alerta
  res.status(200).json(game) :
  res.status(404).send('juego por ID no encontrado')
    
    
   } else {
    //   let gameFound = await Videogame.findByPk(id, {  //Utilizo un findByPk para traer desde la DB todas las ID de los videogames
    //      include: [{
    //          model: Genre,               //Y tambien quiero que me incluya el modelo de Genre y Platform con el atributo name que esta definico en mi modelo
    //          attributes: ['name'],
    //          through : {
    //              attributes: [],
    //          },
    //      }]
    //  })
    //  var arreglo = []
    //  arreglo.push(gameFound)

      const game = await Videogame.findOne({
          where: {id: id}, 
          include: Genre
      })

      const videoGame = [{
        id: game.id,
        name: game.name,
         description: game.description,
         image: game.background_image,
         released: game.released,
         rating: game.rating, 
         genres: game.genres.map( d => d.name),
         platforms: game.platforms.map( d => d)
      }]

     res.status(200).json(videoGame)
 
   }
   

 } catch (error) {
    next(error)
 }
}
module.exports = {getIdGame}