import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Container, Badge, CardTitle, Label, Button, Form, Input, InputGroup, FormFeedback } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import '../../assets/scss/style.css'

import axios from 'axios';
import moment from 'moment'
import { alerShow, dateformat } from '../commonFunction'

import Image1 from '../../assets/images/Frame11.png'
import Image2 from '../../assets/images/Frame12.png'
import Image3 from '../../assets/images/Frame13.png'
import Image4 from '../../assets/images/Frame14.png'
import Image6 from '../../assets/images/Frame16.png'
import Image7 from '../../assets/images/Frame17.png'
import Image8 from '../../assets/images/Frame18.png'
import Image9 from '../../assets/images/Frame19.png'
import Image0 from '../../assets/images/Frame20.png'

const ManageIcon = props => {

    //meta title
    document.title = "Icon | Aurres";
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const BASE_PATH = process.env.REACT_APP_BASE_PATH;
    
    const [imageListing, setImageListing] = useState([])
    const [image, setSelectedImage] = useState([])
    const [file, setFile] = useState();
    const [preview, setPreview] = useState(null);

    const onAddImage = async (event, index, id) => {
        image[index] = event.target.files[0]

        var formData = new FormData();
        formData.append('image', event.target.files[0])
        formData.append('icon_id', id)

        await axios.post(`${BASE_URL}user/upload-icon`, formData)
            .then(function (response) {
                console.log(response.data, 'resp data >>>>>>>>>>>>>>>')
                alerShow('Success', response.data.message, 'success');
                getImageListing();
            })
            .catch(function (error) {
                alerShow('Error', error.response.data.message, 'error');
            });

        // window.URL.revokeObjectURL(preview);
        // console.log(window.URL.createObjectURL(file), 'Image Preview >>>>>>>>>>>>>>>>>>>>>') // 
    };

    useEffect(() => {
        getImageListing();
    }, []);

    const getImageListing = async () => {

        await axios.get(`${BASE_URL}user/dynamic-icon`)
            .then(function (response) {
                setImageListing(response.data.data)
            })
            .catch(function (error) {
                alerShow('Error', error.response.data.message, 'error');
            });
    }

    const handleSubmit = async () => {
        
        // var formData = new FormData();
        // for(var i = 0; i < image.length; i++){
        //     formData.append('image', image[i])
        // }

        // await axios.post(`${BASE_URL}user/upload-icon`, formData)
        //     .then(function (response) {
        //         console.log(response.data, 'resp data >>>>>>>>>>>>>>>')
        //     })
        //     .catch(function (error) {
        //         alerShow('Error', error.response.data.message, 'error');
        //     });
    }

    return (
        <React.Fragment>
            <div className="page-content margin-custom">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title="Dashboard"
                        breadcrumbItem="Manage Icon"
                    />

                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody className="mt-0 pt-0">
                                    <CardTitle className="h5 mb-0">  </CardTitle>

                                        <div className="row gy-2 gx-3 align-items-center">
                                            {
                                                imageListing.map((value, index) => {

                                                    return <div className="col-sm-2 mt-4" key={index}>
                                                        <img className="rounded me-2 form-control" alt="200x200" width="160" src={`${BASE_PATH}${value.icon}`} data-holder-rendered="true" />

                                                        <input
                                                            type="file"
                                                            className="form-control mt-1"
                                                            id="resume"
                                                            onChange={(img) => onAddImage(img, index, value._id)}
                                                        />
                                                    </div>
                                                })
                                            }

                                        </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>

        </React.Fragment>
    );
};

export default ManageIcon;
