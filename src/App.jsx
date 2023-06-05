import { useEffect } from 'react'
import MainRoute from './routes'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ContextProvider from './contexts/ContextProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  useEffect(() => {
    AOS.init({
      duration: 800
    })
  }, [])
  return (
    <ContextProvider>
      <ToastContainer />
      <MainRoute />
    </ContextProvider>
  )
}

export default App
