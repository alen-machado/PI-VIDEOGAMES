import React from 'react'
import { Link } from "react-router-dom"

import s from '../styles/Card.module.css'

export default function Card({id, name, image, genres, rating}){
    return (
        <div key={id} className={s.conteiner}>

            <h3 className={s.name}>{name}</h3>
            <img className={s.img} src={image} alt="img not found" width="350px" height="300px"/>
            <h3 className={s.temp} >Generos: {genres}</h3> 
            <h3 className={s.temp} >Rating: {rating}</h3> 

            <Link to={`/home/${id}`}>
          <button className={s.button}>DETALLE</button>
         </Link>
        </div>
    )
}