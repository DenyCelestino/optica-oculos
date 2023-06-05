import React from 'react'
import styles from './style.module.css'
import Header from '../../components/Universal/Header'
import Hero from '../../components/Universal/Hero'
import Products from '../../components/Usually/Products'
import Footer from '../../components/Footer'
import Copyright from '../../components/Copyright'
import Modal from '../../components/Usually/Modal'
const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <Footer />
      <Copyright />
    </>
  )
}

export default Home
