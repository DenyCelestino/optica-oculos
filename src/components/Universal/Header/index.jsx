import React, { useContext, useState } from 'react'
import styles from './style.module.css'
import Wrapper from '../../Usually/Wrapper'
import { Link } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'
import { GiNotebook } from 'react-icons/gi'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import Modal from '../../Usually/Modal'
import MyContext from '../../../contexts/MyContext'
import Logo from './assets/logo.jpg'
const Header = () => {
  const [handleMobile, setHandleMobile] = useState(false)

  const { setHandleModalSchedule } = useContext(MyContext)
  return (
    <header>
      <Wrapper>
        <nav>
          <Link
            data-aos="fade-right"
            className={styles.logo}
            to={'/'}
          >
            <img src={Logo} />
          </Link>

          <ul className={styles.desktopMenu}>
            {/* <li>
              <Link>Promocao</Link>
            </li>
            <li>
              <Link>Sobre</Link>
            </li>
            <li>
              <Link>Contacto</Link>
            </li> */}
            <div className={styles.buttons}>
              <Link to={'/history'} className={styles.button}>
                <BsFillPersonFill />
                Meu historico
              </Link>
              <Link to={'/schedule'} className={styles.button}>
                <GiNotebook />
                Agendar consulta
              </Link>
            </div>
          </ul>
          {handleMobile && (
            <ul className={styles.mobileMenu}>
              <li>
                <Link>Promocao</Link>
              </li>
              <li>
                <Link>Sobre</Link>
              </li>
              <li>
                <Link>Contacto</Link>
              </li>
              <div className={styles.buttons}>
                <Link to={'/history'} className={styles.button}>
                  <BsFillPersonFill />
                  Meu historico
                </Link>
                <Link to={'/schedule'} className={styles.button}>
                  <GiNotebook />
                  Agendar consulta
                </Link>
              </div>
            </ul>
          )}
          <div className={styles.mobile_operators}>
            {!handleMobile ? (
              <AiOutlineMenu
                onClick={() => setHandleMobile(!handleMobile)}
              />
            ) : (
              <AiOutlineClose
                onClick={() => setHandleMobile(!handleMobile)}
              />
            )}
          </div>
        </nav>
      </Wrapper>
    </header>
  )
}

export default Header
