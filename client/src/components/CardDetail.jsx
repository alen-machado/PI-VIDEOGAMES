import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetail, cleanGameId } from '../actions/index'
import { useEffect } from 'react'
import s from '../styles/CardDetail.module.css'

export default function CardDetail(){
    const { id } = useParams();

  const dispatch = useDispatch()
  const game = useSelector((state) => state.detail)

  useEffect(() => {
    dispatch(getDetail(id))
    dispatch(cleanGameId())
  },[dispatch, id])

  function handleClick(e){
    e.preventDefault()
    dispatch(getDetail(id))
  }
 
    return (
        <div  key={id}>

            <div>

            <Link to='/create'>
            <button>Crear Actividad</button>
            </Link>

            <Link to={'/home'}>
            <button>Home</button>
            </Link>

           <button onClick={e => {handleClick(e)}}>Volver a cargar</button>

           </div>

           <div >
            {
                game.length > 0 ?
                <div className={s.conteiner}>
                    <h1 className={s.title}>{game[0].name.toLowerCase()}</h1>
                    <img className={s.img} src={game[0].image? game[0].image : "https://cdn.dribbble.com/users/458522/screenshots/5864883/media/4ee7891e185fdc7723f31a9a0287e492.jpg?compress=1&resize=400x300&vertical=top"} alt="img not found" width="350px" height="300px"/>
                    <h3 >Fecha de Lanzamiento: {game[0].released} </h3>
                    <h3 >Rating: {game[0].rating} </h3>
                    <h3 >Plataformas Disponibles: {game[0].platforms.join(', ')} </h3>
                    <h3 >Descripcion: {game[0].description} </h3>
                     <h3> Generos: {game[0].genres.join(', ')}</h3> 
{/* 
                    <div className={s.generos}>
                    </div>     */}
                    
                </div> : <p className={s.loading} >Loading...</p>
            }
           </div>
        </div>
    )
}