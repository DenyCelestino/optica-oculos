import React from 'react'
import styles from './style.module.css'
import Wrapper from '../../../components/Usually/Wrapper'
import {
  AiOutlineShoppingCart,
  AiOutlineSchedule
} from 'react-icons/ai'
import { MdPersonOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Wrapper>
        <div className={styles.content}>
          <Link className={styles.boxes}>
            <AiOutlineSchedule size={24} />
            <p>Consultas agendadas</p>
            <h3>20</h3>
          </Link>
          <Link className={styles.boxes}>
            <AiOutlineShoppingCart size={24} />
            <p>Compras pendentes</p>
            <h3>20</h3>
          </Link>
          <Link className={styles.boxes}>
            <MdPersonOutline size={24} />
            <p>Usuarios</p>
            <h3>20</h3>
          </Link>
        </div>
      </Wrapper>
    </div>
  )
}

export default Dashboard
