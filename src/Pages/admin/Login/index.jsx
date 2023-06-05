import React from 'react'
import styles from './style.module.css'
const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <h1>Oculos plus Admin</h1>
        <p>2 anos proporcionando a melhor vista aos seus clientes</p>
      </div>
      <form className={styles.right_container}>
        <h1>Oculos plus</h1>
        <p>inicie sua sessao para aceder o painel administrativo</p>
        <input
          required
          type="email"
          placeholder="Digite seu email de acesso"
        />
        <input
          required
          type="password"
          placeholder="Digite seu password de acesso"
        />
        <button>iniciar sessao</button>
      </form>
    </div>
  )
}

export default Login
