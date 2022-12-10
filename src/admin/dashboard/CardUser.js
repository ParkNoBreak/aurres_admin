import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { Link } from "react-router-dom"

import axios from 'axios';
import moment from 'moment'
import { alerShow, dateformat, removeHeaderToken, apiHeader } from '../commonFunction'

const CardUser = ({ StatsTransaction, dataColors }) => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const sendArr = [];
  const swapArr = [];
  var sendGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var swapGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    getGraphDetails();
  }, [])

  const getGraphDetails = async () => {
    
    await axios.get(`${BASE_URL}admin/dashboard/graph`)
      .then(function (response) {
        
        var blank = [];
        for( var value of response.data.data.sendArray){
            
            if(!Array.isArray(blank[moment(value.createdAt).format('MMM')])){
              blank[moment(value.createdAt).format('MMM')] = [];
            }
            blank[moment(value.createdAt).format('MMM')].push(value.commissionAmount)
        }
        for(var month in blank){
          var result = calculateMonthCount(blank[month]);
          if(month == 'Jan'){ sendGraph[0] = result; }
          if(month == 'Feb'){ sendGraph[1] = result; }
          if(month == 'Mar'){ sendGraph[2] = result; }
          if(month == 'Apr'){ sendGraph[3] = result; }
          if(month == 'May'){ sendGraph[4] = result; }
          if(month == 'Jun'){ sendGraph[5] = result; }
          if(month == 'Jul'){ sendGraph[6] = result; }
          if(month == 'Aug'){ sendGraph[7] = result; }
          if(month == 'Sep'){ sendGraph[8] = result; }
          if(month == 'Oct'){ sendGraph[9] = result; }
          if(month == 'Nov'){ sendGraph[10] = result; }
          if(month == 'Dec'){ sendGraph[11] = result; }
        }

        console.log(blank, 'blank >>>>>>>>>')
        
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const calculateMonthCount = (data) => {
      var count = 0;
      for(var value of data){
        count += parseFloat(value);
      }
      return count;
  }

  const apexCardUserChartColors = getChartColorsArray(dataColors);

  const series = [
    {
      name: "Send Commission",
      data:  [18, 25, 35, 45, 50, 55, 58, 68, 70, 78, 88, 96],
    },
    {
      name: "Swap Commission",
      data: [14, 20, 26, 30, 40, 45, 50, 68, 72, 85, 96, 110],
    },
  ]

  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: apexCardUserChartColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },

    markers: {
      size: 3,
      strokeWidth: 3,

      hover: {
        size: 4,
        sizeOffset: 2,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  }

  return (
    <React.Fragment>
        <Card>
          <CardBody>
            <Row>
              <Col lg="2" style={{ paddingLeft: '55px' }}>
                <div className="mt-4">
                  <p>Total Transactions</p>
                  <h4>$ {StatsTransaction.TotalAmount.toFixed(2)}</h4>

                  <Row className="mt-4">
                    <Col xs="12" className="mt-4 mb-3">
                      <div>
                        <p className="mb-2">Send Commission</p>
                        <h5>$ {StatsTransaction.SendCommission.toFixed(2)}</h5>
                      </div>
                    </Col>
                    <Col xs="12" className="mt-4">
                      <div>
                        <p className="mb-2">Swap Commission</p>
                        <h5>$ {StatsTransaction.SwapCommission.toFixed(2)}</h5>
                      </div>
                    </Col>
                  </Row>

                </div>
              </Col>

              <Col lg="10" sm="6">
                <div>
                  <div id="wallet-balance-chart">

                    <ReactApexChart
                      options={options}
                      series={series}
                      type="area"
                      height={300}
                      className="apex-charts"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>

        </Card>
    </React.Fragment>
  );
};

CardUser.propTypes = {
  options: PropTypes.any,
  series: PropTypes.any
};

export default CardUser;
