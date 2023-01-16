import React from "react"
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import "../assets/css/TouristRegistration.css"
import logo from "../assets/img/logo1.png"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(false)
    const [photos, setPhotos] = useState(null);
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [agenState, setAgenState] = useState("")
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [message, setMessage] = useState("")
    const steps = ['', '', '', ''];
    const [data, setData] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    const [description, setDescription] = useState("")
    const [fb, setFb] = useState("")
    const [insta, setInsta] = useState("")
    const [image, setImage] = useState("")
    let history = useHistory()
    const [file, setFile] = useState("")


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleCountryChange = (e) => {
        setCountry(e.target.value)
        let states = data.filter(state => state.country === e.target.value);
        states = [...new Set(states.map(item => item.subcountry))]
        states.sort()
        setStates(states)
        console.log(states)
    }

    const handleStateChange = (e) => {
        setAgenState(e.target.value)
        let cities = data.filter((city) => city.subcountry === e.target.value)
        cities = [...new Set(cities.map(item => item.name))]
        cities.sort()
        setCities(cities)
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }
    const uploadMultipleFiles = e => {
        fileObj.push(e.target.files);
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]));
        }
        setPhotos(fileArray);
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

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleImageChange = (e) => {
        console.log(e)
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));

    };

    const handleComplete = async () => {
        let form_data = new FormData();
        form_data.append('image', image, image.name);
        form_data.append('name', name);
        form_data.append('email', email);
        form_data.append('password', password);
        form_data.append('confirm', confirm);
        form_data.append('phone', phone);
        form_data.append('country', country);
        form_data.append('state', agenState);
        form_data.append('city', city);
        form_data.append('description', description);
        form_data.append('facebook_url', fb);
        form_data.append('instagram_url', insta);

        await axios({
            method: 'post',
            url: 'http://localhost:8000/agency/signup/',
            headers: { "Content-Type": "multipart/form-data" },
            data: form_data
        })
            .then((res) => {
                if (res.status == 200) {
                    history.push('/login')
                }
            })
            .catch((err) => {
                if (err.response.status == 404) {
                    console.log(err.response)
                }
            })
    };
    const handleNext = () => {
        if (activeStep == 0 && (name == "" || email == "" || password == "" || phone=="" || confirm == "" || country == "" || agenState == "" || city == "" )) {
            setMessage("Please enter all the required fields ")
        }

        else if (activeStep == 0 && password!=confirm){
            setMessage("Password missmatch")
        }
        else {
            const newActiveStep =
                isLastStep() && !allStepsCompleted()
                    ?
                    steps.findIndex((step, i) => !(i in completed))
                    : activeStep + 1;
            setActiveStep(newActiveStep);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

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

    useEffect(() => {
        getData()
    },[])

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
                                                <span class="deatils">Agency Name*</span>
                                                <TextField placeholder="Enter your agency name" size="small" className="signup-field" onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Phone*</span>
                                                <TextField placeholder="Enter your phone number" size="small" className="signup-field" onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Email*</span>
                                                <TextField placeholder="Enter Your email" size="small" className="signup-field" onChange={(e) => setEmail(e.target.value)} />
                                            </div>


                                            <div class="input-box">
                                                <span class="deatils">Country*</span>
                                                <FormControl fullWidth>
                                                    <Select
                                                        value={country}
                                                        size="small"
                                                        onChange={(e) => handleCountryChange(e)
                                                        }
                                                        placeholder="Enter your country"

                                                    >
                                                        {countries.map((c) => {
                                                            return (
                                                                <MenuItem value={c}>{c}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">State*</span>
                                                <FormControl fullWidth>
                                                    <Select
                                                        value={agenState}
                                                        size="small"
                                                        onChange={(e)=>handleStateChange(e)}
                                                        placeholder="Enter your state"
                                                    >
                                                        {states.map((s) => {
                                                            return (
                                                                <MenuItem value={s}>{s}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">City*</span>
                                                <FormControl fullWidth>
                                                    <Select
                                                        value={city}
                                                        size="small"
                                                        onChange={(e)=>handleCityChange(e)}
                                                        placeholder="Enter your city"
                                                    >
                                                        {cities.map((c) => {
                                                            return (
                                                                <MenuItem value={c}>{c}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl> </div>
                                            <div class="input-box">
                                                <span class="deatils">Password*</span>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    size="small"
                                                    placeholder="Enter your password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Confirm Password*</span>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    size="small"
                                                    placeholder="Confirm password"
                                                    onChange={(e) => setConfirm(e.target.value)}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div style={{ color: "red" }}>{message}</div>
                                    </form>

                                </div>
                                }
                                {activeStep == 1 && <div style={{ marginBottom: "3%" }}>
                                    <form action="#" className="register-form">
                                        <div class="user-details">
                                            <div class="input-box" style={{ width: "100%" }}>
                                                <div class="input-box" style={{ width: "100%" }}>
                                                    <span class="deatils">Description</span>
                                                    <TextField id="outlined-multiline-static" multiline rows={4} placeholder="Enter your agency description" required style={{ width: "100%" }} onChange={(e)=>setDescription(e.target.value)} />
                                                </div>
                                            </div>
                                            <div class="user-details">

                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Facebook url</span>
                                                <TextField placeholder="Enter Your facebook url" onChange={(e)=>setFb(e.target.value)}/>
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Instagram</span>
                                                <TextField placeholder="Enter Your instagram url" onChange={(e)=>setInsta(e.target.value)} />
                                            </div>

                                        </div>
                                    </form>
                                </div>
                                }
                                {activeStep == 2 && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "5%", marginBottom: "3%" }}>
                                    <label htmlFor="photo-upload" className="custom-file-upload fas">
                                        <div className="img-wrap img-upload" >
                                        {file=="" ? <img for="photo-upload" src={profile} /> : <img src={file}/>}
                                        </div>
                                        <input id="photo-upload" type="file"
                                            onChange={(e) => {
                                                handleImageChange(e);
                                            }} />
                                    </label>
                                    <div>Please add a profile picture</div>
                                </div>}
                                {activeStep == 3 && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "5%", marginBottom: "3%" }}>
                                    <div style={{ marginBottom: "3%" }}>Add photos to you gallery</div>
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
                                                    <img key={i} src={url} alt="..." style={{ maxWidth: "none" }} />
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                </div>}
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "flex-end", paddingTop: "0" }}>
                                    {activeStep !== steps.length - 1 ?
                                        <Button onClick={handleNext}>
                                            Next
                                        </Button>
                                        : <Button onClick={handleComplete} sx={{ mr: 1 }}>
                                            Finish
                                        </Button>
                                    }
                                </Box>
                            </React.Fragment>
                        )}
                    </div>
                </Box>
            </div >
        </div >
    )
}