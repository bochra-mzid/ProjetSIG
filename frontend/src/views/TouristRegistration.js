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
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = useState(false)
    const steps = ['General information', 'profile photo', 'area of interest'];
    const [interest, setInterest] = useState(["Sports", "hiking", "cycling", "skiing", "camping", "Skydiving", "Ballooning", "Surfing", "Swimming", "Shopping"])

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
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
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
                <Box sx={{ width: '100%', marginTop: '3%', height:"72%", display:"flex", justifyContent:"space-between", flexDirection:"column"}}>
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
                                                <span class="deatils">Age</span>
                                                <input type="text" placeholder="Enter your age" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Email</span>
                                                <input type="text" placeholder="Enter Your email" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Phone</span>
                                                <input type="text" placeholder="Enter Your phone number" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Nationality</span>
                                                <input type="text" placeholder="Enter Your ntionality" required />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Language</span>
                                                <input type="text" placeholder="Enter spoken language" required />
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
                                        <div class="gendre-details">
                                            <span class="deatils" style={{ marginRight: "5%", marginBottom: "5px" }}>Gendre</span>
                                            <div class="catogary">
                                                <label for="dot-1">
                                                    <span class="dot one"></span>
                                                    <span class="gendre">Male</span>
                                                </label>
                                                <label for="dot-2">
                                                    <span class="dot one"></span>
                                                    <span class="gendre">Female</span>
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                }
                                {activeStep == 1 && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "5%", marginBottom: "3%" }}>
                                    <label htmlFor="photo-upload" className="custom-file-upload fas">
                                        <div className="img-wrap img-upload" >
                                            <img for="photo-upload" src={profile} />
                                        </div>
                                        <input id="photo-upload" type="file" />
                                    </label>
                                    <div>Please add a profile picture</div>

                                </div>}
                                {activeStep == 2 && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "5%", marginBottom: "10%" }}>
                                <div style={{marginBottom:"5%"}}>Please select ....</div>

                                    <Grid container spacing={3} style={{width:"70%"}}>
                                        {interest.map((element) => {
                                            return (
                                                <Grid xs="auto">
                                                    <Item>{element}</Item>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>

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

                                {/*activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                Step {activeStep + 1} already completed
                                            </Typography>
                                        ) : (
                                            <Button onClick={handleComplete}>
                                                {completedSteps() === totalSteps() - 1
                                                    ? 'Finish'
                                                    : 'Complete Step'}
                                            </Button>
                                                ))*/}
                            </React.Fragment>
                        )}
                    </div>
                </Box>
            </div>
        </div>
    )
}