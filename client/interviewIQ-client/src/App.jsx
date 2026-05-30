import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import {ToastContainer} from 'react-toastify'
import { BrowserRouter,Route,Routes } from "react-router-dom"
import ProtectedLayout from "./components/ProtectedLayout"
import AuthProtectedLayout from "./components/AuthProtectedLayout"

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
        <Route element={<AuthProtectedLayout />}>
          <Route path='/' element={<Home />}/>
          <Route path="*" element={<FallbackC}/>
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='login' element={<Login />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
