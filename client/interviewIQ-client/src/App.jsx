import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import {ToastContainer} from 'react-toastify'
import { BrowserRouter,Route,Routes, useParams } from "react-router-dom"
import ProtectedLayout from "./components/ProtectedLayout"
import AuthProtectedLayout from "./components/AuthProtectedLayout"
import FallbackComponent from "./components/FallbackComponent"
import { useState } from "react"
import Layout from "./components/Layout"
import NewInterview from "./pages/NewInterview"
import Profile from "./pages/Profile"
import ContextProvider from "./components/ContextProvider"
import History from "./pages/History"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <BrowserRouter>

      <Routes>
        <Route element={<Layout/>}>
          <Route element={<AuthProtectedLayout />}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path="*" element={<FallbackComponent/>}/>
            <Route path="/new-interview" element={<NewInterview/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='login' element={<Login />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
