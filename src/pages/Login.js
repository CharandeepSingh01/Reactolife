import { useState } from 'react';
import './Login.css'
import imggg from "../images/imgg.png";
import im from "../images/logore.png";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import axios from 'axios'
import { API_BASE_URL } from '../../src/config'
import Swal from 'sweetalert2'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                if (result.status == 200) {
                    setLoading(false);
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    setLoading(false);
                    navigate('/myprofile');
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error
                })
            })
    }

    return (
        <div className="backimg">
        <div className="container login-container">
          <div className="row">
            <div className="col-md-7 col-sm-12">
              <img src={im}  alt="im" className="img-fluid imag" />
    
              <img src={imggg} alt="imgg" style={{height:'50%'}} className=" imag2 " />
            </div>
            <div className="col-md-5 col-sm-12">
              <div className="card shadow">
              {loading ? <div className="col-md-12 mt-3 text-center">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div> : ""}
                <div className="card-body px-5">
                  <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
                  <form onSubmit={(e) => login(e)}>
                    <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="p-2 mt-4 mb-2 form-control input_bg" placeholder="Phone number, username or email"/>
    
                    <input
                      value={password}
                      type="password"
                      onChange={(ev) => setPassword(ev.target.value)}
                      className="p-2 mb-2 form-control input_bg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                    <div className="mt-3 d-grid">
                    <button type="submit" className="custom-btn custom-btn-blue">
                      Submit
                    </button>
                    </div>
                    <div className="my-4">
                        <hr className="text-muted" />
                        <h5 className="text-center text-muted">OR</h5>
                        <hr className="text-muted" />
                    </div>
                    <div className="mt-3 mb-5 d-grid">
                        <Link to="/signup">
                    <button type="submit" className="custom-btn custom-btn-white">
                        <span>Don't have an account? </span>
                        <span className="ms-1 text-info fw-bold">Sign Up</span>
                        </button>
                        </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
}

export default Login;