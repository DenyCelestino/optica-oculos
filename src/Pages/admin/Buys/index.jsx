import React, { useContext, useEffect, useState } from 'react'
import styles from './style.module.css'
import axios from 'axios'
import Wrapper from '../../../components/Usually/Wrapper'
import MyContext from '../../../contexts/MyContext'
import { AiFillEye } from 'react-icons/ai'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const Buys = () => {
  const [schedules, setSchedules] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [selected, setSelected] = useState('')
  const [search, setSearch] = useState('')
  const { ENDPOINT } = useContext(MyContext)

  useEffect(() => {
    getBuys()
  }, [])

  async function getBuys() {
    try {
      setLoading(true)
      let res = await axios.get(`${ENDPOINT}get_buys.php`)
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
      title: 'Deseja marcar compra entregue',
      text: 'Tem certeza que deseja marcar compra entregue ?',
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
        `${ENDPOINT}confirm_delivery.php`,
        JSON.stringify({ id: id })
      )
      console.log(res.data)
      setLoading(false)
      if (res.data == true) {
        toast.success('Compra marcada como entregue')
        setSelected('')
        getBuys()
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
    <>
      {selected && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            {selected.product.map((item, index) => (
              <div key={index} className={styles.image_container}>
                <img src={ENDPOINT + item.image} />
                <span>{item.name}</span>
              </div>
            ))}
            <div style={{ width: '100%' }}>
              <h4>{selected.name}</h4>
              <p>BI: {selected.bi_number}</p>
              <p>Quantidade: {selected.quantity}</p>
            </div>
            <div className={styles.buttons_container}>
              <button onClick={() => Confirm(selected.id)}>
                Marcar como entregue
              </button>
              <button onClick={() => setSelected('')}>
                Fechar Modal
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <Wrapper>
          <h4>Compras</h4>
          <p>
            Todas as consultas aqui despostas sao consultas a serem
            feitas em uma data futura, os clientes proprietarios
            recebem notificacao 2 dias antecipadamente para o efeito.
          </p>
          <input
            type="text"
            placeholder="Pesquisar compra pelo numero de bi"
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
                <th>Status</th>

                <th>FUNCAO</th>
              </tr>
              <tbody>
                {dadosFiltrados.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.bi_number}</td>
                    <td>{item.quantity}</td>
                    <td
                      style={{
                        color: item.status ? 'green' : 'orange'
                      }}
                    >
                      {item.status ? 'Entregue' : 'Por entregar'}
                    </td>
                    <td>
                      <button onClick={() => setSelected(item)}>
                        <AiFillEye size={30} color="#447bcd" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Wrapper>
      </div>
    </>
  )
}

export default Buys
