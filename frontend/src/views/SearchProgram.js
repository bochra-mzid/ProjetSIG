import React from "react"
import { useState, useEffect } from "react"
import "../assets/css/searchPrograms.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import img from "../assets/img/travel.jfif"
import paginationFactory from "react-bootstrap-table2-paginator"
import NewProgram from "../components/NewProgram/NewProgram"
import Map, { Marker, Popup, GeolocateControl, NavigationControl, } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import GroupsIcon from '@mui/icons-material/Groups';

import axios from "axios"
import {
    Card,
    CardBody,
    Button
} from "reactstrap";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SearchProgram() {
    const [allPrograms, setAllPrograms] = useState([{ 'id': 1, 'title': "prog1", 'description': "Lorem ipsum dolor sit amet. Eum quod placeat sed sequi aliquam qui nihil neque. Aut aperiam ullam aut facere velit est soluta excepturi. Sit aperiam dolores ut consequatur voluptate a corrupti adipisci. Aut fugiat aspernatur est libero alias et facere eaque aut beatae accusantium At impedit rerum et voluptatem deleniti.Voluptas pariatur ut mollitia culpa sed facere provident ut sunt voluptas. A neque veniam sed magni quam est quidem illo eum quisquam accusantium ut omnis reiciendis. Et autem possimus vel corrupti animi et repellendus sint.", 'date': "2022-12-28", "nb_inscriptions": 50, "price": "900", "deadline": "2022-11-27", "capacity": 60, "country": "Tunisia", state: "Jerba", "city": "Homet souk", "locations": [{ "id": 1, name: "houmet souk", duration: "1h", date_debut: "8h", date_fin: "12h", category: "visite", details: "loremipsum", longitude: 10.1815, latitude: 36.8065 }, { "id": 2, name: "houmet souk", duration: "1h", date_debut: "8h", date_fin: "12h", category: "visite", details: "loremipsum", latitude: 33.8212, longitude: 10.8543, }] },
    { 'id': 2, 'title': "prog2", 'description': "Lorem ipsum dolor sit amet. Eum quod placeat sed sequi aliquam qui nihil neque. Aut aperiam ullam aut facere velit est soluta excepturi. Sit aperiam dolores ut consequatur voluptate a corrupti adipisci. Aut fugiat aspernatur est libero alias et facere eaque aut beatae accusantium At impedit rerum et voluptatem deleniti.Voluptas pariatur ut mollitia culpa sed facere provident ut sunt voluptas. A neque veniam sed magni quam est quidem illo eum quisquam accusantium ut omnis reiciendis. Et autem possimus vel corrupti animi et repellendus sint.", 'date': "2022-12-29", "nb_inscriptions": 50, "price": "900", "deadline": "2022-12-31", "capacity": 60, "locations": [{ "id": 1, name: "houmet souk", duration: "1h", date_debut: "8h", date_fin: "12h", category: "visite", details: "loremipsum", longitude: 10.1815, latitude: 36.8065 }, { "id": 2, name: "houmet souk", duration: "1h", date_debut: "8h", date_fin: "12h", category: "visite", details: "loremipsum", latitude: 33.8212, longitude: 10.8543, }] }])
    const [data, setData] = useState([])
    const [country, setCountry] = useState("")
    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])
    const [city, setCity] = useState("")
    const [selectedState, setSelectedState] = useState("")
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10))
    const [programs, setPrograms] = useState([])
    const [open, setOpen] = React.useState(false);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [locations, setLocations] = useState([])

    const handleClose = () => {
        setOpen(false);
    };
    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id);
        console.log(id)
    };
    useEffect(() => {
        getData()
    }, [])

    const getAllPrograms = async () => {
        await axios({
            method: 'get',
            url: `http://localhost:8000/allprograms`
        })
            .then(function (response) {
                setAllPrograms(response.data)
            });
        let progs = allPrograms.filter(prog => (Date.parse(prog.deadline) > Date.parse(date)))
        setPrograms(progs)
    }

    useEffect(() => {
        getAllPrograms()
    }, [])

    const handleClickOpen = async (id) => {
        console.log(id)
        setOpen(true);
        await axios({
            method: 'get',
            url: `http://localhost:8000/locations/${id}`
        })
            .then(function (response) {
                setLocations(response.data)
                console.log(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    };

    const handleCountryChange = (e, newValue) => {
        setCountry(newValue)
        let states = data.filter(state => state.country === newValue);
        states = [...new Set(states.map(item => item.subcountry))]
        states.sort()
        setStates(states)
        let progs = allPrograms.filter(prog => prog.country === newValue)
        setPrograms(progs)
    }

    const handleStateChange = (e, newValue) => {
        setSelectedState(newValue)
        let cities = data.filter((city) => city.subcountry === newValue)
        cities = [...new Set(cities.map(item => item.name))]
        cities.sort()
        setCities(cities)
        let progs = allPrograms.filter(prog => (prog.country === country && prog.state === newValue))
        setPrograms(progs)
    }

    const handleCityChange = (e, newValue) => {
        let progs = allPrograms.filter(prog => (prog.country === country && prog.state === selectedState && prog.city === newValue))
        setPrograms(progs)
        setCity(newValue)
    }

    const handleDateChange = (e) => {
        setDate(e.target.value)
        let progs = allPrograms.filter(prog => (prog.date === e.target.value))
        setPrograms(progs)
        setDate(e.target.value)
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
        <div className="programs-container">
            <div className="search-filters">
                {/*<div>
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
    </div>*/}
            </div>
            <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue={date}
                sx={{ width: 300 }}
                InputLabelProps={{
                    shrink: true,
                }}
                size="small"
                onChange={(e) => handleDateChange(e)}
            />
            <div className="programs-cards-container">
                {programs.map((prog) => {
                    return (
                        <div key={prog.id}>
                            <div class="item item1">
                                {prog.gallery ? <img
                                    class="item-photo"
                                    src={prog.gallery}
                                    alt="iphone 13 laying between plants on steel rail"
                                /> : <img src={img} />}
                                <div class="program-card-header">
                                    <div class="item-title">{prog.title}</div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <LocalAtmIcon />
                                            Price: {prog.price}
                                        </div>
                                        <div>
                                            <CalendarMonthIcon />
                                            Date: {prog.date}
                                        </div>
                                    </div>
                                    <div>
                                        <CalendarMonthIcon />
                                        Deadline d'inscription: {prog.deadline}
                                    </div>

                                </div>
                                <p class="item-text">
                                    {prog.description.length > 250 ?
                                        `${prog.description.substring(0, 200)}...` : prog.description
                                    }
                                </p>
                                <Button class="item-link" onClick={() => { handleClickOpen(prog.id) }}
                                > read more &rarr;</Button>
                                {console.log(programs)}
                                <Dialog
                                    fullScreen
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Transition}
                                >
                                    <AppBar sx={{ position: 'relative' }}>
                                        <Toolbar>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={handleClose}
                                                aria-label="close"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                {prog.title}
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                    <div className="programs-details-page">
                                        <h1 className="details-title">{prog.title}</h1>
                                        <img src={prog.gallery} className="image-details" />
                                        <div className="details-description">{prog.description}</div>
                                        <div>
                                            <LocalAtmIcon />
                                            Price: {prog.price}
                                        </div>
                                        <div>
                                            <CalendarMonthIcon />
                                            Date: {prog.date}
                                        </div>
                                        <div>
                                            <CalendarMonthIcon />
                                            Deadline d'inscription: {prog.deadline}
                                        </div>
                                        <div>
                                            <GroupsIcon />
                                            Capacity: {prog.capacity}
                                        </div>
                                        <div>
                                            <GroupsIcon />
                                            Total inscriptions: {prog.nbinscriptions}
                                        </div>

                                        <div style={{ height: '100vh', width: '100%' }}>
                                            <Map
                                                initialViewState={{
                                                    longitude: 10.8451,
                                                    latitude: 33.8076,
                                                    zoom: 10
                                                }}
                                                style={{ width: "90vw", height: "90vh" }}
                                                mapStyle="mapbox://styles/mapbox/streets-v9"
                                                mapboxAccessToken='pk.eyJ1IjoiYm9jaHJhLW16IiwiYSI6ImNsYTgzZ285OTIxeWczcW8zbThrdXptMjQifQ.DZAIWKl3ovOcWwqoB4GpmQ'
                                            >
                                                {locations.map((loc) => {
                                                    return (
                                                        <div>
                                                            <Marker
                                                                latitude={loc.latitude}
                                                                longitude={loc.longitude}
                                                                onClick={() => handleMarkerClick(loc.id)}
                                                            >
                                                            </Marker>
                                                            {loc.id === currentPlaceId && (
                                                                <Popup longitude={loc.longitude} latitude={loc.latitude}
                                                                    anchor="bottom" onClose={() => setCurrentPlaceId(null)}
                                                                    closeButton={true}
                                                                    closeOnClick={false}
                                                                >
                                                                    <div className="location-card">
                                                                        <img src={loc.image} />
                                                                        <div className="location-title">
                                                                            {loc.name}
                                                                        </div>
                                                                        <div className="location-time-category">
                                                                            <div classname="location-time">
                                                                                <AccessTimeIcon style={{ width: "18px" }} />    {loc.date_debut} -- {loc.date_fin}
                                                                            </div>
                                                                        </div>
                                                                        <div className="location-details">
                                                                            {loc.details}
                                                                        </div>
                                                                    </div>
                                                                    <button>view details</button>
                                                                </Popup>)}
                                                        </div>
                                                    )
                                                })}
                                                <NavigationControl position="top-left" />
                                                <GeolocateControl
                                                    position="top-left"
                                                    trackUserLocation />
                                            </Map>
                                        </div>
                                    </div>
                                </Dialog>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchProgram