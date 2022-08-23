import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from '../styles/CreateGame.module.css'
import { postGame, getPlatforms, getGenres } from '../actions/index'

 function validate(input){
   let errors = {}
   if(!input.name){
     errors.name = 'Se requiere un Nombre'
   } else if (!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.name)){
    errors.name = "Nombre invalido"
   }

    if(!input.description){
      errors.description = 'Se requiere una Descripcion'
    }

    if(!input.rating){
        errors.rating = 'Se requiere un Rating entre el 1 y 5'
    } else if(input.rating > 5 || input.rating < 1 ){
      errors.rating = 'Se requiere un Rating entre el 1 y 5'
   }

    if(!Date.parse(input.released)){
      errors.released = "La fecha de lanzamiento es requerida";
    }

    if (!urlImg(input.image)) {
      errors.image = "La URL no es valida";
    }

    if(!input.platforms[0]){
      errors.platforms = "Es requeria al menos 1 plataforma"
   }
   if(repetidos(input.platforms)){
      errors.platforms = "No se pueden repetir las plataformas"
   }

   if(!input.genres[0]){
    errors.genres = "Es requeria al menos 1 genero"
 }
 if(repetidos(input.genres)){
    errors.genres = "No se pueden repetir los generos"
 }

    
   return errors

 }

  const urlImg = (url) => {
    return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url);
  }

 function repetidos(array){
   return new Set(array).size!==array.length
 }




export default function CreateGame(){

const dispatch = useDispatch()

 const [errors, setErrors] = useState({})

    useEffect(()=>{
        dispatch(getPlatforms())
        dispatch(getGenres())
    }, [dispatch])

    const plataformas = useSelector((state) => state.platforms)
    const generos = useSelector((state) => state.genres)

    

   

     const [input, setInput] = useState({
        name:'',
        description: '',
        released: '',
        rating: '',
        image: '',
        platforms: [],
        genres: []
       })

     function handleChange(e) {
        setInput({
          ...input,
          [e.target.name] : e.target.value
        })
         setErrors(validate({
          ...input,
          [e.target.name] : e.target.value
         }))
       }  

       function handleSelect(e){
        setInput({
          ...input,
          platforms:[...input.platforms, e.target.value],
          
        })
        setErrors(validate({
          ...input,
          platforms:[...input.platforms, e.target.value],
        }))
       }

       function handleSelect2(e){
        setInput({
            ...input,
            genres:[...input.genres, e.target.value]
        })
        setErrors(validate({
          ...input,
          genres:[...input.genres, e.target.value]
        }))
       }

     function handleSubmit(e){
        e.preventDefault()
          if(Object.keys(errors).length !== 0){
            alert('Debes llenar el Formulario primero')
          
          } else {
           dispatch(postGame(input))
           alert('Actividad Creada')
          }
           setInput({
            name:'',
            description: '',
            released: '',
            rating: '',
            image: '',
            platforms: [],
            genres: []
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
    
    function removeGenre(e){
        e.preventDefault();
      setInput({
        ...input,
        genres: input.genres.filter(
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
                    {errors.name && (
                  <p className='error' >{errors.name}</p>
                  )} 
             </div>
      {/* -------------------------   DESCRIPTION        */}
             <div>
                <input type='text' name="description" value={input.description} autoComplete="off" placeholder="Descripcion del VideoJuego..." onChange={e => {handleChange(e)}}></input>
                 {errors.description && (
                  <p className='error' >{errors.description}</p>
                )} 
             </div>
     {/* -------------------------   RATING        */}
             <div>
                <input type='number' name="rating" value={input.rating} autoComplete="off" placeholder="Rating del VideoJuego..." onChange={e => {handleChange(e)}}></input>
                 {errors.rating && (
                  <p className='error' >{errors.rating}</p>
                )} 
             </div>
{/* -------------------------   RELEASED       */}
             <div>
                <input type='date' name="released" value={input.released} autoComplete="off" placeholder="Fecha de Lanzamiento..." onChange={e => {handleChange(e)}}></input>
                 {errors.released && (
                  <p className='error' >{errors.released}</p>
                )} 
             </div>

  {/* -------------------------   IMAGEN      */}
             <div>
                <input type='text' name="image" value={input.image} autoComplete="off" placeholder="URL de imagen..." onChange={e => {handleChange(e)}}></input>
                 {errors.image && (
                  <p className='error' >{errors.image}</p>
                )} 
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
{/* -------------------------   GENEROS      */}
            <div>
            <select className={s.select} onChange={e => {handleSelect2(e)}} >
                <option hidden>Generos</option>
                {
                generos?.map((e, i) => {
                return (<option value={e.name} key={i}>{e.name}</option>)
            })
        }
            </select>
            <ul>
                    {
                        input.genres?.map(el => {
                            let name1 = generos?.map((e) =>  e.name === el? e.name : null  )
                            
                            return(
                                <div key={el}>
                                    <span className="lista">{name1}</span>
                                     <button name={el} className="closeButton" onClick={(e) => { removeGenre(e) }}>❌</button>  
                                </div>
                            )
                        })
                    }
                </ul>
           </div>
{/* -------------------------   BOTON     */}
             <button type='submit' onClick={e => handleSubmit(e)} >Crear VideoJuego</button>
          
          </form>  
        </div>

        </div>
    )
}