import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Container, Badge, CardTitle } from "reactstrap";
//import action
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import axios from 'axios';
import moment from 'moment'
import { alerShow, dateformat, removeHeaderToken, apiHeader } from '../commonFunction'

// Pages Components
import CardUser from "./CardUser";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import '../../assets/scss/style.css'

const Dashboard = props => {

  //meta title
  document.title = "Dashboard | Aurres";
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isLoaded, setIsLoaded] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalpages] = useState(0);
  const [totalRecord, setTotalRecord] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  let [incermentInd, setIncrementInd] = useState(1);
  const [loaderStatus, setLoaderStatus] = useState(true);

  const [cryptoPrice, setCryptoPrice] = useState({ 'BTCUSDT': 0, 'ETHUSDT': 0, 'BNBUSDT': 0, 'MATICUSDT': 0, 'AVAXUSDT': 0 });
  const [StatsTransaction, setStatsTransaction] = useState({ 'TotalAmount': 0, 'SendCommission': 0, 'SwapCommission': 0 });

  useEffect(() => {
    getCurrentPrice();
  }, [])

  useEffect(() => {
    apiHeader();
    fetchData(1, 5);
  }, [])

  const getCurrentPrice = async () => {
    removeHeaderToken();
    await axios.get('https://api.binance.com/api/v3/ticker/price?symbols=%5B%22ETHUSDT%22,%22BNBUSDT%22,%22MATICUSDT%22,%22BTCUSDT%22,%22AVAXUSDT%22%5D')
      .then(function (response) {

        var objectValue = {};
        for (var value of response.data) {
          objectValue[value.symbol] = value.price;
        }
        getStatsPrice(objectValue);
        setCryptoPrice(objectValue);
      })
      .catch((err) => {
        // console.log(err)
      });
  }

  const getStatsPrice = async (cryptoCurrentPrice) => {

    console.log(cryptoCurrentPrice, 'cryptoCurrentPrice >>>>>>>>>>')

    await axios.get(`${BASE_URL}admin/stats/transactions`)
      .then(function (response) {

        var result = response.data.data;
        var statsTrans = {};

        var totalAmountStats = 0;
        totalAmountStats += (result.BinanceAmount.length > 0) ? parseFloat(result.BinanceAmount[0].sum) * cryptoCurrentPrice.BNBUSDT : 0;
        totalAmountStats += (result.EthereumAmount.length > 0) ? parseFloat(result.EthereumAmount[0].sum) * cryptoCurrentPrice.ETHUSDT : 0;
        totalAmountStats += (result.PolygonAmount.length > 0) ? parseFloat(result.PolygonAmount[0].sum) * cryptoCurrentPrice.MATICUSDT : 0;
        totalAmountStats += (result.AvalancheAmount.length > 0) ? parseFloat(result.AvalancheAmount[0].sum) * cryptoCurrentPrice.AVAXUSDT : 0;
        totalAmountStats += (result.BitcoinAmount.length > 0) ? parseFloat(result.BitcoinAmount[0].sum) * cryptoCurrentPrice.BTCUSDT : 0;
        totalAmountStats += (result.ArbitrumAmount.length > 0) ? parseFloat(result.ArbitrumAmount[0].sum) * cryptoCurrentPrice.ETHUSDT : 0;

        var totalCommissionStats = 0;
        totalCommissionStats += (result.BinanceCommission.length > 0) ? parseFloat(result.BinanceCommission[0].sum) * cryptoCurrentPrice.BNBUSDT : 0;
        totalCommissionStats += (result.EthereumCommission.length > 0) ? parseFloat(result.EthereumCommission[0].sum) * cryptoCurrentPrice.ETHUSDT : 0;
        totalCommissionStats += (result.PolygonCommission.length > 0) ? parseFloat(result.PolygonCommission[0].sum) * cryptoCurrentPrice.MATICUSDT : 0;
        totalCommissionStats += (result.AvalancheCommission.length > 0) ? parseFloat(result.AvalancheCommission[0].sum) * cryptoCurrentPrice.AVAXUSDT : 0;
        totalCommissionStats += (result.BitcoinCommission.length > 0) ? parseFloat(result.BitcoinCommission[0].sum) * cryptoCurrentPrice.BTCUSDT : 0;
        totalCommissionStats += (result.ArbitrumCommission.length > 0) ? parseFloat(result.ArbitrumCommission[0].sum) * cryptoCurrentPrice.ETHUSDT : 0;

        var totalCommissionSwap = 0;
        totalCommissionSwap += (result.BinanceSwapCommission.length > 0) ? parseFloat(result.BinanceSwapCommission[0].sum) * cryptoCurrentPrice.BNBUSDT : 0;
        totalCommissionSwap += (result.EthereumSwapCommission.length > 0) ? parseFloat(result.EthereumSwapCommission[0].sum) * cryptoCurrentPrice.ETHUSDT : 0;
        totalCommissionSwap += (result.PolygonSwapCommission.length > 0) ? parseFloat(result.PolygonSwapCommission[0].sum) * cryptoCurrentPrice.MATICUSDT : 0;
        totalCommissionSwap += (result.AvalancheSwapCommission.length > 0) ? parseFloat(result.AvalancheSwapCommission[0].sum) * cryptoCurrentPrice.AVAXUSDT : 0;
        totalCommissionSwap += (result.BitcoinSwapCommission.length > 0) ? parseFloat(result.BitcoinSwapCommission[0].sum) * cryptoCurrentPrice.BTCUSDT : 0;
        totalCommissionSwap += (result.ArbitrumSwapCommission.length > 0) ? parseFloat(result.ArbitrumSwapCommission[0].sum) * cryptoCurrentPrice.ETHUSDT : 0;

        setStatsTransaction({ 'TotalAmount': totalAmountStats, 'SendCommission': totalCommissionStats, 'SwapCommission': totalCommissionSwap });
        return true;
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const fetchData = async (page, per_page, search = '', type = '', dates = '') => {

    await axios.get(`${BASE_URL}admin/transactions?page=${page}&limit=${per_page}&search=${search}&dates=` + dates)
      .then(function (response) {
        setTransactions(response.data.data.transactions);
        if (response.data.data.total_count > 0) {
          setTotalRecord(true);
        } else {
          setTotalRecord(false);
        }
        setLoaderStatus(false);
      })
      .catch(function (error) {
        setIsLoaded(true);
        // alerShow('Error', error.response.data.message, 'error');
        console.log(error)
      });
  }

  return (
    <React.Fragment>
      <div className="page-content margin-custom">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="12">
              <CardUser StatsTransaction={StatsTransaction} cryptoPrice={cryptoPrice} dataColors='["--bs-primary", "--bs-warning"]' />
            </Col>
          </Row>
          <Card>
            <CardBody className="border-bottom py-2">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 card-title flex-grow-1"> Latest Transactions </h5>

                <div className="flex-shrink-0">
                  <Link to="/admin/transactions" className="btn btn-light me-1"> View All </Link>
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
                      <th>Blockchain</th>
                      <th>Transaction Amount</th>
                      <th>Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      (loaderStatus) ?
                        <Tr>
                          <Td colSpan="8"> Loading ... </Td>
                        </Tr>
                        : (!totalRecord) ?
                          <Tr>
                            <Td colSpan="8"> No Result Found </Td>
                          </Tr>
                          : (transactions) ?
                            transactions.map((value, ind) => {
                              var transAmount = (value.cryptoType.toLowerCase() == 'ethereum') ? value.transactionAmount * cryptoPrice.ETHUSDT :
                                (value.cryptoType.toLowerCase() == 'binance smart chain') ? value.transactionAmount * cryptoPrice.BNBUSDT :
                                  (value.cryptoType.toLowerCase() == 'polygon') ? value.transactionAmount * cryptoPrice.MATICUSDT :
                                    (value.cryptoType.toLowerCase() == 'avalanche') ? value.transactionAmount * cryptoPrice.AVAXUSDT :
                                      (value.cryptoType.toLowerCase() == 'bitcoin') ? value.transactionAmount * cryptoPrice.BTCUSDT :
                                        (value.cryptoType.toLowerCase() == 'Arbitrum') ? value.transactionAmount * cryptoPrice.ETHUSDT : 0;

                              var commAmount = (value.cryptoType.toLowerCase() == 'ethereum') ? value.commissionAmount * cryptoPrice.ETHUSDT :
                                (value.cryptoType.toLowerCase() == 'binance smart chain') ? value.commissionAmount * cryptoPrice.BNBUSDT :
                                  (value.cryptoType.toLowerCase() == 'polygon') ? value.commissionAmount * cryptoPrice.MATICUSDT :
                                    (value.cryptoType.toLowerCase() == 'avalanche') ? value.commissionAmount * cryptoPrice.AVAXUSDT :
                                      (value.cryptoType.toLowerCase() == 'bitcoin') ? value.commissionAmount * cryptoPrice.BTCUSDT :
                                        (value.cryptoType.toLowerCase() == 'Arbitrum') ? value.commissionAmount * cryptoPrice.ETHUSDT : 0;

                              var cryptoCoin = (value.cryptoType.toLowerCase() == 'ethereum') ? 'ETH' :
                                (value.cryptoType.toLowerCase() == 'binance smart chain') ? 'BNB' :
                                  (value.cryptoType.toLowerCase() == 'polygon') ? 'MATIC' :
                                    (value.cryptoType.toLowerCase() == 'avalanche') ? 'AVAX' :
                                      (value.cryptoType.toLowerCase() == 'bitcoin') ? 'BTC' :
                                        (value.cryptoType.toLowerCase() == 'Arbitrum') ? "ARB" : 0;

                              (currentPage > 1) ? incermentInd = ((currentPage - 1) * perPage) + 1 : 0;
                              return <Tr key={value._id}>
                                <Td scope="row"> <span className="co-name"> {incermentInd + (ind)} </span> </Td>
                                <Td> {dateformat(value.createdAt)} </Td>
                                <Td>96580a5w8e6s2w3s250</Td>
                                <Td>91100a5w8e6s2w3s100</Td>
                                <Td> <Badge className="bg-info"> Send </Badge> </Td>
                                <Td> <Badge className="bg-primary"> {cryptoCoin} </Badge> </Td>
                                <Td>
                                  <div className="">
                                    <h5 className="font-size-14 mb-0"> {value.transactionAmount}  </h5>
                                    <p className="mb-0"> $ {transAmount.toFixed(5)} </p>
                                  </div>
                                </Td>
                                <Td>
                                  <div className="">
                                    <h5 className="font-size-14 mb-0"> {value.commissionAmount} </h5>
                                    <p className="mb-0"> $ {commAmount.toFixed(5)} </p>
                                  </div>
                                </Td>
                              </Tr>
                            })
                            : <Tr> <Td colSpan="6"> No Result Found </Td> </Tr>
                    }

                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
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
