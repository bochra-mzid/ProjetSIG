/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useSyncExternalStore } from "react";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

import { Button } from "reactstrap";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import GroupsIcon from '@mui/icons-material/Groups';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import logo from "../assets/img/trip1.jpg"
import "../assets/css/ProgramsTable.css"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import NewProgram from "../components/NewProgram/NewProgram"
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KayakingIcon from '@mui/icons-material/Kayaking';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
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


function ProgramsTable() {
  const [programs, setPrograms] = useState([{ 'id': 1, 'title': "prog1", 'description': "Lorem ipsum dolor sit amet. Eum quod placeat sed sequi aliquam qui nihil neque. Aut aperiam ullam aut facere velit est soluta excepturi. Sit aperiam dolores ut consequatur voluptate a corrupti adipisci. Aut fugiat aspernatur est libero alias et facere eaque aut beatae accusantium At impedit rerum et voluptatem deleniti.Voluptas pariatur ut mollitia culpa sed facere provident ut sunt voluptas. A neque veniam sed magni quam est quidem illo eum quisquam accusantium ut omnis reiciendis. Et autem possimus vel corrupti animi et repellendus sint.", 'date': "20/02/2023", "nb_inscriptions": 50, "price": "900", "deadline": "30/01/2023", "capacity": 60, "locations": [{ "id": 1, name: "houmet souk", duration: "1h", date_debut: "8h", date_fin: "12h", category: "visite", details: "loremipsum", longitude: 10.1815, latitude: 36.8065 }, { "id": 2, name: "houmet souk", duration: "1h", date_debut: "8h", date_fin: "12h", category: "visite", details: "loremipsum", latitude: 33.8212, longitude: 10.8543 }] }])
  const [tourists, setTourists] = useState([{ "name": "wajdi jbali", "phone": 23222564, "statut": "paid" }, { "name": "mouna jlassi", "phone": 55211778, "statut": "not paid" }])
  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = useState(false)
  const selectOptions = {
    "paid": 'paid',
    "not paid": 'not paid',
  };
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const columns = [{
    dataField: 'name',
    text: 'name',
    filter: textFilter(),
    sort: true
  },
  {
    dataField: 'phone',
    text: 'phone',
    filter: textFilter(),
    sort: true
  },
  {
    dataField: 'statut',
    text: 'statut',
    filter: textFilter(),
    formatter: cell => selectOptions[cell],
    filter: selectFilter({
      options: selectOptions
    }),
    sort: true

  }];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewPogram = () => {
    setOpenNew(true)
  }

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    console.log(id)
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Programs</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>nb_inscriptions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((prog) => {
                      return (
                        <tr key={prog.id}>
                          <td>{prog.title}</td>
                          <td>{prog.date}</td>
                          <td>{prog.nb_inscriptions}</td>
                          <td>
                            <Button
                              color="primary"
                              type="submit"
                              onClick={handleClickOpen}
                            >
                              Details
                            </Button>
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
                                <img src={logo} className="image-details" />
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
                                  Total inscriptions: {prog.nb_inscriptions}
                                </div>
                                
                                <div style={{ height: '100vh', width: '100%' }}>
                                  <Map
                                    initialViewState={{
                                      longitude: 10.1815,
                                      latitude: 36.8065,
                                      zoom: 10
                                    }}
                                    style={{ width: "90vw", height: "90vh" }}
                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                    mapboxAccessToken='pk.eyJ1IjoiYm9jaHJhLW16IiwiYSI6ImNsYTgzZ285OTIxeWczcW8zbThrdXptMjQifQ.DZAIWKl3ovOcWwqoB4GpmQ'
                                  >
                                    {prog.locations.map((loc) => {
                                      { console.log(loc.longitude) }
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
                                                <img src={logo} />
                                                <div className="location-title">
                                                  {loc.name}
                                                </div>
                                                <div className="location-time-category">
                                                  <div classname="location-time">
                                                    <AccessTimeIcon style={{width: "18px"}} />    {loc.date_debut} -- {loc.date_fin}
                                                  </div>
                                                  <div classname="location-category">
                                                    {loc.category}
                                                  </div></div>
                                                <div className="location-details">
                                                  {loc.details}
                                                </div>
                                              </div>
                                              <button>view details</button>
                                            </Popup>)}
                                        </div>
                                      )
                                    })}
                                  </Map>
                                </div>
                                <h2 className="inscriptions-details">Inscriptions list</h2>
                                <BootstrapTable keyField='name' data={tourists} columns={columns} pagination={paginationFactory()} filter={filterFactory()} />
                              </div>
                            </Dialog>
                          </td>
                          <td>
                            <Button
                              color="primary"
                              type="submit"
                            >
                              Cancel
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Fab color="primary" aria-label="add" onClick={addNewPogram}>
          <AddIcon />
        </Fab>
        <NewProgram open={openNew} setOpen={setOpenNew} />
      </div>
    </>
  );
}

export default ProgramsTable;
