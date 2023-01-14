import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import FacebookIcon from '@mui/icons-material/Facebook';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import Divider from '@mui/material/Divider';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from 'axios'
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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];


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

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8000/agency/${localStorage.getItem("id")}`
    })
      .then(function (response) {
        console.log(response)
        setAgency(response.data[0])
      });
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
                    src={require("assets/img/mike.jpg")}
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
                    {images.map((step, index) => (
                      <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                            component="img"
                            sx={{
                              height: 200,
                              display: 'block',
                              maxWidth: 400,
                              overflow: 'hidden',
                              width: '100%',
                            }}
                            src={step.imgPath}
                            alt={step.label}
                          />
                        ) : null}
                      </div>
                    ))}
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
                        <label htmlFor="exampleInputEmail1">
                          Description
                        </label>
                        <TextField
                          id="outlined-textarea"
                          placeholder="Placeholder"
                          defaultValue={agency.description}
                          style={{
                            width: "95%",
                            marginRight: "auto",
                            marginLeft: "auto"
                          }}
                          multiline
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
                        <Input placeholder="Email" type="email" defaultValue={agency.email} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Phone number
                        </label>
                        <Input placeholder="phonee" defaultValue={agency.phone} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          placeholder="Country"
                          type="text"
                          defaultValue={agency.country}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>State</label>
                        <Input
                          defaultValue={agency.state}
                          placeholder="State"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue={agency.city}
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" defaultValue={agency.postalcode} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
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
