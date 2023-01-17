import React, { useEffect } from "react"
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
import { useHistory } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import profile from "../assets/img/user.png"
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    const [languages, setLanguages] = useState(["Arabic", "Chinese", "French", "English", "German", "Japanese", "Spanish", "Persian", "Russian", "Malay", "Portuguese", "Italian", "Turkish", "Lahnda", "Tamil", "Urdu", "Korean", "Hindi", "Bengali", "Vietnamese", "Telugu", "Marathi"])
    const [nationalities, setNationalities] = useState(["Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguans", "Argentinean", "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Barbudans", "Batswana", "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djibouti", "Dominican", "Dutch", "East Timorese", "Ecuadorean", "Egyptian", "Emirian", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinea-Bissauan", "Guinean", "Guyanese", "Haitian", "Herzegovinian", "Honduran", "Hungarian", "I-Kiribati", "Icelander", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan", "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourger", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander", "Ni-Vanuatu", "Nicaraguan", "Nigerian", "Nigerien", "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi", "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovakian", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean", "Spanish", "Sri Lankan", "Sudanese", "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian or Tobagonian", "Tunisian", "Turkish", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Venezuelan", "Vietnamese", "Welsh", "Yemenite", "Zambian", "Zimbabwean",])
    const steps = ['General information', 'profile photo', 'area of interest'];
    const [allInterests, setAllIneterests] = useState([])
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [phone, setPhone] = useState(0)
    const [nationality, setNationality] = useState("")
    const [language, setLanguage] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState(18)
    const [interests, setInterests] = useState([])
    let history = useHistory()
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("")
    const [image, setImage] = useState("")
    const [file, setFile] = useState("")

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
        if (activeStep == 0 && (username == "" || email == "" || password == "" || confirm == "" || age == null || nationality == "" || language == "" || gender == "")) {
            setMessage("Please enter all the required fields ")
        }

        else if (activeStep == 0 && password != confirm) {
            setMessage("Password missmatch")
        }
        else {
            const newActiveStep =
                isLastStep() && !allStepsCompleted()
                    ?
                    steps.findIndex((step, i) => !(i in completed))
                    : activeStep + 1;
            if (newActiveStep == 2) {
                axios({
                    method: 'get',
                    url: `http://localhost:8000/interests`
                })
                    .then(function (response) {
                        setAllIneterests(response.data)
                    });
            }
            setActiveStep(newActiveStep);
        }
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = async () => {
        console.log(interests)
        let form_data = new FormData();
        form_data.append('image', image, image.name);
        form_data.append('username', username);
        form_data.append('email', email);
        form_data.append('password', password);
        form_data.append('confirm', confirm);
        form_data.append('phone', phone);
        form_data.append('age', age);
        form_data.append('nationality', nationality);
        form_data.append('language', language);
        form_data.append('gender', gender);
        form_data.append('interest', interests);
        await axios({
            method: 'post',
            url: 'http://localhost:8000/tourist/signup/',
            headers: { "Content-Type": "multipart/form-data" },
            data: form_data
        })
            .then((res) => {
                if (res.status == 200) {
                    history.push('/tourist-login')
                }
            })
            .catch((err) => {
                if (err.response.status == 404) {
                    console.log(err.response)
                }
            })
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const handleAddInterst = (element) => {
        setInterests([...interests, element.id])
    }

    const handleImageChange = (e) => {
        console.log(e)
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));

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
                                                <span class="deatils">User Name*</span>
                                                <TextField placeholder="Enter Your Name" size="small" className="signup-field" onChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Age*</span>
                                                <TextField placeholder="Enter your age" size="small" className="signup-field" onChange={(e) => setAge(e.target.value)} />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Email*</span>
                                                <TextField placeholder="Enter Your email" size="small" className="signup-field" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Phone*</span>
                                                <TextField placeholder="Enter Your phone number" size="small" className="signup-field" onChange={(e) => setPhone(e.target.value)} />
                                            </div>

                                            <div class="input-box">
                                                <span class="deatils">Nationality*</span>
                                                <FormControl fullWidth>
                                                    <Select
                                                        value={nationality}
                                                        size="small"
                                                        onChange={(e) => setNationality(e.target.value)}
                                                        placeholder="Enter your nationality"

                                                    >
                                                        {nationalities.map((nat) => {
                                                            return (
                                                                <MenuItem value={nat}>{nat}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div class="input-box">
                                                <span class="deatils">Language*</span>
                                                <FormControl fullWidth>
                                                    <Select
                                                        value={language}
                                                        size="small"
                                                        onChange={(e) => setLanguage(e.target.value)}
                                                        placeholder="Enter your language"
                                                    >
                                                        {languages.map((lang) => {
                                                            return (
                                                                <MenuItem value={lang}>{lang}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </div>
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
                                                />
                                            </div>
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
                                        <div class="gendre-details">
                                            < RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                                style={{ display: "-webkit-inline-box" }}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                            </RadioGroup>
                                        </div>
                                        <div style={{ color: "red" }}>{message}</div>
                                    </form>

                                </div>
                                }
                                {activeStep == 1 && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "5%", marginBottom: "3%" }}>
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
                                {activeStep == 2 && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "5%", marginBottom: "10%" }}>
                                    <div style={{ marginBottom: "5%" }}>Please select your area of interest</div>
                                    <Grid container spacing={3} style={{ width: "70%" }}>
                                        {allInterests.map((element) => {
                                            return (
                                                <Grid xs="auto">
                                                    <Item className={(interests.indexOf(element.id) > -1) ? "selected-interest" : "interest"} value={element} onClick={() => handleAddInterst(element)}>{element.name}</Item>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
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