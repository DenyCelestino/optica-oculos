import React, { useContext, useState } from 'react'
import Header from '../../components/Universal/Header'
import styles from './style.module.css'
import Wrapper from '../../components/Usually/Wrapper'
import schedule from './assets/schedule.png'
import { MoonLoader } from 'react-spinners'

import axios from 'axios'
import { toast } from 'react-toastify'
import MyContext from '../../contexts/MyContext'
import Swal from 'sweetalert2'

const Schedule = () => {
  const [name, setName] = useState('')
  const [bi, setBi] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [isLoading, setLoading] = useState(false)
  const { ENDPOINT } = useContext(MyContext)

  async function agend(e) {
    e.preventDefault()
    try {
      setLoading(true)
      let res = await axios.post(
        `${ENDPOINT}schedule.php`,
        JSON.stringify({
          name: name,
          phone: phone,
          bi: bi,
          date: date
        })
      )
      setLoading(false)
      console.log(res.config.data)
      console.log(res.data)
      if (res.data == true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:
            'Agendou consulta com sucesso, enviaremos lembrete para seu contacto 1 dia antes',
          showConfirmButton: false,
          timer: 4000
        })
      } else if (res.data == 'invalid date') {
        toast.warn('Escolha uma data no futuro')
      } else if (res.data == 'have') {
        toast.warn('Voce ja agendou uma consulta nessa data')
      } else {
        toast.error(
          'Erro ao agendar consulta , tente novamente ou contacte o suporte tecnico'
        )
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error)
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Wrapper>
          <div className={styles.minimal_container}>
            <form onSubmit={agend} className={styles.left_container}>
              <h4>Formulario para agendar consulta</h4>
              <input
                required
                placeholder="Digite seu nome completo"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="Digite seu celular"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Numero de bilhete de identidade"
                value={bi}
                onChange={e => setBi(e.target.value)}
              />
              <div className={styles.box_input}>
                <label>
                  Escolha a data que pretende realizar a consulta
                </label>
                <input
                  type="date"
                  required
                  placeholder="Selecione a data"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
              <button disabled={isLoading}>
                {' '}
                {isLoading ? (
                  <MoonLoader size={15} color="white" />
                ) : (
                  'Concluir pagamento'
                )}
              </button>
            </form>
            <div className={styles.right_container}>
              <img src={schedule} />
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  )
}

export default Schedule
