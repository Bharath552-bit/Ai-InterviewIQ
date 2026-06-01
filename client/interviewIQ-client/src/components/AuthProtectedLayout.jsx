import { Navigate, Outlet } from 'react-router-dom'
import ContextProvider from './ContextProvider'

function AuthProtectedLayout() {
    const userCredentials = localStorage.getItem("user")
    if(!userCredentials){
        return <Navigate to="/login" replace />
    }
  return (
    <div>
      <ContextProvider>
        <Outlet/>
      </ContextProvider>
    </div>
  )
}

export default AuthProtectedLayout