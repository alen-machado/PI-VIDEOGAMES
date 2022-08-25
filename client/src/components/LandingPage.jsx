import React from 'react'
import {Link} from 'react-router-dom'
import s from '../styles/LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className={s.landing}>
      <h1 className={s.title}>BIENVENIDOS</h1>
            <Link to='/home'>
                <button className={s.botton}>EMPECEMOS!</button>
            </Link>
    </div>
    )
}