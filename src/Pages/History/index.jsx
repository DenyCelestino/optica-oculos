import React, { useState } from 'react'
import Header from '../../components/Universal/Header'
import styles from './style.module.css'
import Wrapper from '../../components/Usually/Wrapper'
import { toast } from 'react-toastify'
import { MoonLoader } from 'react-spinners'
import { useContext } from 'react'
import MyContext from '../../contexts/MyContext'
import axios from 'axios'

const History = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState('')
  const [isLoading, setLoading] = useState(false)

  const { ENDPOINT } = useContext(MyContext)

  async function getHistory(e) {
    e.preventDefault()
    try {
      setLoading(true)
      let res = await axios.post(
        `${ENDPOINT}user_get_history.php`,
        JSON.stringify({ bi: search })
      )
      setLoading(false)
      console.log(res.config.data)
      if (res.data.response == true) {
        setResults(res.data.items)
        console.log(res.data)
      } else if (res.data.response == false) {
        toast.warn('Historico nao encontrado')
      }
    } catch (error) {
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
            <h4>Meu historico</h4>
            <p>
              Digite seu numero de bilhete de identificacao abaixo
              para buscar seu historico
            </p>
            <div className={styles.tips}>
              <div
                style={{ backgroundColor: 'cyan' }}
                className={styles.dot}
              />
              <span>Consultas</span>
              <div
                style={{ backgroundColor: 'orange' }}
                className={styles.dot}
              />
              <span>Compras</span>
            </div>
            <form onSubmit={getHistory}>
              <input
                required
                type="text"
                placeholder="Digite seu numero de BI"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button>
                {' '}
                {isLoading ? (
                  <MoonLoader size={15} color="white" />
                ) : (
                  'Buscar historico'
                )}
              </button>
            </form>
            {results.length > 0 && (
              <>
                {results.map((item, index) => (
                  <div className={styles.histories} key={index}>
                    <div className={styles.histories_description}>
                      <span>{item.date} - </span>
                      <span>{item.description}</span>
                    </div>

                    <div className={styles.price}>
                      {item.type != 'consult' && (
                        <span>{item.price} MT</span>
                      )}
                      <div
                        style={{
                          backgroundColor:
                            item.type == 'consult' ? 'cyan' : 'orange'
                        }}
                        className={styles.dot}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </Wrapper>
      </div>
    </>
  )
}

export default History
