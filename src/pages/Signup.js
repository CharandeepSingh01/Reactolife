import React, { useState } from 'react'
import './Signup.css'
import imggg from "../images/imgg.png";
import im from "../images/logore.png";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../src/config'
import Swal from 'sweetalert2'

const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const signup = (event) => {
        event.preventDefault();

        setLoading(true);
        const requestData = { fullName: fullName, email, password }
        axios.post(`${API_BASE_URL}/signup`, requestData)
            .then((result) => {
                if (result.status == 201) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered'
                    })
                }
                setFullName('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred please try again later!'
                })
            })
    }
    return (
        <div className="backimg">
          <div className="container login-container">
            <div className="row">
              <div className="mt-5 col-md-7 col-sm-12">
                <img src={im} alt="im" className="img-fluid imag" />
    
                <img
                  src={imggg}
                  alt="imgg"
                  style={{ height: "50%" }}
                  className=" imag2 "
                />
              </div>
              <div className="col-md-5 col-sm-12">
                <div className="card shadow">
                  <div className="row">
                    {loading ? <div className="col-md-12 mt-3 text-center">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div> : ""}
                  </div>
                  <div className="card-body px-5">
                    <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
                    <form onSubmit={(e) => signup(e)}>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(ev) => setFullName(ev.target.value)}
                        className="p-1 mt-4 mb-2 form-control input_bg"
                        placeholder="Full Name"
                      />
    
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        className="p-1 mt-2 mb-2 form-control input_bg"
                        placeholder="Phone(XXXXXXXXXX)"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="p-1 mt-2 mb-2 form-control input_bg"
                        placeholder="Email"
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        className="p-1 mb-2 form-control input_bg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                      <div className="mt-3 d-grid">
                        <button
                          type="submit"
                          className="custom-btn custom-btn-blue"
                        >
                          Submit
                        </button>
                      </div>
                      <div className="my-4">
                        <hr className="text-muted" />
                        <h5 className="text-center text-muted">OR</h5>
                        <hr className="text-muted" />
                      </div>
                      <div className="mt-3 mb-5 d-grid">
                        <Link to="/login">
                          <button
                            type="submit"
                            className="custom-btn custom-btn-white"
                          >
                            <span>Already have an account? </span>
                            <span className="ms-1 text-info fw-bold">Log In</span>
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

export default Signup