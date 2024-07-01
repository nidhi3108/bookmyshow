import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import './App.css';
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
import "./style/custom.css"

function App() {
  const {loading} = useSelector ((state)=> state.loaders)
  return (
  <>
  {loading && (
    <div className="loader-parent">
      <div className="loader"></div>
    </div>
  )}
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
   
  </Routes>
  </BrowserRouter>
  
  </>
  );
}

export default App;
