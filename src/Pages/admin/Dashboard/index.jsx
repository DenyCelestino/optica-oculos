import React, { useContext, useEffect, useState } from 'react'
import styles from './style.module.css'
import Wrapper from '../../../components/Usually/Wrapper'
import {
  AiOutlineShoppingCart,
  AiOutlineSchedule
} from 'react-icons/ai'
import { MdPersonOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import MyContext from '../../../contexts/MyContext'

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({})
  const [isLoading, setLoading] = useState(false)

  const { ENDPOINT, setCurrentRoute } = useContext(MyContext)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      setLoading(true)
      let res = await axios.get(`${ENDPOINT}get_dashboard.php`)
      setDashboard(res.data)
      console.log(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <Wrapper>
        <div className={styles.content}>
          <Link
            to={'/admin/listschedule'}
            onClick={() => setCurrentRoute('listschedule')}
            className={styles.boxes}
          >
            <AiOutlineSchedule size={24} />
            <p>Consultas agendadas</p>
            <h3>{dashboard.consults}</h3>
          </Link>
          <Link
            to={'/admin/buys'}
            onClick={() => setCurrentRoute('buys')}
            className={styles.boxes}
          >
            <AiOutlineShoppingCart size={24} />
            <p>Compras pendentes</p>
            <h3>{dashboard.buys}</h3>
          </Link>
          <Link className={styles.boxes}>
            <MdPersonOutline size={24} />
            <p>Usuarios</p>
            <h3>{dashboard.users}</h3>
          </Link>
        </div>
      </Wrapper>
    </div>
  )
}

export default Dashboard
