require("dotenv").config();
const {API_KEY} = process.env;

const axios = require('axios');
    
    const getApiInfo = async () => {
     
        try {

          let arr = [1,2,3,4,5]
        arr = await Promise.all(arr.map(async num =>{
            let json = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${num}`);
            return json.data.results
        }))
        return arr.flat().map(v => {
            return {
                id:v.id, 
                name:v.name.toLowerCase(),
                released: v.released,
                rating: v.rating,
                platforms: v.platforms.map(p => p.platform.name),
                genres: v.genres.map((e) => e.name).join(', '),
                image: v.background_image
            }
        })
          } catch (e) {
            console.log(e);
          }
}
module.exports = {getApiInfo}
