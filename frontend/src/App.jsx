import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import FocusMode from './components/FocusMode'
import TasksList from './components/TasksList'
import TodoDashboard from './components/TodoDashboard'
import Progress from './components/Progress'
import PlanGenerator from './components/planGenerator'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
const {openGenerator} = useContext(AuthContext);

  return (
    <>
      <Routes>

        {/* Public routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* dashboard layout routes */}
        {/* <Route path='/' element={<LandingPage />} /> */}
        <Route path='dashboard' element={<Home />} >
          {/* <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
          <Route index element={<TodoDashboard />} /> {/* default page inside Home */}
          <Route path="focus-mode" element={<FocusMode />} />
          <Route path="workspace" element={<TasksList />} />

        </Route>
      </Routes>

      {
        openGenerator &&
        <PlanGenerator />
      }
    </>
  )
}

export default App
