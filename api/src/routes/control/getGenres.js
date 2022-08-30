const { Genre } = require("../../db")
require("dotenv").config();
const {API_KEY} = process.env;
const axios = require('axios');



const getGenres = async (req, res, next) => {
try {
    const genresDb = await Genre.findAll();
    if(!genresDb.length) {
        const genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

        const genresMap = genres.data.results?.map((genre) => { 
            return {
                
             name: genre.name
           };
         });  
         
         const addGenres = await Genre.bulkCreate(genresMap);
         return res.status(200).send(addGenres); 
    } else {
        res.status(200).send(genresDb)
    }
    
    
} catch (error) {
    next(error)
}
}
module.exports = {getGenres}