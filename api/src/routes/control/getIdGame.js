const { getAllGames } = require("../controllers/getAllGames")
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
   if(id){
      const apiUrl = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
      console.log(apiUrlData)
    const apiData = apiUrl.data.map((v) => { 
             
      return {   
         id:v.id, 
         name:v.name,
         released: v.released,
         rating: v.rating,
         platforms: v.platforms.map(p => p.platform.name),
         genres: v.genres.map((e) => e.name),
         image: v.background_image
      };
      
    });
    
    res.json(apiData) ; 
   } else {
      res.send(' ID invalido')
   }
   

 } catch (error) {
    next(error)
 }
}
module.exports = {getIdGame}