import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from '../styles/CreateGame.module.css'
import { postGame, getPlatforms } from '../actions/index'


export default function CreateGame(){

const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPlatforms())
    }, [dispatch])

    const plataformas = useSelector((state) => state.platforms)

    

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name:'',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        genres: []
       })

    function handleSubmit(e){
        e.preventDefault()
        // if(!errors){
          dispatch(postGame(input))
          alert('Actividad Creada')
        // } else {
        //   alert('primero debes llenar todo el formulario')
        // }
        setInput({
            name:'',
            description: '',
            released: '',
            rating: '',
            platforms: [],
            genres: []
        })
        
       }

       function handleChange(e) {
        setInput({
          ...input,
          [e.target.name] : e.target.value
        })
        // setErrors(validate({
        //  ...input,
        //  [e.target.name] : e.target.value
        // }))
       }  
       
       function handleSelect(e){
        setInput({
          ...input,
          platforms:[...input.platforms, e.target.value]
        })
       }

    function removePlatform(e){
        e.preventDefault();
      setInput({
        ...input,
        platforms: input.platforms.filter(
          (c) => c !== e.target.name
        ),
      })
    }   
       
    return (
        <div>
            <Link to='/home'>
            <button>Volver al Home!</button>
            </Link>

            <h1 className={s.title}>Vamos a crear nuestro VideoJuego!</h1>
            <div className={s.otroDiv}>

              <form  className={s.conteiner} onSubmit={e => handleSubmit(e)}>
      {/* -------------------------   NAME       */}
              <div>
                  <input type='text' name="name" value={input.name} autoComplete="off" placeholder="Nombre del VideoJuego..." onChange={e => {handleChange(e)}}/>
                   {/* {errors.name && (
                  <p className='error' >{errors.name}</p>
                  )} */}
             </div>
      {/* -------------------------   DESCRIPTION        */}
             <div>
                <input type='text' name="description" value={input.description} autoComplete="off" placeholder="Descripcion del VideoJuego..." onChange={e => {handleChange(e)}}></input>
             </div>
     {/* -------------------------   RATING        */}
             <div>
                <input type='number' name="rating" value={input.rating} autoComplete="off" placeholder="Rating del VideoJuego..." onChange={e => {handleChange(e)}}></input>
             </div>
{/* -------------------------   RELEASED       */}
             <div>
                <input type='date' name="released" value={input.released} autoComplete="off" placeholder="Fecha de Lanzamiento..." onChange={e => {handleChange(e)}}></input>
             </div>
{/* -------------------------   PLATAFORMAS       */}
             <div>
                <select className={s.select} onChange={e => {handleSelect(e)}} >
                <option hidden>Plataformas</option>
                {
                plataformas?.map((p,i) =>  {
                    return(
                        <option key={i} name={p} value={p}>{p}</option>
                    )
                })
                }
                </select>
                <ul>
                    {
                        input.platforms?.map(el => {
                            let name = plataformas?.map((e) =>  e === el? e : null  )
                            return(
                                <div key={el}>
                                    <span className="lista">{name}</span>
                                     <button name={el} className="closeButton" onClick={(e) => { removePlatform(e) }}>❌</button> 
                                </div>
                            )
                        })
                    }
                </ul>
             </div>

             {/* <div>
                <ul>
                    {
                        input.platforms?.map(el => {
                            let name = plataformas?.map((e) =>  e === el? e : null  )
                            return(
                                <div key={el}>
                                    <span className="lista">{name}</span>
                                     <button name={el} className="closeButton" onClick={(e) => { removePlatform(e) }}>❌</button> 
                                </div>
                            )
                        })
                    }
                </ul>
             </div> */}
{/* -------------------------   GENEROS      */}
            <div>
            <select className={s.select} onChange={e => {handleSelect(e)}} >
                <option hidden>Generos</option>
            </select>
           </div>

             <button type='submit' onClick={e => handleSubmit(e)} >Crear VideoJuego</button>

          </form>  
        </div>

        </div>
    )
}