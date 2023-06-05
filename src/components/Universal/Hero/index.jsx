import React, { useState } from 'react'
import styles from './style.module.css'
import Wrapper from '../../Usually/Wrapper'
import BG from './assets/bg.jpg'
import { Link } from 'react-router-dom'

const Hero = () => {


  return (
    <div className={styles.container}>
      <img className={styles.background} src={BG}/>
      <Wrapper>
        <div className={styles.info_wrapper}>
        <h1>Optica oculos</h1>
        <p>"Compre óculos de qualidade e agende consultas oftalmológicas, 
        tudo isso sem sair do conforto da sua casa!"</p>
         <Link className={styles.button} to="#">
         Comprar agora
         </Link>
        </div>
     
      
      </Wrapper>
 
    </div>
  )
}

export default Hero