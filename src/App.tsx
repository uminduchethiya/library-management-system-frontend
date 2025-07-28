
import { Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/admin/Dashboard'
import LandingPage from './pages/user/LandingPage'
import AddBook from './pages/admin/AddBook';
import Users from './pages/admin/Users'
const App = () => {
  return (
    
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
        <Route path='/addbooks' element={<AddBook/>}/>
        <Route path='/users' element={<Users/>}/>
     
      </Routes>
    
  );
};

export default App;
