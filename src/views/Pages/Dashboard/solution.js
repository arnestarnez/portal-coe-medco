import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Button, Modal, ModalHeader, ModalBody, UncontrolledTooltip,
    Form, FormGroup, Label, Input} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import {Line, Pie, Bar} from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import '../../../scss/tab.css';
import 'react-splitter-layout/lib/index.css';
import '../../../scss/tab2.css';



class Technology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocking: false,
        };
    }

    render() {

      const data3 = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun','Jul','Agt','Sep','Okt','Nov','Des'],
          datasets: [
            {
              label: 'Total Register Technology',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(146,146,248,.6)',
              borderColor: 'rgb(153,204,153)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgb(153,204,153)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgb(153,204,153)',
              pointHoverBorderColor: 'rgba(146,146,248,.6)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [35, 40, 33, 31, 45, 25, 40,20,30,20,10,40]
            },
          ]
        };
    
        const data = {
          labels: ['18', '19', '20', '21', '22', '23'],
          datasets: [
            {
              label: 'Total Outsource',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(74,255,160,.6)',
              borderColor: 'rgb(153,204,153)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgb(153,204,153)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgb(153,204,153)',
              pointHoverBorderColor: 'rgba(74,255,160,.6)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0, 0, 2, 3, 0, 5, 0]
            }
          ]
        };
    
        const data2 = {
          labels: ['18', '19', '20', '21', '22', '23'],
          datasets: [
            {
              label: 'On Time',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(74,255,160,.6)',
              borderColor: 'rgb(153,204,153)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgb(153,204,153)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgb(153,204,153)',
              pointHoverBorderColor: 'rgba(74,255,160,.6)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [30, 32, 33, 6, 42, 15, 37]
            },
            {
              label: 'Late',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(255,72,72,.6)',
              borderColor: 'rgba(255,35,35,.8)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(255,35,35,.8)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(255,35,35,.8)',
              pointHoverBorderColor: 'rgba(255,72,72,.6)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [5, 8, 0, 25, 3, 10, 3]
            }
          ]
        };
    
        var options = {
          scales: {
            yAxes: [{
              interval: 20,
              ticks: {
                beginAtZero: true,
                min: 0,
              },
              scaleLabel: {
                display: true,
                labelString: 'Quantity'
              }    
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }],
          },
          legend: {
            position: 'top',
            labels: {
              boxWidth: 10,
              fontSize: 10,
            }
          },
        };
    
        const pie = {
          labels: ['Optimization', 'Fit For Purpose (FFP)', 'Value Creation (VA)', 'New Tech (NTG)'],
          datasets: [{
            data: [7,4, 2, 11],
            backgroundColor: ['#cff09e', '#a8dba8', '#79bd9a', '#3b8686']
          }],
        }
    
        const pie2 = {
          labels: ['Bagus', 'Adi', 'Dani'],
          datasets: [{
            data: [4,2,18],
            backgroundColor: ['#806f66', '#fff2bc', '#ff5a0b']
          }],
        }
    
        const optionspie = {
          maintainAspectRatio: false,
          responsive: false,
          legend: {
            position: 'top',
            labels: {
              boxWidth: 10,
              fontSize: 10,
            }
          },
          plugins: {
            labels: {
              render: 'value',
              fontSize: 12,
              fontColor: '#000',
            }
          }
        }

        const bar = {
          labels: ['Electrical', 'Mechanical', 'Instrument', 'Rotating', 'Statis', 'Flow Assurance', 'Process Eng', 'Drilling','Well'],
          datasets: [
            {
              label: 'Total Facility Technology',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [2, 1, 5, 3, 8, 5, 2,4,3],
            },
          ],
        };

        const bar2 = {
          labels: ['Belida', 'Kerisi', 'Belanak', 'Bawal', 'South Belut'],
          datasets: [
            {
              label: 'Top 5 Facility',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [8, 6, 4, 4, 2],
            },
          ],
        };
    
        const optionsbar = {
          legend: { 
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                max: Math.max(...data.datasets[0].data) + 5,
                beginAtZero: true,
                min: 0
              }    
            }]
          },
          maintainAspectRatio: false,
        }

        return (
            <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.state.blocking}>
                    <Row>
                        <Col xs="12" md="12">
                            <Card style={{marginBottom:'0'}}>
                                <CardBody>
                                    <Row>
                                        <Col lg="3">
                                            <Card className="mb10px" style={{minHeight: "100px"}}>
                                              <Row>
                                                <Col xs="12" sm="12" md="12" style={{marginBottom: '20px', textAlign: 'center'}}>
                                                  {/* <div id="btn1"
                                                    style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', cursor: 'pointer', height: '20px', fontFamily:'fangsong',textAlign:'center'}}><b>Sample</b>
                                                  </div> */}
                                                  <CardBody style={{backgroundColor: '#3b8686', minHeight: '115px', color: 'white'}} className="card-body-nopadtop">
                                                      <div style={{width: '100%', height: '115px', textAlign: 'center'}}>
                                                      <div style={{fontSize:'42px', fontWeight: 'bold', lineHeight: '60px', paddingTop: '20px'}}>11</div>
                                                      <div style={{fontWeight: 'bold'}}>Pending Prework</div>
                                                      </div>
                                                  </CardBody>
                                                </Col>
                                              </Row>
                                            </Card>
                                        </Col>
                                        <Col lg="3">
                                            <Card className="mb10px" style={{minHeight: "100px"}}>
                                              <Row>
                                                <Col xs="12" sm="12" md="12" style={{marginBottom: '20px', textAlign: 'center'}}>
                                                  {/* <div id="btn1"
                                                    style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', cursor: 'pointer', height: '20px', fontFamily:'fangsong',textAlign:'center'}}><b>Sample</b>
                                                  </div> */}
                                                  <CardBody style={{backgroundColor: '#3b8686', minHeight: '115px', color: 'white'}} className="card-body-nopadtop">
                                                      <div style={{width: '100%', height: '115px', textAlign: 'center'}}>
                                                      <div style={{fontSize:'42px', fontWeight: 'bold', lineHeight: '60px', paddingTop: '20px'}}>2</div>
                                                      <div style={{fontWeight: 'bold'}}>Pending Registration</div>
                                                      </div>
                                                  </CardBody>
                                                </Col>
                                              </Row>
                                            </Card>
                                        </Col>
                                        <Col lg="3">
                                            <Card className="mb10px" style={{minHeight: "100px"}}>
                                              <Row>
                                                <Col xs="12" sm="12" md="12" style={{marginBottom: '20px', textAlign: 'center'}}>
                                                  {/* <div id="btn1"
                                                    style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', cursor: 'pointer', height: '20px', fontFamily:'fangsong',textAlign:'center'}}><b>Sample</b>
                                                  </div> */}
                                                  <CardBody style={{backgroundColor: '#3b8686', minHeight: '115px', color: 'white'}} className="card-body-nopadtop">
                                                      <div style={{width: '100%', height: '115px', textAlign: 'center'}}>
                                                      <div style={{fontSize:'42px', fontWeight: 'bold', lineHeight: '60px', paddingTop: '20px'}}>7</div>
                                                      <div style={{fontWeight: 'bold'}}>Pending Qualification</div>
                                                      </div>
                                                  </CardBody>
                                                </Col>
                                              </Row>
                                            </Card>
                                        </Col>
                                        <Col lg="3">
                                            <Card className="mb10px" style={{minHeight: "100px"}}>
                                              <Row>
                                                <Col xs="12" sm="12" md="12" style={{marginBottom: '20px', textAlign: 'center'}}>
                                                  {/* <div id="btn1"
                                                    style={{backgroundColor: '#fcfcfc', float: 'left', border: '1px solid #C8CED3', width:'50px', cursor: 'pointer', height: '20px', fontFamily:'fangsong',textAlign:'center'}}><b>Sample</b>
                                                  </div> */}
                                                  <CardBody style={{backgroundColor: '#3b8686', minHeight: '115px', color: 'white'}} className="card-body-nopadtop">
                                                      <div style={{width: '100%', height: '115px', textAlign: 'center'}}>
                                                      <div style={{fontSize:'42px', fontWeight: 'bold', lineHeight: '60px', paddingTop: '20px'}}>4</div>
                                                      <div style={{fontWeight: 'bold'}}>Pending Execution</div>
                                                      </div>
                                                  </CardBody>
                                                </Col>
                                              </Row>
                                            </Card>
                                        </Col>
                                        <Col lg="4">
                                            <Card className="mb10px" style={{minHeight: "218px"}}>
                                            <CardHeader className="cardBgWhite">
                                                <i className="icon-user"></i>Owner Technology
                                                <div className="card-header-actions">
                                                    <a className="card-header-action btn btn-close"><i className="icon-enlarge"></i></a>
                                                </div>
                                            </CardHeader>
                                            <CardBody style={{backgroundColor: '#fff', display: 'flex', justifyContent: 'center'}}>
                                                <Pie data={pie2} height={190} width={250} options={optionspie}/>
                                            </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="4">
                                            <Card className="mb10px" style={{minHeight: "218px"}}>
                                            <CardHeader className="cardBgWhite">
                                                <i className="icon-lan2"></i>Facility
                                                <div className="card-header-actions">
                                                    <a className="card-header-action btn btn-close"><i className="icon-enlarge"></i></a>
                                                </div>
                                            </CardHeader>
                                            <CardBody style={{backgroundColor: '#fff', display: 'flex', justifyContent: 'center'}}>
                                                <Bar data={bar2} height={190} width={250} options={optionsbar}/>
                                            </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="4">
                                          <Card className="mb10px" style={{minHeight: "218px"}}>
                                            <CardHeader className="cardBgWhite">
                                              <i className="icon-alarm"></i>Prioritization Technology
                                              <div className="card-header-actions">
                                                  <a className="card-header-action btn btn-close"><i className="icon-enlarge"></i></a>
                                              </div>
                                            </CardHeader>
                                            <CardBody style={{backgroundColor: '#fff', display: 'flex', justifyContent: 'center'}}>
                                              <Pie data={pie} height={190} width={250} options={optionspie}/>
                                            </CardBody>
                                          </Card>
                                        </Col>
                                        
                                        <Col lg="6">
                                            <Card className="mb10px" style={{minHeight: "218px"}}>
                                            <CardHeader className="cardBgWhite">
                                                <i className="icon-statistics"></i>Discipline
                                                <div className="card-header-actions">
                                                    <a className="card-header-action btn btn-close"><i className="icon-enlarge"></i></a>
                                                </div>
                                            </CardHeader>
                                            <CardBody style={{backgroundColor: '#fff', display: 'flex', justifyContent: 'center'}}>
                                                <Bar data={bar} height={190} width={250} options={optionsbar}/>
                                            </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="6">
                                          <Card className="mb10px" style={{minHeight: "218px"}}>
                                            <CardHeader className="cardBgWhite">
                                              <i className="icon-design"></i>Benefit
                                              <div className="card-header-actions">
                                                  <a className="card-header-action btn btn-close"><i className="icon-enlarge"></i></a>
                                              </div>
                                            </CardHeader>
                                            <CardBody style={{backgroundColor: '#fff', minHeight: '230px'}} className="card-body-nopadtop">
                                              <div style={{width: '100%', height: '115px', textAlign: 'center'}}>
                                                <div style={{fontSize:'42px', fontWeight: 'bold', lineHeight: '40px', paddingTop: '25px'}}>2.420.000 (USD)</div>
                                                <div style={{fontWeight: 'bold', padding: '15px'}}>Total Benefit</div>
                                              </div>
                                              <div style={{width: '100%'}}>
                                                <Row>
                                                  <Col lg="3" style={{textAlign: 'center', border: '1px solid #c8ced3', height: '115px'}}>
                                                    <div style={{fontSize:'42px', color: 'blue', fontWeight: 'bold', lineHeight: '50px', paddingTop: '20px'}}>5</div>
                                                    <div style={{fontWeight: 'bold', color: 'blue', padding: '10px', fontSize:'9px'}}>Very High Impact</div>
                                                  </Col>
                                                  <Col lg="3" style={{textAlign: 'center', border: '1px solid #c8ced3', height: '115px'}}>
                                                    <div style={{fontSize:'42px', color: 'green', fontWeight: 'bold', lineHeight: '50px', paddingTop: '20px'}}>2</div>
                                                    <div style={{fontWeight: 'bold', color: 'green', padding: '10px', fontSize:'9px'}}>Moderate High Impact</div>
                                                  </Col>
                                                  <Col lg="3" style={{textAlign: 'center', border: '1px solid #c8ced3', height: '115px'}}>
                                                    <div style={{fontSize:'42px', color: 'orange', fontWeight: 'bold', lineHeight: '50px', paddingTop: '20px'}}>11</div>
                                                    <div style={{fontWeight: 'bold', color: 'orange', padding: '10px', fontSize:'9px'}}>Moderate Impact</div>
                                                  </Col>
                                                  <Col lg="3" style={{textAlign: 'center', border: '1px solid #c8ced3', height: '115px'}}>
                                                    <div style={{fontSize:'42px', color: 'red', fontWeight: 'bold', lineHeight: '50px', paddingTop: '20px'}}>4</div>
                                                    <div style={{fontWeight: 'bold', color: 'red', padding: '10px', fontSize:'9px'}}>Low Impact</div>
                                                  </Col>
                                                </Row>
                                              </div>
                                            </CardBody>
                                          </Card>
                                        </Col>
                                        <Col lg="12">
                                          <Card className="mb10px" style={{minHeight: "218px"}}>
                                            <CardHeader className="cardBgWhite">
                                              <i className="icon-clipboard5"></i>Approved Technologys Status
                                              <div className="card-header-actions">
                                                  <a className="card-header-action btn btn-close"><i className="icon-enlarge"></i></a>
                                              </div>
                                            </CardHeader>
                                            <CardBody style={{backgroundColor: '#fff'}}>
                                              <Line data={data3} options={options} />
                                            </CardBody>
                                          </Card>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </BlockUi>
            </div >
        );
    }
}

export default Technology;
