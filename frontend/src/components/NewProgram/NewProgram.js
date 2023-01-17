import React, { useState, useEffect } from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Map, { Marker, Popup, GeolocateControl, NavigationControl, } from 'react-map-gl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { v4 as uuidv4 } from 'uuid'
import DisabledByDefaultSharpIcon from '@mui/icons-material/DisabledByDefaultSharp';
import axios from 'axios'
import { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
    Button,
    FormGroup,
    Form,
    Row,
    Col
} from "reactstrap";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
export default function NewProgram(props) {
    const [prog, setProg] = useState({ places: [], images: [] })
    const [open, setOpen] = useState(props.open);
    const [newPlace, setNewPlace] = useState(null);
    const [desc, setDesc] = useState(null);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [name, setName] = useState(null);
    const [details, setDetails] = useState(null);
    const [datedebut, setDatedebut] = useState(0)
    const [datefin, setDatefin] = useState(0)
    const [long, setLong] = useState(0)
    const [lat, setLat] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [deadline, setDeadline] = useState(null)
    const [nbinscriptions, setNbinscriptions] = useState(0)
    const [date, setDate] = useState(null)
    const [capacity, setCapacity] = useState(0)
    const [progId, setProgId] = useState(null)
    const [locations, setLocations] = useState([])
    const [image, setImage] = useState("")
    const [file, setFile] = useState("")
    const [locationImage, setLocationImage] = useState("")
    const [locationsFile, setLocationFile] = useState("")


    const [viewport, setViewport] = useState({
        latitude: 47.040182,
        longitude: 17.071727,
        zoom: 4,
    });
    const handleAddClick = (e) => {
        setNewPlace({
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng,
        });
    };
    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id);
        console.log(id)
    };

    const handleClose = () => {
        props.setOpen(false);
    };
    const handleSubmit = (e) => {
        setLocations([...locations, newPlace])
        setNewPlace(null);
    }

    useEffect(() => {
        if (datedebut) {
            setNewPlace({ ...newPlace, datedebut: datedebut.hour().toString() + ":" + datedebut.minute().toString() })
        }
    }, [datedebut])
    useEffect(() => {
        if (datefin) {
            setNewPlace({ ...newPlace, datefin: datefin.hour().toString() + ":" + datefin.minute().toString() })
        }
    }, [datefin])

    useEffect(() => {
        if (locationImage) {
            setNewPlace({ ...newPlace, image: locationImage })
        }
    }, [locationImage])
    const addPhotos = (e) => {
        setNewPlace({ ...newPlace, images: e.target.value })
    }

    const handleImageChange = (e) => {
        console.log(e)
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    };
    const handleLocationImageChange = (e) => {
        console.log(e)
        setLocationImage(e.target.files[0]);
        setLocationFile(URL.createObjectURL(e.target.files[0]));
    };

    useEffect(() => {
        setOpen(props.open)
    }, [props])

    const handleSave = async (e) => {
        console.log(locations)
        e.preventDefault()
        let form_data1 = new FormData();
        form_data1.append('title', title);
        form_data1.append('description', description);
        form_data1.append('price', price);
        form_data1.append('deadline', deadline);
        form_data1.append('date', date);
        form_data1.append('capacity', capacity);
        form_data1.append('nbinscriptions', nbinscriptions);
        form_data1.append('agency', localStorage.getItem('id'))
        form_data1.append('gallery', image, image.name);
        console.log(form_data1)
        await axios({
            method: 'post',
            url: 'http://localhost:8000/programs/',
            headers: { "Content-Type": "multipart/form-data" },
            data: form_data1
        })
            .then((res) => {
                if (res.status == 201) {
                    setProgId(res.data.id)
                    saveLocations(res.data.id)
                    props.setOpen(false)
                    setLocations([])
                }
            })
            .catch((err) => {
                if (err.response.status == 404) {
                    console.log(err.response)
                }
            })
    }

    const saveLocations = async (id) => {
        for (let i = 0; i < locations.length; i++) {
            console.log(id, locations[i].name, locations[i].longitude, locations[i].latitude, locations[i].details, locations[i].datedebut, locations[i].datefin)
            let form_data2 = new FormData();
            form_data2.append('program', id);
            form_data2.append('name', locations[i].name);
            form_data2.append('longitude', locations[i].longitude);
            form_data2.append('latitude', locations[i].latitude);
            form_data2.append('details', locations[i].details);
            form_data2.append('datedebut', locations[i].datedebut);
            form_data2.append('datefin', locations[i].datefin);
            form_data2.append('image', locations[i].image, locations[i].image.name);
            await axios({
                method: 'post',
                url: 'http://localhost:8000/locations/',
                headers: { "Content-Type": "multipart/form-data" },
                data: form_data2
            })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res)
                    }
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        console.log(err.response)
                    }
                })
        }

    }
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={true}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle style={{ display: "flex", justifyContent: "space-between", height: "50px" }}>
                    <div>New program</div>
                    <DialogActions>
                        <IconButton>
                            <DisabledByDefaultSharpIcon onClick={handleClose} />
                        </IconButton>
                    </DialogActions>
                </DialogTitle>
                <DialogContent>
                    <Col md="12">
                        <Form>
                            <Row>
                                <Col md="12">
                                    <label>Title</label>

                                    <FormGroup>
                                        <TextField
                                            required
                                            id="outlined-multiline-static"
                                            size="small"
                                            type="text"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="3">
                                    <label>Date</label>

                                    <FormGroup>
                                        <TextField
                                            id="date"
                                            type="date"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{ width: 230 }}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="px-1" md="3">
                                    <label>Inscriptions deadline</label>
                                    <FormGroup>
                                        <TextField
                                            id="date"
                                            type="date"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{ width: 230 }}
                                            onChange={(e) => setDeadline(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="3">
                                    <label>Capacity</label>
                                    <FormGroup>
                                        <TextField
                                            required
                                            id="outlined-multiline-static"
                                            size="small"
                                            onChange={(e) => setCapacity(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="3">
                                    <label>Price</label>
                                    <FormGroup>
                                        <TextField
                                            required
                                            id="outlined-multiline-static"
                                            size="small"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <label>Description</label>
                                    <FormGroup>
                                        <TextField
                                            required
                                            id="outlined-multiline-static"
                                            size="small"
                                            multiline
                                            rows={4}
                                            style={{ width: "100%" }}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <label>Photo</label>
                            <Row>
                                <Col md="4" >
                                    <Paper elevation={3} className="image-input" style={{ heigh: "600px" }}>
                                    {file!=="" ? <img src={file} style={{maxHeight:"-webkit-fill-available"}}/> :
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        
                                    <input hidden accept="image/*" type="file" onChange={(e) => {handleImageChange(e)}} />
                                        <AddPhotoAlternateIcon />
                                    </IconButton>
                                    }
                                    
                                    </Paper>
                                </Col>
                                {/*<Col md="4">
                                    <Paper elevation={3} className="image-input" >
                                        <AddPhotoAlternateIcon />
                                    </Paper>
                                </Col>
                                <Col md="4" >
                                    <Paper elevation={3} className="image-input">
                                        <AddPhotoAlternateIcon />
                                    </Paper>
                                        </Col>*/}
                            </Row>
                            <Row style={{ padding: "2% 2% 2% 2%" }}>
                                <Map
                                    initialViewState={{
                                        longitude: 10.8451,
                                        latitude: 33.8076,
                                        zoom: 10
                                    }}
                                    doubleClickZoom={false}
                                    style={{ height: "80vh" }}
                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                    mapboxAccessToken='pk.eyJ1IjoiYm9jaHJhLW16IiwiYSI6ImNsYTgzZ285OTIxeWczcW8zbThrdXptMjQifQ.DZAIWKl3ovOcWwqoB4GpmQ'
                                    onDblClick={handleAddClick}
                                    cursor="pointer"

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
                                                            <div className="location-title">
                                                                {loc.name}
                                                            </div>
                                                            <div className="location-details">
                                                                {loc.details}
                                                            </div>
                                                        </div>
                                                    </Popup>)}
                                            </div>
                                        )
                                    })}
                                    {newPlace && (
                                        <>
                                            <Marker
                                                latitude={newPlace.latitude}
                                                longitude={newPlace.longitude}
                                            >
                                            </Marker>
                                            <Popup
                                                latitude={newPlace.latitude}
                                                longitude={newPlace.longitude}
                                                closeButton={true}
                                                closeOnClick={false}
                                                onClose={() => setNewPlace(null)}
                                                anchor="bottom"
                                                maxWidth="500px"
                                            >
                                                <div style={{ width: "400px" }} >
                                                    <div className='pin-form'>
                                                        <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Name"
                                                            size="small"
                                                            onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className='pin-form' >
                                                        <TextField
                                                            required
                                                            id="outlined-multiline-static"
                                                            size="small"
                                                            multiline
                                                            rows={4}
                                                            label="Description"
                                                            onChange={(e) => setNewPlace({ ...newPlace, details: e.target.value })}
                                                        />
                                                    </div>

                                                    <div style={{ display: "flex", marginTop: "10px" }}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                            <TimePicker
                                                                label="Basic example"
                                                                value={datedebut}
                                                                inputFormat="HH:mm"
                                                                onChange={(newValue) => {
                                                                    setDatedebut(newValue);
                                                                }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                            <TimePicker
                                                                label="Basic example"
                                                                value={datefin}
                                                                inputFormat="HH:mm"
                                                                onChange={(newValue) => {
                                                                    setDatefin(newValue);
                                                                }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                    <div>
                                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                                            <input hidden accept="image/*" multiple type="file" onChange={(e) => {handleLocationImageChange(e)}} />
                                                            <PhotoCamera />
                                                        </IconButton>
                                                    </div>
                                                    <button type="submit" className="submitButton" onClick={(e) => handleSubmit(e)}>
                                                        Add Pin
                                                    </button>
                                                </div>
                                            </Popup>
                                        </>
                                    )}
                                    <NavigationControl position="top-left" />
                                    <GeolocateControl
                                        position="top-left"
                                        trackUserLocation />
                                </Map>
                            </Row>
                            <Row>
                                <div className="update ml-auto mr-auto">
                                    <Button
                                        className="btn-round"
                                        color="primary"
                                        type="submit"
                                        onClick={(e) => handleSave(e)}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </Col>
                </DialogContent>
            </Dialog>
        </div>
    )
}