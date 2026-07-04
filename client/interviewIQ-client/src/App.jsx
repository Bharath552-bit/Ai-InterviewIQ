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
import Home from "./pages/Home"
import InterviewSetup from "./pages/InterviewSetup"
import InterviewById from "./pages/InterviewById"
import InterviewCompleted from "./pages/InterviewCompleted"

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
          <Route path="/" element = {<Home/>}/>
          <Route element={<AuthProtectedLayout />}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path="/history/:id" element={<InterviewById/>}/>
            <Route path ="interview/completed" element={<InterviewCompleted/>}/>
            <Route path="*" element={<FallbackComponent/>}/>
            <Route path="/interview/live" element={<NewInterview/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/interview/setup" element={<InterviewSetup/>}/>
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
