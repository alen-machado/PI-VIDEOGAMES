const {getApiInfo} = require('../controllers/getApiInfo')
const {getDataBase} = require('../controllers/getDataBase')


const getAllGames = async () => {

    
    const api = await getApiInfo()
    const db = await getDataBase()
    const both = api.concat(db)
    return both
    

}
module.exports = {getAllGames}