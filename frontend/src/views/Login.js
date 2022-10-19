import React, { useState } from "react";
import "../assets/css/login.css"
import logo from "../assets/img/logo1.png"
import { Button } from "reactstrap";
export default function Login() {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [message, setMessage] = useState("")

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
                    <div className="auth-button">
                        <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                        >
                            Sign in
                        </Button>
                    </div>
                    <div className="message">{message}</div>
                </form>
            </div>
        </div>
    );
}