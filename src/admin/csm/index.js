import React, { useState } from "react"
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Input,
    FormGroup,
    Label,
    Button,
    FormFeedback,
} from "reactstrap"
import * as Yup from "yup";
import { useFormik } from "formik";
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { alerShow } from '../commonFunction'

// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import '../../assets/scss/style.scss'
import { useEffect } from "react";

const FormElement = () => {

    //meta title
    document.title = " CSM Pages | GB";
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [formValues, setFormValues] = useState({ title: '', description: '', type: '' })

    const changeValues = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }
    const handleDescription = (editorState) => {
        setFormValues({ ...formValues, ['description']: editorState })
    }
    const handleCsmType = async (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
        await updateCsmContent(event.target.value);
    }

    useEffect(() => {
        updateCsmContent('about_us');
    }, [])

    const updateCsmContent = async (type) => {

        await axios.get(BASE_URL + 'admin/csm/detail?type=' + type)
            .then(function (response) {
                var Result = response.data.data;
                setFormValues({ title: Result.title, description: Result.description, type: Result.type })
            })
            .catch(function (error) {
                alerShow('Error', error.response.data.message, 'error');
            });
    }
    // Form validation 
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            description: formValues.description,
            title: formValues.title,
            type: formValues.type,
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter a Title"),
            type: Yup.string().required("Please Select Type Option"),
            description: Yup.string().required("Please Enter a Description"),
        }),
        onSubmit: (values) => {
            updateCSMcontent(values)
        }
    });

    const updateCSMcontent = async (data) => {

        await axios.post(BASE_URL + 'admin/csm/update',
            data
        )
            .then(function (response) {
                alerShow('Success', response.data.message, 'success');
            })
            .catch(function (error) {
                console.log(error, 'eeeee');
                alerShow('Error', error.response.data.message, 'error');
            });
    }


    return (
        <>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}

                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">CSM Pages</CardTitle>
                                    <form className="outer-repeater custom-error-val"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}>
                                        <div data-repeater-list="outer-group" className="outer">
                                            <div data-repeater-item className="outer">
                                                <FormGroup className="mb-4" row>
                                                    <Label className="col-form-label col-lg-2">
                                                        Select Page Type
                                                    </Label>
                                                    <Col lg="10">
                                                            <select className="form-control" name="type" onBlur={validation.handleBlur} onChange={handleCsmType}>
                                                                {/* <option value="">Select Type</option> */}
                                                                <option value="about_us">About Us</option>
                                                                <option value="privacy_policy">Privacy Policy</option>
                                                                <option value="term_conditions">Term and Conditions</option>
                                                            </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup className="mb-4" row>
                                                    <Label className="col-form-label col-lg-2">
                                                        Title
                                                    </Label>
                                                    <Col lg="10">
                                                        <Row>
                                                            <Col md={12} className="pr-0">
                                                                <input
                                                                    type="text"
                                                                    name="title"
                                                                    className="inner form-control"
                                                                    placeholder="Enter Name..."
                                                                    onBlur={validation.handleBlur}
                                                                    onChange={changeValues}
                                                                    value={formValues.title}
                                                                />
                                                                {validation.touched.title && validation.errors.title ? (
                                                                    <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup className="mb-4" row>
                                                    <Label className="col-form-label col-lg-2">
                                                        Description
                                                    </Label>
                                                    <Col lg="10 custom-form">
                                                        <JoditEditor
                                                            name="description"
                                                            id="description"
                                                            rows="5"
                                                            tabIndex={1} // tabIndex of textarea
                                                            onBlur={validation.handleBlur}
                                                            onChange={newContent => handleDescription(newContent)}
                                                            value={formValues.description}
                                                        />
                                                        {/* <Editor
                                                            name="description"
                                                            id="description"
                                                            toolbarClassName="toolbarClassName"
                                                            wrapperClassName="wrapperClassName"
                                                            editorClassName="editorClassName"
                                                            placeholder="Place Your Content Here..."
                                                            onBlur={validation.handleBlur}
                                                            // onChange={handleDescription}
                                                            onEditorStateChange={handleDescription}
                                                        /> */}
                                                        {validation.touched.description && validation.errors.description ? (
                                                            <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </FormGroup>

                                            </div>
                                        </div>
                                        <Row className="justify-content-end">
                                            <Col lg="10">
                                                <Button type="submit" color="primary">
                                                    Save
                                                </Button>
                                            </Col>
                                        </Row>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default FormElement
