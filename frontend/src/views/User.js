import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

function User() {

  const [languages, setLanguages] = useState(["Arabic", "Chinese", "French", "English", "German", "Japanese", "Spanish", "Persian", "Russian", "Malay", "Portuguese", "Italian", "Turkish", "Lahnda", "Tamil", "Urdu", "Korean", "Hindi", "Bengali", "Vietnamese", "Telugu", "Marathi"])
  const [nationality, setNationality] = useState(["Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguans", "Argentinean", "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Barbudans", "Batswana", "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djibouti", "Dominican", "Dutch", "East Timorese", "Ecuadorean", "Egyptian", "Emirian", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinea-Bissauan", "Guinean", "Guyanese", "Haitian", "Herzegovinian", "Honduran", "Hungarian", "I-Kiribati", "Icelander", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan", "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourger", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander", "Ni-Vanuatu", "Nicaraguan", "Nigerian", "Nigerien", "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi", "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovakian", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean", "Spanish", "Sri Lankan", "Sudanese", "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian or Tobagonian", "Tunisian", "Turkish", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Venezuelan", "Vietnamese", "Welsh", "Yemenite", "Zambian", "Zimbabwean",])
  const [tourist, setTourist] = useState({})
  const [gender, setGender ] = useState("")
  const [nat, setNat]= useState("")
  const [language, setLanguage] = useState("")
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8000/tourist/${localStorage.getItem("id")}`
    })
      .then(function (response) {
        console.log(response)
        setTourist(response.data[0])
        setGender(response.data[0].gender)
        setNat(response.data[0].nationality)
        setLanguage(response.data[0].language)
        
      });
  }, [])
  return (
    <>
      <div className="content">
        <Row>
          <Col md="4" style={{ marginTop: "5%" }}>
            <Card className="card-user">
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/mike.jpg")}
                    />
                    <h5 className="title">{tourist.username}</h5>
                  </a>
                  <p>Phone:   {tourist.phone}</p>
                  <p>Email:   {tourist.email}</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue={tourist.username}
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email" defaultValue={tourist.email} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Gender</label>
                        <FormControl fullWidth>
                          <Select
                            value={gender}
                            size="small"
                            onChange={(e)=>setGender(e.target.value())}
                          >
                            <MenuItem value={"M"}>M</MenuItem>
                            <MenuItem value={"F"}>F</MenuItem>
                          </Select>
                        </FormControl>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Age</label>
                        <Input
                          defaultValue={tourist.age}
                          placeholder="Age"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Phone number</label>
                        <Input
                          defaultValue={tourist.phone}
                          placeholder="Phone"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Nationality</label>
                        <FormControl fullWidth>
                          <Select
                            value={nat}
                            size="small"
                            onChange={(e)=>setNat(e.target.value)}
                          >
                            {nationality.map((nat) => {
                              return (
                                <MenuItem value={nat}>{nat}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Language</label>
                        <FormControl fullWidth>
                          <Select
                            value={language}
                            size="small"
                            onChange={(e)=> setLanguage(e.target.value)}
                          >
                            {languages.map((lang) => {
                              return (
                                <MenuItem value={lang}>{lang}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </FormGroup>
                    </Col>
                  </Row>
                  {/*<Row>
                    <Col md="12">
                      <FormGroup>

                        <label>Area of interest</label>
                        <div>

                          {tourist.area_of_interest.map((element) => {

                            return (
                              <Chip
                                label={element}
                                style={{ marginRight: "2%" }}
                              />
                            );
                          })}
                        </div>
                      </FormGroup>
                    </Col>
                        </Row>*/}
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

export default User;
