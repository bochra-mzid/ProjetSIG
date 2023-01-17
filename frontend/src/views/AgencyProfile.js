import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import FacebookIcon from '@mui/icons-material/Facebook';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from 'axios'
import img1 from "../assets/img/img1.jpg"
import img2 from "../assets/img/img2.jpg"
import img3 from "../assets/img/img3.jpg"
import img4 from "../assets/img/img4.jpg"

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [];


function AgencyProfile() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [agency, setAgency] = useState({})
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };


  const handleUpdate = async (e) => {
    await axios({
      method: 'put',
      url: `http://localhost:8000/agencyupdate/${localStorage.getItem("id")}/`,
      data: {
        name: agency.name,
        email: agency.email,
        password: agency.password,
        country: agency.coutry,
        state: agency.state,
        city: agency.city,
        phone: agency.phone,
        description: agency.description,
      }
    })
      .then(function (response) {
        console.log(response)
      });
  }
  const getData = async () => {
    await axios({
      method: 'get',
      url: `http://localhost:8000/agency/${localStorage.getItem("id")}`
    })
      .then(function (response) {
        console.log(response)
        setAgency(response.data)
      });
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <div className="content">
        <Row>
          <Col md="5">
            <Card className="card-user">
              <CardBody>
                <div className="author" style={{ marginTop: "5%" }}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={agency.image}
                  />
                  <h5 className="title">{agency.name}</h5>
                </div>
                <Row style={{ justifyContent: "center" }}>
                  <a href={agency.facebook_url}>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="close"
                    >
                      <FacebookIcon />
                    </IconButton>
                  </a>
                  <a href={agency.instagram_url}>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="close"
                    >
                      <InstagramIcon />
                    </IconButton>
                  </a>
                </Row>
                <hr />
                <h5>Gallery</h5>
                <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    <div >
                      {Math.abs(activeStep - 0) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: 200,
                            display: 'block',
                            maxWidth: 400,
                            overflow: 'hidden',
                            width: '100%',
                          }}
                          src={img1}
                        />
                      ) : null}
                    </div>
                    <div >
                      {Math.abs(activeStep - 1) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: 200,
                            display: 'block',
                            maxWidth: 400,
                            overflow: 'hidden',
                            width: '100%',
                          }}
                          src={img2}
                        />
                      ) : null}
                    </div>
                    <div >
                      {Math.abs(activeStep - 2) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: 200,
                            display: 'block',
                            maxWidth: 400,
                            overflow: 'hidden',
                            width: '100%',
                          }}
                          src={img3}
                        />
                      ) : null}
                    </div><div >
                      {Math.abs(activeStep - 3) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: 200,
                            display: 'block',
                            maxWidth: 400,
                            overflow: 'hidden',
                            width: '100%',
                          }}
                          src={img4}
                        />
                      ) : null}
                    </div>
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                      >
                        Next
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </Box>
              </CardBody>

            </Card>
          </Col>
          <Col md="7">
            <Card className="card-user">
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>
                          Agency name
                        </label>
                        <Input placeholder="phone" defaultValue={agency.name} onChange={(e) => setAgency({ ...agency, name: e.target.value })} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Description
                        </label>
                        <TextField
                          id="outlined-textarea"
                          defaultValue={agency.description}
                          style={{
                            width: "95%",
                            marginRight: "auto",
                            marginLeft: "auto"
                          }}
                          onChange={(e) => setAgency({ ...agency, description: e.target.value })}
                          multiline
                          rows={4}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email" defaultValue={agency.email} onChange={(e) => setAgency({ ...agency, email: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Phone number
                        </label>
                        <Input placeholder="phonee" defaultValue={agency.phone} onChange={(e) => setAgency({ ...agency, phone: e.target.value })} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          placeholder="Country"
                          type="text"
                          defaultValue={agency.country}
                          onChange={(e) => setAgency({ ...agency, country: e.target.value })}

                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>State</label>
                        <Input
                          defaultValue={agency.state}
                          placeholder="State"
                          type="text"
                          onChange={(e) => setAgency({ ...agency, state: e.target.value })}

                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue={agency.city}
                          placeholder="City"
                          type="text"
                          onChange={(e) => setAgency({ ...agency, city: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={(e) => handleUpdate(e)}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AgencyProfile;
