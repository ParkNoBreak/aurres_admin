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
  // const [commission, setCommission] = useState({ sendCommision: 0, sendCommisionType: 'fixed', swapCommission: 0, swapCommissionType: 'fixed' })

  const [commission, setCommission] = useState({ SwapCommission: 0, BitcoinCommission: 0, EthereumCommission: 0, LitecoinCommission: 0, BinanceCommission: 0, TronCommission: 0 })
  const [CalCommission, setCalCommission] = useState({ CalSwapCommission: 0, CalBitcoinCommission: 0, CalEthereumCommission: 0, CalLitecoinCommission: 0, CalBinanceCommission: 0, CalTronCommission: 0 })

  const [commissionPrice, setCommissionPrice] = useState({ sendCommision: null, swapCommission: null })
  const [formValues, setFormValues] = useState({ bitcoinWalletId: '', ethereumWalletId: '', litecoinWalletId: '', binanceWalletId: '', tronWalletId: '' })

  useEffect(() => {
    getCommissionPrice()
  }, [])

  useEffect(() => {
    getCalculateCommission()
  }, [commission])

  const getCommissionPrice = async () => {
    await axios.get(`${BASE_URL}admin/commission`)
      .then((response) => {
        let data = response.data.data;
        if (data) {
          setCommission({ SwapCommission: data.SwapCommission, BitcoinCommission: data.BitcoinCommission, EthereumCommission: data.EthereumCommission, LitecoinCommission: data.LitecoinCommission, BinanceCommission: data.BinanceCommission, TronCommission: data.TronCommission })
        }
      }).catch((error) => {
        alerShow('Error', error.response.data.message, 'error');
      })
  }

  const getCalculateCommission = async () => {

    console.log(commission, '>>>>>>>>')

    setCalCommission({ CalSwapCommission: commission.SwapCommission + '% Commission', CalBitcoinCommission: commission.BitcoinCommission + ' BTC', CalEthereumCommission: commission.EthereumCommission + ' ETH', CalLitecoinCommission: commission.LitecoinCommission + ' LTC', CalBinanceCommission: commission.BinanceCommission + ' BNB', CalTronCommission: commission.TronCommission + ' TRX' })
  }

  function onChangeTagInput(event) {
    if (event.target.name == 'SwapCommission' && event.target.value > 100) {
      setCommission({ ...commission, [event.target.name]: commission.SwapCommission })
    } else {
      setCommission({ ...commission, [event.target.name]: event.target.value })
      // getCalculateCommission(event.target.name, event.target.value)
    }
  }


  // Form validation 
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      SwapCommission: commission.SwapCommission,
      BitcoinCommission: commission.BitcoinCommission,
      EthereumCommission: commission.EthereumCommission,
      LitecoinCommission: commission.LitecoinCommission,
      BinanceCommission: commission.BinanceCommission,
      TronCommission: commission.TronCommission,
    },
    validationSchema: Yup.object({
      SwapCommission: Yup.string().required("This field is required."),
      BitcoinCommission: Yup.string().required("This field is required."),
      EthereumCommission: Yup.string().required("This field is required."),
      LitecoinCommission: Yup.string().required("This field is required."),
      BinanceCommission: Yup.string().required("This field is required."),
      TronCommission: Yup.string().required("This field is required."),
    }),
    onSubmit: (values) => {
      submitCommissionInformationRequest(values);
    }
  });

  const submitCommissionInformationRequest = async (data) => {

    await axios.post(`${BASE_URL}admin/update/commisssion`, data)
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
            breadcrumbItem={props.t("Manage Commission")}
          />

          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <CardTitle className="h5 mb-4">  </CardTitle>
                  <Form className="needs-validation create-vendor"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >

                    <div className="row gy-2 gx-3 align-items-center">
                      <h5
                        htmlFor="horizontal-firstname-Input"
                        className="col-sm-2"
                      >
                        Send Commission
                      </h5>


                      <div className="row gy-2 gx-3 my-2 align-items-center">
                        <Col className="col-lg-3">
                          <Card>
                            <CardBody>
                              <div className="d-flex align-items-center justify-content-between">
                                <Label
                                  htmlFor="horizontal-firstname-Input"
                                  className="col-form-label"
                                  style={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-warning bg-soft text-warning font-size-18">
                                      <i className="mdi mdi-bitcoin mdi-18px"></i>
                                    </span>
                                  </div>  Bitcoin <br /> Commission
                                </Label>
                                <Label className="mb-0">{CalCommission.CalBitcoinCommission}</Label>
                              </div>
                              <div>
                                <Input type="number" value={commission.BitcoinCommission} className="form-control mt-1" id="autoSizingInput" name="BitcoinCommission" onBlur={validation.handleBlur} onChange={(e) => onChangeTagInput(e)} placeholder="Write here..." />
                              </div>
                              {validation.touched.BitcoinCommission && validation.errors.BitcoinCommission ? (
                                <FormFeedback type="invalid">{validation.errors.BitcoinCommission}</FormFeedback>
                              ) : null}
                            </CardBody>
                          </Card>
                        </Col>

                        <Col className="col-lg-3">
                          <Card>
                            <CardBody>
                              <div className="d-flex align-items-center justify-content-between">
                                <Label
                                  htmlFor="horizontal-firstname-Input"
                                  className="col-form-label"
                                  style={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-info bg-soft text-info font-size-18">
                                      <i className="mdi mdi-ethereum mdi-18px"></i>
                                    </span>
                                  </div> Ethereum <br /> Commission
                                </Label>
                                <Label className="mb-0">{CalCommission.CalEthereumCommission}</Label>
                              </div>
                              <div>
                                <Input type="number" value={commission.EthereumCommission} className="form-control mt-1" id="autoSizingInput" name="EthereumCommission" onBlur={validation.handleBlur} onChange={(e) => onChangeTagInput(e)} placeholder="Write here..." />
                              </div>
                              {validation.touched.EthereumCommission && validation.errors.EthereumCommission ? (
                                <FormFeedback type="invalid">{validation.errors.EthereumCommission}</FormFeedback>
                              ) : null}
                            </CardBody>
                          </Card>
                        </Col>

                        <Col className="col-lg-3">
                          <Card>
                            <CardBody>
                              <div className="d-flex align-items-center justify-content-between">
                                <Label
                                  htmlFor="horizontal-firstname-Input"
                                  className="col-form-label"
                                  style={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                                      <i className="mdi mdi-litecoin mdi-18px"></i>
                                    </span>
                                  </div>  Litecoin <br /> Commission
                                </Label>
                                <Label className="mb-0">{CalCommission.CalLitecoinCommission}</Label>
                              </div>
                              <div>
                                <Input type="number" value={commission.LitecoinCommission} className="form-control mt-1" id="autoSizingInput" name="LitecoinCommission" onBlur={validation.handleBlur} onChange={(e) => onChangeTagInput(e)} placeholder="Write here..." />
                              </div>
                              {validation.touched.LitecoinCommission && validation.errors.LitecoinCommission ? (
                                <FormFeedback type="invalid">{validation.errors.LitecoinCommission}</FormFeedback>
                              ) : null}
                            </CardBody>
                          </Card>
                        </Col>

                        <Col className="col-lg-3">
                          <Card>
                            <CardBody>
                              <div className="d-flex align-items-center justify-content-between">
                                <Label
                                  htmlFor="horizontal-firstname-Input"
                                  className="col-form-label"
                                  style={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-success bg-soft text-success font-size-18">
                                      <i className="mdi mdi-arrange-bring-forward mdi-18px"></i>
                                    </span>
                                  </div>   Binance <br /> Commission
                                </Label>
                                <Label className="mb-0">{CalCommission.CalBinanceCommission}</Label>
                              </div>
                              <div>
                                <Input type="number" value={commission.BinanceCommission} className="form-control mt-1" id="autoSizingInput" name="BinanceCommission" onBlur={validation.handleBlur} onChange={(e) => onChangeTagInput(e)} placeholder="Write here..." />
                              </div>
                              {validation.touched.BinanceCommission && validation.errors.BinanceCommission ? (
                                <FormFeedback type="invalid">{validation.errors.BinanceCommission}</FormFeedback>
                              ) : null}
                            </CardBody>
                          </Card>
                        </Col>

                        <Col className="col-lg-3">
                          <Card>
                            <CardBody>
                              <div className="d-flex align-items-center justify-content-between">
                                <Label
                                  htmlFor="horizontal-firstname-Input"
                                  className="col-form-label"
                                  style={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-secondary bg-soft text-secondary font-size-18">
                                      <i className="mdi mdi-arrange-bring-forward mdi-18px"></i>
                                    </span>
                                  </div>   Tron <br /> Commission
                                </Label>
                                <Label className="mb-0">{CalCommission.CalTronCommission}</Label>
                              </div>
                              <div>
                                <Input type="number" value={commission.TronCommission} className="form-control mt-1" id="autoSizingInput" name="TronCommission" onBlur={validation.handleBlur} onChange={(e) => onChangeTagInput(e)} placeholder="Write here..." />
                              </div>
                              {validation.touched.TronCommission && validation.errors.TronCommission ? (
                                <FormFeedback type="invalid">{validation.errors.TronCommission}</FormFeedback>
                              ) : null}
                            </CardBody>
                          </Card>
                        </Col>
                      </div>

                    </div>
                    <div className="row gy-2 gx-3 align-items-center mt-3 ms-2">
                      <h5
                        htmlFor="horizontal-firstname-Input"
                        className="col-sm-12"
                      >
                        Swap Commission
                      </h5>
                      <div className="col-sm-3">
                        <Label className="visually-hidden" htmlFor="autoSizingInput">Name</Label>
                        <Input type="number" className="form-control" id="autoSizingInput" name="SwapCommission" placeholder="Write here..." onBlur={validation.handleBlur} onChange={(e) => onChangeTagInput(e)} value={commission ? commission.SwapCommission : ''} />
                        {validation.touched.SwapCommission && validation.errors.SwapCommission ? (
                          <FormFeedback type="invalid">{validation.errors.SwapCommission}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-sm-auto ms-4">
                        <h5 className="form-check-label" htmlFor="">
                          <strong>[ </strong>
                          {CalCommission.CalSwapCommission}
                          <strong> ]</strong>
                        </h5>
                      </div>
                    </div>
                    <div className="row gy-2 gx-3 align-items-center mt-3">
                      <div className="col-sm-auto">
                        <button type="submit" className="btn btn-primary w-md">Submit</button>
                      </div>
                    </div>

                    <input type="hidden" id="calculatePriceId" onClick={getCalculateCommission} />
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
