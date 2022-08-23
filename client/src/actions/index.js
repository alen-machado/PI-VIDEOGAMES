import axios from 'axios'

export function getVideoGames(){
   return async function(dispatch){
    let json = await axios.get('http://localhost:3001/videogames')
    return dispatch({
        type:'GET_VIDEGAMES',
        payload: json.data
    })
   }
}

export function getByName(payload){
 return async function (dispatch){

    let json = await axios.get('http://localhost:3001/videogames?name=' + payload)

    return dispatch({
        type: 'GET_BY_NAME',
        payload: json.data
    })
 }
}

export function postGame(payload){
    return async function(dispatch){
        let json = await axios.post('http://localhost:3001/videogames', payload)
        return json
    }
}
export function getPlatforms(payload){
   return async function(dispatch){
    let json = await axios.get('http://localhost:3001/platforms')
    
    return dispatch({
        type: 'GET_PLATFORMS',
        payload: json.data
    })
   }
}

export function getGenres(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/genres')

        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function filterGenres(payload){
    return {
        type: 'FILTER_GENRES',
        payload
    }

}

export function getDetail(id){
    return async function (dispatch){
        
            let json = await axios.get('http://localhost:3001/videogames/' + id)
             
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })

    }
}

export function cleanGameId(){
    return {
        type: 'CLEAN_GAME_ID'
    }
}

export function deleteGame(id){
    return async function (dispatch){
        
        let json = await axios.delete('http://localhost:3001/videogames/' + id)
         
        return dispatch({
            type: 'DELETE_GAME',
            payload: json.data
        })

}
}
export function createdBy(payload){
    return {
           type: 'CREATED_BY',
           payload
       }

   
}

export function orderByLeter(payload){
    return {
        type: 'ORDER_LETER',
        payload
    }

}

export function orderByRating(payload){
    return {

        type: 'ORDER_RATING',
        payload
    }
}