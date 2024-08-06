import './App.css';
import Login from './pages/users/Login';
import "./assets/css/style.css"
import 'react-quill/dist/quill.snow.css'
import ForgotPassword from './pages/auth/ForgotPassword';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/admin/Home';
import CoachUsers from './pages/coach_manager/CoachUsers';
import Table from './pages/coach_manager/Table';
import Profile from './pages/profile/Profile';
import ChangePassword from './pages/profile/ChangePassword';
import AthleteTable from './pages/athlete_manger/AthleteTable';
import TeamTable from './pages/team_manager/TeamTable';
import { useEffect, useState } from 'react';
import ResetPasswordVerify from './pages/auth/ResetPasswordVerify';
import ResetPassword from './pages/auth/ResetPassword';
import PlayerTable from './pages/player_manager/PlayerTable';
import StaticTable from './pages/manage_static_content/StaticTable';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
// console.log('token',token)
  useEffect(() => {
    if (token) {
      // console.log(token);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [token]);
  // const notify = () => toast("Wow so easy!");

//   const [text, setText] = useState("")
//   const handleChange = ()=>{
//     let newText = text.toUpperCase()
//     setText(newText)
//   }
//   const handleChangeLower = ()=>{
//     let newText = text.toLowerCase()
//     setText(newText)
//   }

//   const handleOnChange = (e) => {
// setText(e.target.value)
//   }
//   const handleReset = () => {
//     setText("")
//   }

  return (
    <div className="App">
      {/* <input placeholder='Enter any text' value={text} onChange={handleOnChange}></input>
      <button onClick={handleChange} className='btn btn-primary my-2 ml-2'>UpperCase</button>
      <button onClick={handleChangeLower} className='btn btn-secondary my-2 mr-2 ml-2'>LowerCase</button>
      <button onClick={handleReset} className='btn btn-danger my-2 mr-2 '>Reset</button>
      <div>
        <p>{text.split(" ").length} word and {text.length} charecters</p>
      </div>
      <div>
      <p>{0.008 * text.split(" ").length - 0.008 } minutes to read</p>
      <h1>Preview</h1>
      <h4>{text}</h4>
      </div> */}

       {/* <button onClick={notify}>Notify!</button> */}
       <ToastContainer />
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
