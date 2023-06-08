import React from 'react'
import styles from './style.module.css'
import Wrapper from '../Usually/Wrapper'
import { Link } from 'react-router-dom'
import { CiFacebook } from 'react-icons/ci'
import { AiOutlineInstagram } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className={styles.container}>
      <Wrapper>
        <div className={styles.footer_container}>
          <div className={styles.boxes}>
            <h4>Contacto</h4>
            <p>
              Nampula, Av 25 de setembro <br />
              3100, +258 877843116
            </p>
          </div>
          <div className={styles.boxes}>
            <h4>Social</h4>
            <Link>
              <CiFacebook /> Facebook
            </Link>
            <Link>
              <AiOutlineInstagram /> Instagram
            </Link>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Footer
