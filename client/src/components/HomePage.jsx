import React from 'react'
import { useEffect, useState} from 'react'
import { useDispatch, useSelector} from "react-redux"

import Card from './Card'
import NavBar from "./NavBar";
import Paginado from './Paginado'

import s from '../styles/Home.module.css'
import {getVideoGames} from '../actions/index'

export default function HomePage(){

    const dispatch = useDispatch()
    const videoGames = useSelector((state) => state.videoGames)
    
    useEffect(() => {
        dispatch(getVideoGames())  
      }, [dispatch] )

      const [ currentPage, setCurrentPage ] = useState(1) 
      const [ gamesPerPage, setGamesPerPage ] = useState(15)

  const indexOfLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = videoGames.slice(indexOfFirstGame, indexOfLastGame)

  const [order, setOrder] = useState("")
  const [name, setName] = useState("")

    return (
        <div className={s.container2}>
             <NavBar 
             setCurrentPage={setCurrentPage} 
             setOrder={setOrder}
             name={name}
             setName={setName}
             /> 

            <Paginado 
            gamesPerPage={gamesPerPage}
            videoGames={videoGames.length}  
            setCurrentPage={setCurrentPage}
            /> 
              
            <div>
                {
                  currentGames?.map(v => {
                    
                    return(
                        <div key={v.id} >
                        <Card id={v.id} name={v.name} genres={v.genres || v.genres.map(e => e.name)} rating={v.rating} image={v.image? v.image : 'https://cdn.dribbble.com/users/458522/screenshots/5864883/media/4ee7891e185fdc7723f31a9a0287e492.jpg?compress=1&resize=400x300&vertical=top'} />
                        </div>
                    )
                  })
                }
            </div>
        </div>
    )
}