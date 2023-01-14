import React, { useState, useEffect } from "react";
import "../assets/css/login.css"
import logo from "../assets/img/logo1.png"
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import axios from "axios"
import { useHistory } from 'react-router-dom'

export default function Login() {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    let history = useHistory()

    const login = async () => {
        await axios({
            method: 'post',
            url: 'http://localhost:8000/agency/login/',
            data: {
                email: loginEmail,
                password: loginPassword
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    setLoggedIn(true)
                    setMessage("")
                    localStorage.setItem("id", res.data.id)
                    history.push('/admin/dashboard')
                }
            })
            .catch((err) => {
                if (err.response.status == 404) {
                    setLoggedIn(false)
                    setMessage(err.response.data.error)
                }
            })
    }

    useEffect(()=>{
        console.log(message)
    }, [message])

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <div>
                        <img src={logo} className="logo" />
                        <h3 className="Login">Login</h3>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={(e) => { setLoginEmail(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => { setLoginPassword(e.target.value) }} />
                    </div>
                    {(message !== "" && <div style={{color:"red", textAlign: "center"}}>{message}</div>)}

                    <div className="auth-button">
                        <Link to="#">
                            <Button
                                className="btn-round"
                                color="primary"
                                type="submit"
                                onClick={login}
                            >
                                Sign in
                            </Button>
                        </Link>
                    </div>
                    <div style={{ textAlign: "center" }}>you don't have an account ? <Link to="/agency-registration">Sign up</Link></div>
                </form>
            </div>
        </div>
    );
}