import React from 'react'
import styles from './style.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import MyContext from '../../../contexts/MyContext'
import Copyright from '../../../components/Copyright'

const Sidebar = ({children}) => {

const {currentRoute,setCurrentRoute} = useContext(MyContext)

  return (
    <div className={styles.container}>
       <div className={styles.header}>
          <h4>Oculos plus Admin</h4>
        </div>
        <div className={styles.screen}>
        <div className={styles.sidebar}>
          <ul>
           
              <Link  to={'/admin/dashboard'} onClick={()=>setCurrentRoute('dashboard')} style={{backgroundColor:currentRoute=='dashboard'&&'#447BCD',color:currentRoute=='dashboard'&&'#FFF'}}>
              Dashboard
              </Link>
           
              <Link to={'/admin/addproducts'}  onClick={()=>setCurrentRoute('addproducts')} style={{backgroundColor:currentRoute=='addproducts'&&'#447BCD',color:currentRoute=='addproducts'&&'#FFF'}}>
              Produtos
              </Link>
       
              <Link onClick={()=>setCurrentRoute('viewschedule')}  style={{backgroundColor:currentRoute=='viewschedule'&&'#447BCD',color:currentRoute=='viewschedule'&&'#FFF'}}>
              Consultas agendadas
              </Link>
              <Link onClick={()=>setCurrentRoute('sells')}  style={{backgroundColor:currentRoute=='sells'&&'#447BCD',color:currentRoute=='sells'&&'#FFF'}}>
              compras
              </Link>
        
            
              <Link onClick={()=>setCurrentRoute('clients')} style={{backgroundColor:currentRoute=='clients'&&'#447BCD',color:currentRoute=='clients'&&'#FFF'}}>
              Clientes
              </Link>
       
          </ul>
        </div>
        <main>
 
         {children}
   
        </main>
        </div>
      
    </div>
  )
}

export default Sidebar