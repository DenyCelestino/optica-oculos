import React from 'react'
import styles from './style.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import MyContext from '../../../contexts/MyContext'
import Logo from '../../../assets/logo.jpg'
const Sidebar = ({ children }) => {
  const { currentRoute, setCurrentRoute } = useContext(MyContext)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} />
      </div>
      <div className={styles.screen}>
        <div className={styles.sidebar}>
          <ul>
            <Link
              to={'/admin/dashboard'}
              onClick={() => setCurrentRoute('dashboard')}
              style={{
                backgroundColor:
                  currentRoute == 'dashboard' && '#447BCD',
                color: currentRoute == 'dashboard' && '#FFF'
              }}
            >
              Dashboard
            </Link>

            <Link
              to={'/admin/addproducts'}
              onClick={() => setCurrentRoute('addproducts')}
              style={{
                backgroundColor:
                  currentRoute == 'addproducts' && '#447BCD',
                color: currentRoute == 'addproducts' && '#FFF'
              }}
            >
              Produtos
            </Link>

            <Link
              to={'/admin/listschedule'}
              onClick={() => setCurrentRoute('listschedule')}
              style={{
                backgroundColor:
                  currentRoute == 'listschedule' && '#447BCD',
                color: currentRoute == 'listschedule' && '#FFF'
              }}
            >
              Consultas agendadas
            </Link>
            <Link
              to={'/admin/buys'}
              onClick={() => setCurrentRoute('buys')}
              style={{
                backgroundColor: currentRoute == 'buys' && '#447BCD',
                color: currentRoute == 'buys' && '#FFF'
              }}
            >
              compras
            </Link>
          </ul>
        </div>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Sidebar
