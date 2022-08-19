import React from 'react'
import s from '../styles/Paginado.module.css'

export default function Paginado({ gamesPerPage, videoGames, setCurrentPage }){
    const pageNumbers = []

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    for (let i = 1; i <= Math.ceil(videoGames/gamesPerPage); i++){
       pageNumbers.push(i)
    }
    return (
        <nav className={s.nav}>
    <ul className={s.paginado}>
        { 
        pageNumbers && pageNumbers.map(number => {
           return (
            <li className={s.number} key={number}>
                <p className={s.current} onClick={() => paginado(number)} >{number}</p>
            </li>
              
                 )
            
        })
        }
    </ul>
   </nav>
    )
}