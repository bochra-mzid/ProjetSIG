import React, { useState, useEffect } from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Map, { Marker, Popup } from 'react-map-gl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DisabledByDefaultSharpIcon from '@mui/icons-material/DisabledByDefaultSharp';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";

export default function NewProgram(props) {
    const [prog, setProg] = useState({ places: [], images: [] })
    const [open, setOpen] = useState(props.open);
    const [newPlace, setNewPlace] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

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
        console.log(newPlace)
        setProg({ ...prog, places: [...prog.places, newPlace] })
        setNewPlace(null);
    }
    const addPhotos = (e) => {
        setNewPlace({ ...newPlace, images: e.target.value })
    }

    useEffect(() => {
        setOpen(props.open)
    }, [props])

    useEffect(() => {
        console.log(prog)
    }, [prog])
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
                                            onChange={(e) => setProg({ ...prog, title: e.target.value })}
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

                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="px-1" md="3">
                                    <label>Inscriptions deadline</label>

                                    <FormGroup>
                                        <TextField
                                            required
                                            id="outlined-multiline-static"
                                            size="small"
                                            onChange={(e) => setProg({ ...prog, deadline: e.target.value })}
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
                                            onChange={(e) => setProg({ ...prog, capacity: e.target.value })}
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
                                            onChange={(e) => setProg({ ...prog, price: e.target.value })} />

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
                                            onChange={(e) => setProg({ ...prog, description: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <label>Gallery</label>
                            <Row>
                                <Col md="4">
                                    <Paper elevation={3} className="image-input">
                                        <AddPhotoAlternateIcon />
                                    </Paper>
                                </Col>
                                <Col md="4">
                                    <Paper elevation={3} className="image-input" >
                                        <AddPhotoAlternateIcon />
                                    </Paper>
                                </Col>
                                <Col md="4" >
                                    <Paper elevation={3} className="image-input">
                                        <AddPhotoAlternateIcon />
                                    </Paper>
                                </Col>
                            </Row>
                            <Row style={{ padding: "2% 2% 2% 2%" }}>
                                <Map
                                    initialViewState={{
                                        longitude: 10.1815,
                                        latitude: 36.8065,
                                        zoom: 12
                                    }}
                                    doubleClickZoom={false}
                                    style={{ height: "80vh" }}
                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                    mapboxAccessToken='pk.eyJ1IjoiYm9jaHJhLW16IiwiYSI6ImNsYTgzZ285OTIxeWczcW8zbThrdXptMjQifQ.DZAIWKl3ovOcWwqoB4GpmQ'
                                    onDblClick={handleAddClick}
                                    cursor="pointer"

                                >
                                    {prog.places.map((loc) => {
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
                                                        <TextField
                                                            required
                                                            id="outlined-multiline-static"
                                                            size="small"
                                                            label="Order"
                                                            onChange={(e) => setNewPlace({ ...newPlace, id: e.target.value })}
                                                        />
                                                        <TextField
                                                            required
                                                            id="outlined-multiline-static"
                                                            size="small"
                                                            label="category"
                                                            onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })}
                                                        />

                                                    </div>
                                                    <div style={{ display: "flex", marginTop: "10px" }}>
                                                        <TextField
                                                            id="datetime-local"
                                                            label="Start"
                                                            type="datetime-local"
                                                            size="small"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            id="datetime-local"
                                                            label="End"
                                                            type="datetime-local"
                                                            size="small"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                                            <input hidden accept="image/*" multiple type="file" onChange={addPhotos} />
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
                                </Map>
                            </Row>
                            <Row>
                                <div className="update ml-auto mr-auto">
                                    <Button
                                        className="btn-round"
                                        color="primary"
                                        type="submit"
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