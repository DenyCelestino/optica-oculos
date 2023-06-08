import React, { useContext, useEffect, useState } from 'react'
import styles from './style.module.css'
import axios from 'axios'
import Wrapper from '../../../components/Usually/Wrapper'
import MyContext from '../../../contexts/MyContext'
import { MdDownloadDone } from 'react-icons/md'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
const ListSchedule = () => {
  const [schedules, setSchedules] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const { ENDPOINT } = useContext(MyContext)

  useEffect(() => {
    getSchedules()
  }, [])

  async function getSchedules() {
    try {
      setLoading(true)
      let res = await axios.get(`${ENDPOINT}get_schedules.php`)
      setSchedules(res.data)
      console.log(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }

  const getFilter = event => {
    setSearch(event.target.value)
  }

  const filtrarDados = () => {
    return schedules.filter(item =>
      item.bi_number.toLowerCase().includes(search.toLowerCase())
    )
  }

  const dadosFiltrados = filtrarDados()

  function Confirm(id) {
    Swal.fire({
      title: 'Deseja marcar como consulta realizada',
      text: 'Tem certeza que deseja marcar como consulta realizada ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Marcar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        Mark(id)
      }
    })
  }
  async function Mark(id) {
    try {
      setLoading(true)
      let res = await axios.post(
        `${ENDPOINT}confirm_consult.php`,
        JSON.stringify({ id: id })
      )

      setLoading(false)
      if (res.data == true) {
        toast.success('Consulta realizada')
        getSchedules()
      } else {
        toast.error(
          'Erro ao marcar consulta marcada, tente novamente ou contacte o suporte tecnico'
        )
      }
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <Wrapper>
        <h4>Agendas marcadas</h4>
        <p>
          Todas as consultas aqui despostas sao consultas a serem
          feitas em uma data futura, os clientes proprietarios recebem
          notificacao 2 dias antecipadamente para o efeito.
        </p>
        <input
          type="text"
          placeholder="Filtrar a consulta por Bilhete de identidade"
          value={search}
          onChange={getFilter}
        />
        {schedules.length > 0 && (
          <table>
            <tr>
              <th>ORD</th>
              <th>NOME</th>
              <th>BILHETE</th>
              <th>Quantidade</th>
              <th>CELULAR</th>
              <th>FUNCAO</th>
            </tr>

            {dadosFiltrados.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.bi_number}</td>
                <td>{item.date}</td>
                <td>{item.phone}</td>
                <td>
                  <button onClick={() => Confirm(item.id)}>
                    <MdDownloadDone size={30} color="#447bcd" />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        )}
      </Wrapper>
    </div>
  )
}

export default ListSchedule
