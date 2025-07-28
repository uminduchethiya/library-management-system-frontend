
import { Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/admin/Dashboard'
import LandingPage from './pages/user/LandingPage'
const App = () => {
  return (
    
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
      </Routes>
    
  );
};

export default App;
