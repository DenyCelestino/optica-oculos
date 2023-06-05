import { useState } from 'react'
import MyContext from './MyContext'

const ContextProvider = ({ children }) => {
  const [handleModal, setHandleModal] = useState(false)

  const ENDPOINT = import.meta.env.VITE_ENDPOINT
  const [handleModalSchedule, setHandleModalSchedule] =
    useState(false)
  const [currentRoute, setCurrentRoute] = useState('dashboard')
  return (
    <MyContext.Provider
      value={{
        handleModal,
        setHandleModal,
        handleModalSchedule,
        setHandleModalSchedule,
        currentRoute,
        setCurrentRoute,
        ENDPOINT
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export default ContextProvider
