import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Container, Badge, CardTitle, Label, Button, Form, Input, InputGroup, FormFeedback } from "reactstrap";
//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import '../../assets/scss/style.css'

import { alerShow } from '../commonFunction'
import axios from "axios"
import * as Yup from "yup";
import { useFormik } from "formik";

const Dashboard = props => {

    //meta title
    document.title = "Commission | Aurres";
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [formValues, setFormValues] = useState({ bitcoinWalletId: '', ethereumWalletId: '', litecoinWalletId: '', binanceWalletId: '', tronWalletId: '' })
    const [walletID, setWalletID] = useState(null)

    useEffect(() => {
        getWalletIdListing();
    }, [])

    const getWalletIdListing = async () => {

        await axios.get(`${BASE_URL}admin/walletIds`)
        .then((response) => {
            var respData = response.data.data;
            setFormValues({ bitcoinWalletId: respData.bitcoinWalletId, ethereumWalletId: respData.ethereumWalletId, litecoinWalletId: respData.litecoinWalletId, binanceWalletId: respData.binanceWalletId, tronWalletId: respData.tronWalletId })
        }).catch((error) => {
            alerShow('Error', error.response.data.message, 'error');
        })
    }

    
    const changeValues = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }

    // Form validation 
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            bitcoinWalletId: formValues.bitcoinWalletId,
            ethereumWalletId: formValues.ethereumWalletId,
            litecoinWalletId: formValues.litecoinWalletId,
            binanceWalletId: formValues.binanceWalletId,
            tronWalletId: formValues.tronWalletId,
        },
        validationSchema: Yup.object({
            bitcoinWalletId: Yup.string().required("Please Enter Your Wallet ID"),
            ethereumWalletId: Yup.string().required("Please Enter Your  Wallet ID"),
            litecoinWalletId: Yup.string().required("Please Enter Your Wallet ID"),
            binanceWalletId: Yup.string().required("Please Enter Your Wallet ID"),
            tronWalletId: Yup.string().required("Please Enter Your Wallet ID"),
        }),
        onSubmit: (values) => {
            submitWalletInformationRequest(values);
        }
    });

    const submitWalletInformationRequest = async (data) => {

        await axios.post(`${BASE_URL}admin/walletId/store`, data)
            .then((response) => {
                alerShow('Success', response.data.message, 'success');
            }).catch((error) => {
                alerShow('Error', error.response.data.message, 'error');
            })
    }

    return (
        <React.Fragment>
            <div className="page-content margin-custom">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={props.t("Dashboard")}
                        breadcrumbItem={props.t("Wallet Details")}
                    />

                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>

                                    <Form className="needs-validation create-vendor"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                    >
                                        <div className="row gy-2 gx-3 my-2 align-items-center">
                                            <Col className="col-lg-6 col-md-4 col-sm-12">
                                                <Card>
                                                    <CardBody>
                                                        <Label
                                                            htmlFor="horizontal-firstname-Input"
                                                            className="col-form-label"
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <div className="avatar-xs me-3">
                                                                <span className="avatar-title rounded-circle bg-warning bg-soft text-warning font-size-18">
                                                                    <i className="mdi mdi-bitcoin mdi-18px"></i>
                                                                </span>
                                                            </div>  Bitcoin Wallet ID
                                                        </Label>
                                                        <div>
                                                            <Input type="text" value={formValues ? formValues.bitcoinWalletId:''} className="form-control mt-3" id="autoSizingInput" name="bitcoinWalletId" onBlur={validation.handleBlur} onChange={changeValues} placeholder="Write here..." />
                                                        </div>
                                                        {validation.touched.bitcoinWalletId && validation.errors.bitcoinWalletId ? (
                                                            <FormFeedback type="invalid">{validation.errors.bitcoinWalletId}</FormFeedback>
                                                        ) : null}
                                                    </CardBody>
                                                </Card>
                                            </Col>

                                            <Col className="col-lg-6 col-md-4 col-sm-12">
                                                <Card>
                                                    <CardBody>
                                                        <Label
                                                            htmlFor="horizontal-firstname-Input"
                                                            className="col-form-label"
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <div className="avatar-xs me-3">
                                                                <span className="avatar-title rounded-circle bg-info bg-soft text-info font-size-18">
                                                                    <i className="mdi mdi-ethereum mdi-18px"></i>
                                                                </span>
                                                            </div> Ethereum Wallet ID
                                                        </Label>
                                                        <div>
                                                            <Input type="text" value={formValues ? formValues.ethereumWalletId :''} className="form-control mt-3" id="autoSizingInput" name="ethereumWalletId" onBlur={validation.handleBlur} onChange={changeValues} placeholder="Write here..." />
                                                        </div>
                                                        {validation.touched.ethereumWalletId && validation.errors.ethereumWalletId ? (
                                                            <FormFeedback type="invalid">{validation.errors.ethereumWalletId}</FormFeedback>
                                                        ) : null}
                                                    </CardBody>
                                                </Card>
                                            </Col>

                                            <Col className="col-lg-6 col-md-4 col-sm-12">
                                                <Card>
                                                    <CardBody>
                                                        <Label
                                                            htmlFor="horizontal-firstname-Input"
                                                            className="col-form-label"
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <div className="avatar-xs me-3">
                                                                <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                                                                    <i className="mdi mdi-litecoin mdi-18px"></i>
                                                                </span>
                                                            </div>  Litecoin Wallet ID
                                                        </Label>
                                                        <div>
                                                            <Input type="text" value={formValues ? formValues.litecoinWalletId:''} className="form-control mt-3" id="autoSizingInput" name="litecoinWalletId" onBlur={validation.handleBlur} onChange={changeValues} placeholder="Write here..." />
                                                        </div>
                                                        {validation.touched.litecoinWalletId && validation.errors.litecoinWalletId ? (
                                                            <FormFeedback type="invalid">{validation.errors.litecoinWalletId}</FormFeedback>
                                                        ) : null}
                                                    </CardBody>
                                                </Card>
                                            </Col>

                                            <Col className="col-lg-6 col-md-4 col-sm-12">
                                                <Card>
                                                    <CardBody>
                                                        <Label
                                                            htmlFor="horizontal-firstname-Input"
                                                            className="col-form-label"
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <div className="avatar-xs me-3">
                                                                <span className="avatar-title rounded-circle bg-success bg-soft text-success font-size-18">
                                                                    <i className="mdi mdi-arrange-bring-forward mdi-18px"></i>
                                                                </span>
                                                            </div>   Binance Wallet ID
                                                        </Label>
                                                        <div>
                                                            <Input type="text" value={formValues ? formValues.binanceWalletId:''} className="form-control mt-3" id="autoSizingInput" name="binanceWalletId" onBlur={validation.handleBlur} onChange={changeValues} placeholder="Write here..." />
                                                        </div>
                                                        {validation.touched.binanceWalletId && validation.errors.binanceWalletId ? (
                                                            <FormFeedback type="invalid">{validation.errors.binanceWalletId}</FormFeedback>
                                                        ) : null}
                                                    </CardBody>
                                                </Card>
                                            </Col>

                                            <Col className="col-lg-6 col-md-4 col-sm-12">
                                                <Card>
                                                    <CardBody>
                                                        <Label
                                                            htmlFor="horizontal-firstname-Input"
                                                            className="col-form-label"
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <div className="avatar-xs me-3">
                                                                <span className="avatar-title rounded-circle bg-secondary bg-soft text-secondary font-size-18">
                                                                    <i className="mdi mdi-arrange-bring-forward mdi-18px"></i>
                                                                </span>
                                                            </div>   Tron Wallet ID
                                                        </Label>
                                                        <div>
                                                            <Input type="text" value={formValues ? formValues.tronWalletId:''} className="form-control mt-3" id="autoSizingInput" name="tronWalletId" onBlur={validation.handleBlur} onChange={changeValues} placeholder="Write here..." />
                                                        </div>
                                                        {validation.touched.tronWalletId && validation.errors.tronWalletId ? (
                                                            <FormFeedback type="invalid">{validation.errors.tronWalletId}</FormFeedback>
                                                        ) : null}
                                                    </CardBody>
                                                </Card>
                                            </Col>

                                        </div>

                                        <div className="row gy-2 gx-3 mb-3 align-items-center">
                                            <div className="col-sm-auto">
                                                <button type="submit" className="btn btn-primary w-md">Submit</button>
                                            </div>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>

        </React.Fragment>
    );
};


Dashboard.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
