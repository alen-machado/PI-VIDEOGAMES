const initialState = {
    videoGames: [],
    allVideoGames: [],
    genres: [],
    platforms: [],
    detail:[]

}

export default function rootReducer(state = initialState, action) {
    switch(action.type){

        case 'GET_VIDEGAMES':
        return{
            ...state,
            videoGames: action.payload,
            allVideoGames: action.payload
        }

        case 'GET_BY_NAME':
            return{
                ...state,
                videoGames: action.payload
            } 
                 
        case 'POST_GAME':
            return{
                ...state
            }    

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        
        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            }   
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }
            
        case 'CLEAN_GAME_ID':
            return{
                ...state,
                detail: []
            }  
        case 'DELETE_GAME':
            return {
                ...state,
                videoGames: state.videoGames.filter( e=> e.id !== action.payload )
            }      

        case 'FILTER_GENRES':
            const copy = state.allVideoGames
            const result = action.payload === 'All' ? copy : copy.filter(e => e.genres.includes(action.payload))
            return{
                ...state,
               videoGames: result 
            }  
         
       
        case 'CREATED_BY':
            const copy1 = state.allVideoGames
            const createdby = action.payload === 'created' ? copy1.filter(e => e.createdDatabase) : copy1.filter(e => !e.createdDatabase)
            return {
                ...state,
                videoGames: action.payload === 'All' ? copy1 : createdby
            }   

        case 'ORDER_LETER':
            let sortName = action.payload === 'ascendente' ? 
            state.videoGames.sort(function (a, b){ 
                if (a.name > b.name){return 1}
                if (b.name > a.name){return -1}
                return 0; 
            }) :
                state.videoGames.sort(function(a, b){
                if (a.name > b.name){return -1}
                if (b.name > a.name){return 1}
                return 0
            })
                
            return{
                ...state,
                videoGames: action.payload === 'All' ? state.allVideoGames : sortName        
            } 

        case 'ORDER_RATING':

            let sortRating = action.payload === 'ascendente' ?
            state.videoGames.flat(2).sort((a,b) => {
                if (a.rating > b.rating){return 1}
                if (b.rating > a.rating){return -1}
                return 0
            }) :
            state.videoGames.flat(2).sort((a,b) => {
                if (a.rating > b.rating){return -1}
                if (b.rating > a.rating){return 1}
                return 0
            })
            return{
                ...state,
                videoGames: action.payload === 'All' ? state.allVideoGames : sortRating
            }    

        default:
            return { ...state}
    }
  
}