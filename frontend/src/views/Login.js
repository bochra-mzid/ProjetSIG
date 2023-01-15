import React, { useState } from "react";
import "../assets/css/login.css"
import logo from "../assets/img/logo1.png"
import { Button } from "reactstrap";
import {Link} from "react-router-dom"
export default function Login() {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [message, setMessage] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault() // prevent the form from refreshing the page
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                // handle successful login
                localStorage.setItem("token", data.token);
                // redirect the user to the dashboard
                window.location.href = "/admin/dashboard"
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

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
                            <Link to="/admin/dashboard">Sign in</Link>
                        </Button>
                    </div>
                    <div style={{textAlign: "center"}}>you don't have an account ? <Link to="/agency-registration">Sign up</Link></div>
                    <div className="message">{message}</div>
                </form>
            </div>
        </div>
    );
}