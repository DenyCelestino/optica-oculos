import React, { useContext } from 'react'
import styles from './style.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import MyContext from '../../../contexts/MyContext'

const ModalSchedule = ({ children }) => {
  const { handleModalSchedule, setHandleModalSchedule } =
    useContext(MyContext)

  return (
    <div className={styles.container}>
      <div data-aos="fade-down" className={styles.modal}>
        <div className={styles.headerModal}>
          <AiOutlineClose
            onClick={() => setHandleModalSchedule(false)}
            className={styles.closeModal}
            size={24}
          />
        </div>

        {children}
      </div>
    </div>
  )
}

export default ModalSchedule
