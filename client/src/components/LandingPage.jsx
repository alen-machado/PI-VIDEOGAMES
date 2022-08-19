import React from 'react'
import {Link} from 'react-router-dom'
import   '../styles/LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className='landing'>
      <h1 >BIENVENIDOS</h1>
            <Link to='/home'>
                <button className='botton'>EMPECEMOS!</button>
            </Link>
    </div>
    )
}