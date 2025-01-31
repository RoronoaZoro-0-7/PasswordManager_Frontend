import Navbar from './components/Navbar'
import './App.css'
import './index.css'
import Manager from './components/Manager'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Manager />
    </>
  )
}

export default App
