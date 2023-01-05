import React from "react"
import "../assets/css/home.css"
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import logo from "../assets/img/logo1.png"

function Home() {
    return (
        <div className="home">
            <div className="cover">
                <img src={logo} className="home-logo" />

                <h1 className="home-title">TRAVEL WITH US! </h1>
                <div>
                    <Link to="/tourist-login">
                        <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                        >
                            Tourist
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                        >
                            Travel agency
                        </Button>
                    </Link>

                </div>
            </div>

        </div>
    )
}

export default Home