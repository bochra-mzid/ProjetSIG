import React from "react"
import { useState, useEffect } from "react"
import "../assets/css/agencies.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios"

import {
    Card,
    CardBody,
    Button
} from "reactstrap";
function Agencies() {
    const [data, setData] = useState([])
    const [country, setCountry] = useState("")
    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])
    const [city, setCity] = useState("")
    const [selectedState, setSelectedState] = useState("")
    const [allAgencies, setAllAgencies] = useState([
        { "id": 1, "name": "agence x", "email": "agencex@gmail.com", "password": "123", "phone": 25444658, "fb_url": "", "insta_url": "", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra posuere elit quis ultrices. Donec ex erat, auctor ut urna nec, maximus tristique libero. Cras quis tortor arcu. Nam hendrerit aliquam turpis, ac placerat eros cursus ut. Aenean hendrerit, mauris ut molestie efficitur, dui tellus dapibus est, vitae volutpat odio neque et dui. Fusce aliquam mauris sit amet dictum pretium. Quisque ac tincidunt elit. Donec ut dignissim dui, vel consectetur lectus.", "city": "Tajerouine",  "address": "jsnfsdllflfw,d", "country": "Tunisia", "state": "Kef" },

        { "id": 2, "name": "agence y", "email": "agencex@gmail.com", "password": "123", "phone": 25444658, "fb_url": "", "insta_url": "", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra posuere elit quis ultrices. Donec ex erat, auctor ut urna nec, maximus tristique libero. Cras quis tortor arcu. Nam hendrerit aliquam turpis, ac placerat eros cursus ut. Aenean hendrerit, mauris ut molestie efficitur, dui tellus dapibus est, vitae volutpat odio neque et dui. Fusce aliquam mauris sit amet dictum pretium. Quisque ac tincidunt elit. Donec ut dignissim dui, vel consectetur lectus.", "city": "Alma", "address": "jsnfsdllflfw,d", "country": "Canada", "state": "Quebec" },
        { "id": 3, "name": "agence z", "email": "agencex@gmail.com", "password": "123", "phone": 25444658, "fb_url": "", "insta_url": "", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra posuere elit quis ultrices. Donec ex erat, auctor ut urna nec, maximus tristique libero. Cras quis tortor arcu. Nam hendrerit aliquam turpis, ac placerat eros cursus ut. Aenean hendrerit, mauris ut molestie efficitur, dui tellus dapibus est, vitae volutpat odio neque et dui. Fusce aliquam mauris sit amet dictum pretium. Quisque ac tincidunt elit. Donec ut dignissim dui, vel consectetur lectus.", "city": "Amos", "address": "jsnfsdllflfw,d", "country": "Canada", "state": "Quebec" }])

        const [agencies, setAgencies] = useState(allAgencies)

        useEffect(()=>{
            if (country==""){
                setAgencies(allAgencies)
            }
        }, [country])
    useEffect(() => {
        console.log("ok")
        getData()
    }, [])
    const handleCountryChange = (e, newValue) => {
        console.log(newValue)
        setCountry(newValue)
        let states = data.filter(state => state.country === newValue);
        states = [...new Set(states.map(item => item.subcountry))]
        states.sort()
        console.log(states)
        setStates(states)
        let agen = allAgencies.filter(agency => agency.country === newValue)
        console.log("agencies",agen)
        setAgencies(agen)
    }

    const handleStateChange = (e, newValue) => {
        setSelectedState(newValue)
        console.log(selectedState)
        let cities = data.filter((city) => city.subcountry === newValue)
        cities = [...new Set(cities.map(item => item.name))]
        cities.sort()
        setCities(cities)
        let agen = allAgencies.filter(agency => (agency.country === country && agency.state === newValue))
        console.log("agencies",agen)
        setAgencies(agen)
    }
    const handleCityChange = (e, newValue) => {

        let agen = allAgencies.filter(agency => (agency.country === country && agency.state === selectedState && agency.city === newValue))
        console.log("agencies",agen)
        setAgencies(agen)
        setCity(newValue)
        console.log(city)
    }


    const getData = async () => {
        await axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
            .then(res => {
                setData(res.data)
            }
            )
            .catch(err => console.log(err))
    }


    const countries = [... new Set(data.map(item => item.country))]
    countries.sort()


    return (
        <div className="agencies-container">
            <div className="search-filters">
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={countries}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Country" />}
                        onChange={(e, newValue) => handleCountryChange(e, newValue)}
                        size="small"
                    />
                </div>
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={states}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="State" />}
                        onChange={(e, newValue) => handleStateChange(e, newValue)}
                        size="small"
                    />
                </div>
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={cities}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="City" />}
                        onChange={(e, newValue) => handleCityChange(e, newValue)}
                        size="small"
                    />
                </div>
            </div>
            <div className="cards-container">
                {agencies.map((agency) => {
                    return (
                        <Card className="card-user agency-card">
                            <CardBody>
                                <div className="author">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={require("assets/img/mike.jpg")}
                                        />
                                        <h5 className="title">{agency.name}</h5>
                                    </a>
                                    <div>
                                        <div >
                                            <span className="card-field">Phone:</span>  {agency.phone}
                                        </div>
                                        <div>
                                            <span className="card-field">Email:</span>  {agency.email}
                                        </div>
                                    </div>
                                    <Button>
                        
                        More details
                      </Button>
                                </div>
                                
                            </CardBody>
                            
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default Agencies