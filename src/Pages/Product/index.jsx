import React, { useContext, useEffect, useState } from 'react'
import Wrapper from '../../components/Usually/Wrapper'
import styles from './style.module.css'
import Header from '../../components/Universal/Header'
import { CiDeliveryTruck } from 'react-icons/ci'
import { BiSupport } from 'react-icons/bi'
import Modal from '../../components/Usually/Modal'
import MyContext from '../../contexts/MyContext'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { MoonLoader } from 'react-spinners'
import Swal from 'sweetalert2'

const Product = () => {
  const params = useParams()
  const { handleModal, setHandleModal } = useContext(MyContext)

  const { ENDPOINT } = useContext(MyContext)

  const [product, setProduct] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [text, setText] = useState('')
  const [readmore, setReadMore] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bi, setBi] = useState('')

  function increment() {
    if (quantity > product.quantity || quantity == product.quantity) {
      toast.warn(`So existe ${product.quantity} desse producto`)
      setQuantity(product.quantity)
    } else {
      setQuantity(quantity + 1)
    }
  }
  function decrement() {
    if (quantity < 1 || quantity == 1) {
      setQuantity(1)
    } else {
      setQuantity(quantity - 1)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  async function getProduct() {
    try {
      setLoading(true)
      let res = await axios.post(
        `${ENDPOINT}user_get_product.php`,
        JSON.stringify({ id: params.id })
      )
      setProduct(res.data)
      setText(res.data.description.substring(0, 500))
      console.log(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error)
    }
  }
  async function buy(e) {
    e.preventDefault()
    try {
      setLoading(true)
      let res = await axios.post(
        `${ENDPOINT}buy.php`,
        JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          product: params.id,
          productname: product.name,
          productprice: product.price,
          bi: bi,
          quantity: quantity
        })
      )
      setLoading(false)
      console.log(res.config.data)
      console.log(res.data)
      if (res.data == true) {
        setHandleModal(!handleModal)

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Compra efectuada com sucesso',
          showConfirmButton: false,
          timer: 4000
        })
        toast.success(
          'Voce pode verificar seu historico de compra na aba meu historico'
        )
        getProduct()
      } else if (res.data == false) {
        toast.success('Erro ao efectuar pagamento')
      } else {
        toast.success('Erro ao efectuar pagamento')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error)
    }
  }

  return (
    <div className={styles.main_container}>
      <Header />
      {handleModal && (
        <Modal>
          <form onSubmit={buy} className={styles.form}>
            <h4>Formulario de pagamento</h4>
            <p>
              Nota: Todos os dados aqui recolhidos são mantidos em
              segurança , privados e usados para comprovativo de
              compra.{' '}
            </p>
            <input
              required
              placeholder="Digite seu nome completo"
              className={styles.inputs}
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <input
              required
              placeholder="Digite seu número de bilhete de identificação"
              className={styles.inputs}
              onChange={e => setBi(e.target.value)}
              value={bi}
            />
            <input
              required
              type="email"
              placeholder="Digite seu email"
              className={styles.inputs}
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input
              required
              type="number"
              placeholder="Digite seu numero de celular +258"
              className={styles.inputs}
              onChange={e => setPhone(e.target.value)}
              value={phone}
            />
            <button disabled={isLoading}>
              {' '}
              {isLoading ? (
                <MoonLoader size={15} color="white" />
              ) : (
                'Concluir pagamento'
              )}
            </button>
          </form>
        </Modal>
      )}
      <div className={styles.container}>
        {isLoading && <MoonLoader size={15} color="cyan" />}
        <Wrapper>
          <div className={styles.minimal_container}>
            <div className={styles.left_container}>
              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                className={styles.image_container}
              >
                <img src={ENDPOINT + product.image} />
              </div>
            </div>
            {product && (
              <div className={styles.right_container}>
                <div
                  data-aos="fade-down"
                  className={styles.info_container}
                >
                  <h1>{product.name}</h1>
                  {<p>{!readmore ? text : product.description}</p>}
                  {product.description?.length > 500 && (
                    <p
                      style={{
                        fontSize: 14,
                        color: 'blue',
                        cursor: 'pointer'
                      }}
                      onClick={() => setReadMore(!readmore)}
                    >
                      {readmore ? 'Ler Menos' : 'Ler mais'}
                    </p>
                  )}
                </div>
                <div className={styles.info_container}>
                  <span>{product.price} MT</span>
                  <div className={styles.quantity_contaienr}>
                    <button onClick={decrement}>-</button>
                    <p>{quantity}</p>
                    <button onClick={increment}>+</button>
                  </div>
                </div>
                <button
                  onClick={() => setHandleModal(true)}
                  className={styles.buy_button}
                >
                  Comprar
                </button>
                <p>
                  Todos nossos productos sao de extrema qualidade e
                  primeira mao
                </p>
                <span className={styles.works}>
                  <CiDeliveryTruck size={30} /> Fazemos entrega ao
                  domicilio
                </span>
                <span className={styles.works}>
                  <BiSupport size={30} /> Suporte tecnico 24/7
                </span>
              </div>
            )}
          </div>
        </Wrapper>
      </div>
    </div>
  )
}

export default Product
