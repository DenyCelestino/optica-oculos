import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Wrapper from '../../../components/Usually/Wrapper'
import { RiEditBoxLine } from 'react-icons/ri'
import { AiOutlineDelete } from 'react-icons/ai'
import { RiUploadCloudFill } from 'react-icons/ri'
import imageCompression from 'browser-image-compression'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

import { useContext } from 'react'
import MyContext from '../../../contexts/MyContext'
import { MoonLoader } from 'react-spinners'

import axios from 'axios'

const Addproducts = () => {
  const [handleModal, setHandleModal] = useState(false)
  const [handleModalEdit, setHandleModalEdit] = useState(false)
  const [nameproduct, setNameProduct] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [selected, setSelected] = useState('')

  const [vector, setVector] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const { ENDPOINT } = useContext(MyContext)

  useEffect(() => {
    getProducts()
  }, [])

  async function getBase64(file) {
    console.log(file)
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async function () {
      setVector(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const convert = async event => {
    event.preventDefault()

    const data = event.target.files[0]

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920
    }
    try {
      const compressedFile = await imageCompression(data, options)
      await getBase64(compressedFile)
    } catch (error) {
      console.log(error)
    }
  }

  function COnfirmRemove(id, image) {
    Swal.fire({
      title: 'Deseja remover producto ?',
      text: 'Tem certeza que deseja remover esse producto ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        removeProducts(id, image)
      }
    })
  }
  async function removeProducts(id, image) {
    try {
      setLoading(true)

      let res = await axios.post(
        `${ENDPOINT}admin_remove_product.php`,
        JSON.stringify({
          product: id,
          oldimage: image
        })
      )
      console.log(res.config.data)
      console.log(res.data)
      setLoading(false)
      if (res.data == true) {
        toast.success('produto removida com sucesso')
        getProducts()
      } else if (res.data == false) {
        toast.error(
          'Erro ao remover produto, tente novamente, ou contacte o suporte tecnico'
        )
      } else {
        toast.error(
          'Aconteceu algum erro inesperado, tente novamente mais tarde!'
        )
      }
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }

  async function getProducts() {
    try {
      setLoading(true)
      let res = await axios.get(`${ENDPOINT}admin_get_products.php`)
      setProducts(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }
  async function upload(e) {
    e.preventDefault()

    try {
      setLoading(true)
      let fileName = Math.floor(Math.random() * 100000)
      let body = JSON.stringify({
        image: JSON.stringify(vector.split(';base64,')[1]),
        format: 'jpg',
        name: fileName,
        productname: nameproduct,
        quantity: quantity,
        description: description,
        price: price
      })
      let res = await axios.post(`${ENDPOINT}addproduct.php`, body)

      setLoading(false)
      console.log(res.data)
      if (res.data.response == true) {
        toast.success('Produto cadastrado com sucesso')
        getProducts()
        setHandleModal(!handleModal)
        setVector(null)
        setName('')
        setDescription('')
        setPrice('')
        setQuantity('')
      } else if (res.data.response == false) {
        toast.error('Erro ao cadastrar produto')
      } else if (res.data == 'no moved') {
        toast.error(
          'upps aconteceu um problema ao guardar a imagem, tente novamente, ou contacte o suporte tecnico'
        )
      } else {
        toast.error(
          'Aconteceu algum erro inesperado, tente novamente mais tarde!'
        )
      }
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }
  async function update(e) {
    e.preventDefault()
    if (
      selected.name == nameproduct &&
      selected.description == description &&
      selected.price == price &&
      selected.quantity == quantity &&
      vector == null
    ) {
      toast.warn('Sem nenhuma alteracao')
    } else {
      try {
        setLoading(true)
        let fileName = Math.floor(Math.random() * 100000)
        let body = JSON.stringify({
          image: vector
            ? JSON.stringify(vector.split(';base64,')[1])
            : '',
          format: 'jpg',
          id: selected.id,
          name: fileName,
          productname: nameproduct,
          quantity: quantity,
          description: description,
          price: price,
          oldimage: selected.image
        })

        let res = await axios.post(
          `${ENDPOINT}admin_edit_product.php`,
          body
        )

        setLoading(false)
        console.log(res.data)
        console.log(res.config.data)
        if (res.data.response == true) {
          toast.success('Produto actualizado com sucesso')
          getProducts()
          setHandleModalEdit(!handleModalEdit)
          setVector(null)
          setName('')
          setDescription('')
          setPrice('')
          setQuantity('')
        } else if (res.data.response == false) {
          toast.error('Erro ao actualizar produto')
        } else if (res.data == 'no moved') {
          toast.error(
            'upps aconteceu um problema ao guardar a imagem, tente novamente, ou contacte o suporte tecnico'
          )
        } else {
          toast.error(
            'Aconteceu algum erro inesperado, tente novamente mais tarde!'
          )
        }
      } catch (error) {
        setLoading(false)
        toast.error(error)
      }
    }
  }

  // data-aos="fade-down"
  return (
    <div className={styles.container}>
      {handleModal && (
        <div className={styles.modal}>
          <div className={styles.content_modal}>
            <div className={styles.closeOperator}>
              <button
                onClick={() => setHandleModal(!handleModal)}
                className={styles.closeModal}
              >
                Fechar
              </button>
            </div>

            <input
              onChange={convert}
              type={'file'}
              id="file"
              name="file"
              accept="image/*"
            />
            {vector && (
              <form
                onSubmit={upload}
                className={styles.content_to_upload}
              >
                <label htmlFor="file">
                  <img src={vector} />
                </label>

                <div className={styles.content_to_upload_fields}>
                  <input
                    required
                    placeholder="Digite o nome do produto"
                    onChange={e => setNameProduct(e.target.value)}
                    value={nameproduct}
                  />
                  <input
                    required
                    placeholder="Digite preco"
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                  />
                  <input
                    required
                    type="number"
                    placeholder="Digite a quantidade"
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity}
                  />
                  <textarea
                    placeholder="Digite a descricao do produto"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                  />
                  <button disabled={isLoading}>
                    {isLoading ? (
                      <MoonLoader size={15} color="white" />
                    ) : (
                      'Cadastrar produto'
                    )}
                  </button>
                </div>
              </form>
            )}
            <div className={styles.wrapper_modal}>
              {!vector && (
                <label className={styles.upload_file} htmlFor="file">
                  Escolher imagem para upload
                  <RiUploadCloudFill color="white" />
                </label>
              )}
            </div>
          </div>
        </div>
      )}
      {handleModalEdit && (
        <div className={styles.modal}>
          <div className={styles.content_modal}>
            <div className={styles.closeOperator}>
              <button
                onClick={() => setHandleModalEdit(!handleModalEdit)}
                className={styles.closeModal}
              >
                Fechar
              </button>
            </div>

            <input
              onChange={convert}
              type={'file'}
              id="file"
              name="file"
              accept="image/*"
            />
            {selected && (
              <form
                onSubmit={update}
                className={styles.content_to_upload}
              >
                <label htmlFor="file">
                  <img
                    src={vector ? vector : ENDPOINT + selected.image}
                  />
                </label>

                <div className={styles.content_to_upload_fields}>
                  <input
                    required
                    placeholder="Digite o nome do produto"
                    onChange={e => setNameProduct(e.target.value)}
                    value={nameproduct}
                  />
                  <input
                    required
                    placeholder="Digite preco"
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                  />
                  <input
                    required
                    type="number"
                    placeholder="Digite a quantidade"
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity}
                  />
                  <textarea
                    placeholder="Digite a descricao do produto"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                  />
                  <button disabled={isLoading}>
                    {isLoading ? (
                      <MoonLoader size={15} color="white" />
                    ) : (
                      'Actualizar produto'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      <Wrapper>
        <div className={styles.content}>
          {isLoading && <MoonLoader size={30} color="blue" />}
          {products.map((item, index) => (
            <div key={index} className={styles.box}>
              <div className={styles.image_container}>
                <img src={ENDPOINT + item.image} />
              </div>
              <div className={styles.description}>
                <h4>
                  {item.name.length > 40
                    ? item.name.substring(0, 40) + '...'
                    : item.name}
                </h4>
                <p>
                  {item.description.length > 60
                    ? item.description.substring(0, 60) + '...'
                    : item.description}
                </p>
                <p>{item.price} MT</p>
                <p>Restantes: {item.quantity}</p>
                <div className={styles.operators}>
                  <RiEditBoxLine
                    className={styles.icons}
                    color="orange"
                    size={24}
                    onClick={() =>
                      setSelected(
                        item,
                        setHandleModalEdit(!handleModalEdit),
                        setNameProduct(item.name),
                        setDescription(item.description),
                        setPrice(item.price),
                        setQuantity(item.quantity)
                      )
                    }
                  />
                  <AiOutlineDelete
                    className={styles.icons}
                    color="red"
                    size={24}
                    onClick={() => COnfirmRemove(item.id, item.image)}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setHandleModal(!handleModal)}
            className={styles.addproduct}
          >
            Adicionar producto
          </button>
        </div>
      </Wrapper>
    </div>
  )
}

export default Addproducts
