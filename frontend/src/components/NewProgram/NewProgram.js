import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
    const [open, setOpen] = useState(props.open);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    useEffect(() => {
        setOpen(props.open)
    }, [props])

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={true}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>New program</DialogTitle>
                <DialogContent>
                    <Col md="12">
                        <Card className="card-user">
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>Title</label>
                                                <Input
                                                    placeholder="Title"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="3">
                                            <FormGroup>
                                                <label>Date</label>
                                                <Input
                                                    placeholder="Date"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-1" md="3">
                                            <FormGroup>
                                                <label>Inscriptions deadline</label>
                                                <Input
                                                    placeholder="Inscriptions deadline"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="3">
                                            <FormGroup>
                                                <label>Capacity</label>
                                                <Input placeholder="capacity" type="number" />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="3">
                                            <FormGroup>
                                                <label>price</label>
                                                <Input placeholder="Price" type="number" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>Description</label>
                                                <Input
                                                    type="textarea"
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
                                    <label>Save</label>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}