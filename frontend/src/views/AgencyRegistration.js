import React from "react"
import { useState } from "react";
import "../assets/css/TouristRegistration.css"
import logo from "../assets/img/logo1.png"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import axios from "axios";

import profile from "../assets/img/user.png"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function TouristRegistration() {
    let fileObj = [];
    let fileArray = [];
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = useState(false)
    const [photos, setPhotos] = useState(null);

    const steps = ['', '', ''];

    const uploadMultipleFiles = e => {
        fileObj.push(e.target.files);
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]));
        }
        setPhotos(fileArray);
    };

    const uploadFiles = e => {
        e.preventDefault();
    };
    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ?
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <div className="tourist-registration-page">
            <div className="registration-container">
                <div>
                    <img src={logo} className="logo" style={{ marginBottom: "0", height: "90px", width: "90px" }} />
                    <div class="title">Regristration</div>

                </div>
                <Box sx={{ width: '100%', marginTop: '3%', height: "72%", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {allStepsCompleted() ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {activeStep == 0 && <div>
                                    <form action="#" className="register-form">
                                        <div class="user-details">
                                            <div class="input-box">
                                                <span class="deatils">User Name</span>
                                                <input type="text" placeholder="Enter Your Name" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Email address</span>
                                                <input type="text" placeholder="Enter Your email" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Country</span>
                                                <input type="text" placeholder="Enter Your country" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">State</span>
                                                <input type="text" placeholder="Enter Your state" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">City</span>
                                                <input type="text" placeholder="Enter your city" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Postal code</span>
                                                <input type="text" placeholder="Enter your postal code" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Password</span>
                                                <input type="text" placeholder="Enter Your Password" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Conform Password</span>
                                                <input type="text" placeholder="Conform Password" required />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                }
                                {activeStep == 1 && <div style={{ marginBottom: "3%" }}>
                                    <form action="#" className="register-form">
                                        <div class="user-details">
                                            <div class="input-box" style={{ width: "100%" }}>
                                                <div class="input-box" style={{ width: "100%" }}>
                                                    <span class="deatils">Description</span>
                                                    <textarea type="text" rows="5" placeholder="Enter Your Name" required style={{ width: "100%" }} />
                                                </div>
                                            </div>
                                            <div class="user-details">

                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Facebook url</span>
                                                <input type="text" placeholder="Enter Your facebook url" />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Instagram</span>
                                                <input type="text" placeholder="Enter Your instagram url" />
                                            </div>

                                        </div>
                                    </form>
                                </div>
                                }
                                {activeStep == 2 && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "5%", marginBottom: "3%" }}>
                                    <div style={{marginBottom:"3%"}}>Add photos to you gallery</div>
                                    <form>
                                        <div className="form-group">
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={uploadMultipleFiles}
                                                multiple
                                            />
                                        </div>
                                        <div className="form-group multi-preview">
                                            <div className="imgWrapper">
                                                {(photos || []).map((url, i) => (
                                                    <img key={i} src={url} alt="..." style={{maxWidth: "none"}}/>
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                </div>}
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "flex-end", paddingTop: "0" }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                                        Next
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </div>
                </Box>
            </div >
        </div >
    )
}