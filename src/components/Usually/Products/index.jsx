import React, { useContext, useEffect, useState } from 'react'
import Wrapper from '../Wrapper'
import styles from './style.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MyContext from '../../../contexts/MyContext'
import { toast } from 'react-toastify'
import { MoonLoader } from 'react-spinners'

const Products = () => {
  const { ENDPOINT } = useContext(MyContext)

  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    try {
      setLoading(true)
      let res = await axios.get(`${ENDPOINT}admin_get_products.php`)
      setProducts(res.data)
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
        <h1>óculos de tendências para ti.</h1>
        <div className={styles.gleasses_container}>
          {isLoading && <MoonLoader size={15} color="cyan" />}
          {products.map((item, index) => (
            <Link
              to={`/product/${item.id}`}
              data-aos="zoom-in-up"
              className={styles.card}
              key={index}
            >
              <div className={styles.image_container}>
                <img src={ENDPOINT + item.image} />
              </div>
              <div className={styles.glasses_info}>
                <div className={styles.main_info}>
                  <span>
                    {item.name.length > 15
                      ? item.name.substring(0, 15) + '...'
                      : item.name}
                  </span>
                  <span>{item.price} MT</span>
                </div>
                <p>
                  {item.description.length > 100
                    ? item.description.substring(0, 100) + '...'
                    : item.description}
                </p>
                <Link
                  to={`/product/${item.id}`}
                  className={styles.button}
                >
                  Comprar
                </Link>
              </div>
            </Link>
          ))}
        </div>
        {/* <div className={styles.get_more_container}>
          <button>ver mais resultados</button>
        </div> */}
      </Wrapper>
    </div>
  )
}

export default Products
