import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PostOverview from './pages/PostOverview';
import Profile from './pages/Profile';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {

  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer);

    useEffect(() => {

      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {//when user has a login active session
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        navigate("/posts");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/login");
      }
    }, []);

    return (
      <Routes>
        <Route exact path="/" element={<PostOverview />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/posts" element={<PostOverview />}></Route>
        <Route exact path="/myprofile" element={<Profile />}></Route>
      </Routes>
    )
  }


  return (
    <div className='app-bg'>
      <Router>
        <NavBar />
        <DynamicRouting />
      </Router>
    </div>
  );
}

export default App;
