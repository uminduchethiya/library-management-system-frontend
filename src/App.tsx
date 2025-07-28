import { Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import LandingPage from './pages/user/LandingPage';
import AddBook from './pages/admin/AddBook';
import Users from './pages/admin/Users';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/addbooks"
        element={
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route path="/landingpage" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
