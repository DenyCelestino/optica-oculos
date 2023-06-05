import React from 'react'
import styles from './style.module.css'
const Wrapper = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default Wrapper
