import logo from './logo.svg';
import './App.css';
import Login from './pages/users/Login';
import "./assets/css/style.css"
import 'react-quill/dist/quill.snow.css'
import ForgotPassword from './pages/auth/ForgotPassword';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import AuthContext from './context/AuthContext';
import Home from './pages/admin/Home';
import CoachUsers from './pages/coach_manager/CoachUsers';
import Table from './pages/coach_manager/Table';
import Profile from './pages/profile/Profile';
import ChangePassword from './pages/profile/ChangePassword';
import AthleteTable from './pages/athlete_manger/AthleteTable';
import TeamTable from './pages/team_manager/TeamTable';
import { useEffect } from 'react';
import ResetPasswordVerify from './pages/auth/ResetPasswordVerify';
import ResetPassword from './pages/auth/ResetPassword';
import PlayerTable from './pages/player_manager/PlayerTable';
import StaticTable from './pages/manage_static_content/StaticTable';

function App() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      console.log(token);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password-verify" element={<ResetPasswordVerify />} />
        <Route path="reset-password" element={<ResetPassword />} />

          <Route path="dashboard" element={<Home />} />
          <Route path="coach-manager" element={<Table />} />
          <Route path="athlete-manager" element={<AthleteTable />} />
          <Route path="team-manager" element={<TeamTable />} />
          <Route path="player-manager" element={<PlayerTable />} />
          <Route path="static-content" element={<StaticTable />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
      </Routes>
  </div>
  );
}

export default App;
