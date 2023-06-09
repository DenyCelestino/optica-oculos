import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Universal/Sidebar'
import Home from '../Pages/Home'
import Product from '../Pages/Product'
import Schedule from '../Pages/Schedule'
import History from '../Pages/History'
import Login from '../Pages/admin/Login'
import Dashboard from '../Pages/admin/Dashboard'
import Addproducts from '../Pages/admin/Addproducts'
import ListSchedule from '../Pages/admin/ListSchedule'
import Buys from '../Pages/admin/Buys'
const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product/:id" exact element={<Product />} />
        <Route path="/schedule" exact element={<Schedule />} />
        <Route path="/history" exact element={<History />} />
        <Route path="/admin/login" exact element={<Login />} />
        <Route
          path="/admin/listschedule"
          exact
          element={
            <Sidebar>
              <ListSchedule />
            </Sidebar>
          }
        />
        <Route
          path="/admin/dashboard"
          exact
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/admin/addproducts"
          exact
          element={
            <Sidebar>
              <Addproducts />
            </Sidebar>
          }
        />
        <Route
          path="/admin/buys"
          exact
          element={
            <Sidebar>
              <Buys />
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoute
