import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Container, Badge, CardTitle, Table } from "reactstrap";

import '../../assets/scss/style.css'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//i18n
import { withTranslation } from "react-i18next";

const Dashboard = props => {

    //meta title
    document.title = "Transaction Details | Aurres";
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [dateFilter, setDateFilter] = useState([]);

    const handleDateEvent = async (event) => {
        console.log(event.length)
        if (event.length == 2) {
            // let filterDate = [];
            // filterDate[0] = moment(event[0]).format('YYYY-MM-DD');
            // filterDate[1] = moment(event[1]).format('YYYY-MM-DD');
            // setDateFilter(filterDate);
            // await fetchData(1, perPage, '', statusFilter, filterDate);
        }
    }

    return (
        <React.Fragment>
            <div className="page-content margin-custom">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={props.t("Dashboard")}
                        breadcrumbItem={props.t("Transaction Details")}
                    />

                    <Row>
                        <Col xl="12">
                            <Row>
                                <Col sm="3">
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <div className="d-flex">
                                                <div className="me-4 align-self-center">
                                                    <i className="mdi mdi-chart-box-outline h2 text-success mb-0" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="text-muted mb-2">Total Transaction </p>
                                                    <h5 className="mb-0">
                                                        <span className="font-size-14 text-muted">
                                                            04
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="3">
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <div className="d-flex">
                                                <div className="me-4 align-self-center">
                                                    <i className="mdi mdi-chart-box-outline h2 text-success mb-0" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="text-muted mb-2">Total Commission </p>
                                                    <h5 className="mb-0">
                                                        <span className="font-size-14 text-muted">
                                                            $ 240.00
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="3">
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <div className="d-flex">
                                                <div className="me-4 align-self-center">
                                                    <i className="mdi mdi-chart-box-outline h2 text-success mb-0" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="text-muted mb-2">Send Commission </p>
                                                    <h5 className="mb-0">
                                                        <span className="font-size-14 text-muted">
                                                            $ 180.00
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="3">
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <div className="d-flex">
                                                <div className="me-4 align-self-center">
                                                    <i className="mdi mdi-chart-box-outline h2 text-success mb-0" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="text-muted mb-2">Swap Commission </p>
                                                    <h5 className="mb-0">
                                                        <span className="font-size-14 text-muted">
                                                            $ 60.00
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Card>
                                <CardBody className="border-bottom py-2">
                                    <div className="d-flex align-items-center">
                                        <h5 className="mb-0 card-title flex-grow-1">

                                            <div className="checkbox-wrap" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <div className="form-check me-4 ps-0">
                                                    <Link to="/admin/transactions" className="btn btn-secondary">
                                                        <i className="mdi mdi-keyboard-backspace"></i> Back
                                                    </Link>
                                                </div>
                                                <div className="form-check me-4 ms-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="defaultCheck1"
                                                        defaultChecked
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="defaultCheck1"
                                                    >
                                                        Send Commission
                                                    </label>
                                                </div>

                                                <div className="form-check ms-4">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="defaultCheck2"
                                                        defaultChecked
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="defaultCheck2"
                                                    >
                                                        Swap Commission
                                                    </label>
                                                </div>
                                            </div>
                                        </h5>
                                        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                                            <div className="position-relative" style={{ marginTop: '10px' }}>
                                                <label htmlFor="search-bar-0" className="search-label">
                                                    <span id="search-bar-0-label" className="sr-only">
                                                        Search this table
                                                    </span>
                                                    <input
                                                        id="search-bar-0"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={`Search...`}
                                                    />
                                                </label>
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>

                                        <Flatpickr className="form-control d-block" style={{ width: '200px', marginRight: '8px' }} onChange={(date) => handleDateEvent(date)} placeholder="Select Dates" options={{ mode: "range", dateFormat: "Y-m-d" }} />
                                        <div className="flex-shrink-0">
                                            <Link to="#!" className="btn btn-light me-1"><i className="mdi mdi-refresh"></i></Link>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardBody>
                                    <div className="table-responsive">
                                        <Table className="table mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date</th>
                                                    <th>Sender (Wallet ID)</th>
                                                    <th>Receiver (Wallet ID)</th>
                                                    <th>Type</th>
                                                    <th>Transaction Amount</th>
                                                    <th>Commission</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td> 12 Nov, 2022 - 01:00 AM </td>
                                                    <td>96580a5w8e6s2w3s250</td>
                                                    <td>91100a5w8e6s2w3s100</td>
                                                    <td> <Badge className="bg-info"> Send </Badge> </td>
                                                    <td>$ 250.00</td>
                                                    <td>$ 50.00</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td> 12 Nov, 2022 - 03:00 AM </td>
                                                    <td>89990a5w8e6s2w3s000</td>
                                                    <td>15880a5w8e6s2w3s666</td>
                                                    <td> <Badge className="bg-default"> Swap </Badge> </td>
                                                    <td>$ 190.00</td>
                                                    <td>$ 30.00</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td> 12 Nov, 2022 - 09:00 AM </td>
                                                    <td>75555a5w8e6s2w3s000</td>
                                                    <td>63333a5w8e6s2w3s666</td>
                                                    <td> <Badge className="bg-default"> Swap </Badge> </td>
                                                    <td>$ 290.00</td>
                                                    <td>$ 90.00</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td> 12 Nov, 2022 - 11:00 AM </td>
                                                    <td>75555a5w8e6s2w3s000</td>
                                                    <td>63333a5w8e6s2w3s666</td>
                                                    <td> <Badge className="bg-info"> Send </Badge> </td>
                                                    <td>$ 370.00</td>
                                                    <td>$ 110.00</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td> 12 Nov, 2022 - 12:10 PM </td>
                                                    <td>75555a5w8e6s2w3s000</td>
                                                    <td>63333a5w8e6s2w3s666</td>
                                                    <td> <Badge className="bg-info"> Send </Badge> </td>
                                                    <td>$ 310.00</td>
                                                    <td>$ 100.00</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">6</th>
                                                    <td> 12 Nov, 2022 - 01:15 PM </td>
                                                    <td>75555a5w8e6s2w3s000</td>
                                                    <td>63333a5w8e6s2w3s666</td>
                                                    <td> <Badge className="bg-info"> Send </Badge> </td>
                                                    <td>$ 260.00</td>
                                                    <td>$ 60.00</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">7</th>
                                                    <td> 12 Nov, 2022 - 01:30 PM </td>
                                                    <td>75555a5w8e6s2w3s000</td>
                                                    <td>63333a5w8e6s2w3s666</td>
                                                    <td> <Badge className="bg-default"> Swap </Badge> </td>
                                                    <td>$ 190.00</td>
                                                    <td>$ 30.00</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">8</th>
                                                    <td> 12 Nov, 2022 - 03:00 PM </td>
                                                    <td>75555a5w8e6s2w3s000</td>
                                                    <td>63333a5w8e6s2w3s666</td>
                                                    <td> <Badge className="bg-info"> Send </Badge> </td>
                                                    <td>$ 210.00</td>
                                                    <td>$ 70.00</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl="12">
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
