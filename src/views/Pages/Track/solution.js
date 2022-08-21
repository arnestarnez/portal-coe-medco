import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button, Progress, Label} from 'reactstrap';
import Table2Edit from '../../Commons/Table/Table2Edit';
import Table2EditNoPag from '../../Commons/Table/Table2EditNoPag';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Add from './Modal/add';
import Schedule from './Modal/schedule';
import Approve from './Modal/approve';
import {Line, Pie, Bar} from 'react-chartjs-2';

class Solution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptionArea: [],
            selectedOptionStatus: [],
            rca: false,
            fmea: false,
            sc: false,
            blocking: false,
            modalAdd: false,
            modalSchedule: false,
            modalApprove: false,
            currentPage: 1,
            sizePerPage: 2,
            passData: [],
            orgData: [],
            datas: [
                { id: 1, dt1: 'Initiate', dt2: true, dt3: 'Sample title 1', dt4: '200.000', dt5: 'New', dt6: true, dt7: '2020-07-16', dt8: '2020-07-23', dtx: '7', dt9: '9 Weeks', "benefit" : "860.000" },
                { id: 2, dt1: 'Design', dt2: true, dt3: 'Sample title 2', dt4: '100.000', dt5: 'New', dt6: true, dt7: '2020-07-18', dt8: '2020-07-28', dtx: '10', dt9: '12 Weeks', "benefit" : "390.000" },
                { id: 3, dt1: 'Build', dt2: true, dt3: 'Sample title 3', dt4: '70.000', dt5: 'New', dt6: true, dt7: '2020-08-03', dt8: '2020-08-08', dtx: '5', dt9: '7 Weeks', "benefit" : "250.000" },
                { id: 4, dt1: 'Test', dt2: false, dt3: 'Sample title 4', dt4: '40.000', dt5: 'Pending', dt6: false, dt7: '2020-07-29', dt8: '2020-08-15', dtx: '18', dt9: '17 Weeks', "benefit" : "120.000" },
                { id: 5, dt1: 'Deploy', dt2: false, dt3: 'Sample title 5', dt4: '400.000', dt5: 'Waiting Approval', dt6: true, dt7: '2020-08-15', dt8: '2020-08-25', dtx: '10', dt9: '9 Weeks', "benefit" : "1.360.000" },
            ],
            datas2:[],
            data3: [],
            random: 0,
            textTitle: 'Technology Titles',
            xday: 0,
            xhour: 0,
            xminute: 0,
            xsecond: 0
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleApproval = this.handleApproval.bind(this);
    }

    componentDidMount() {
        this.setState({orgData: this.state.datas});
    }

    toggleAdd = () => {
        this.setState({ modalAdd: !this.state.modalAdd })
    };

    addSubmitBtn = (data) => {
        var status = '';
        var label = '';
        var newDatas = [];
        if(data.area) {label = data.area.label}
        (data.rca === true && data.fmea === true && data.sc === true) ? status = 'Pending' : status = 'Ongoing';
        newDatas = [{
            id: this.state.datas.length + 1,
            dt1: label,
            dt2: data.rca,
            dt3: data.issue,
            dt4: data.fmea,
            dt5: status,
            dt6: data.sc
        }];
        newDatas = this.state.datas.concat(newDatas);
        this.setState({datas : newDatas},
            () => {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Issue has been submited.',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.toggleAdd();
            }    
        )
    }

    toggleSchedule = () => {
        this.setState({ modalSchedule: !this.state.modalSchedule })
    };

    scheduleSubmitBtn = (data) => {
        this.setState({
            datas: this.state.orgData,
            selectedOptionArea: data.area,
            selectedOptionStatus: data.status,
        });
        var newDatas = this.state.orgData;
        if(data.area && data.area.length > 0 && data.status && data.status.length > 0){
            newDatas = [];
            data.area.forEach(row => {
                newDatas = newDatas.concat(this.state.orgData.filter(item => item.dt1 === row.label));
            });
            var tempDatas = [];
            data.status.forEach(row => {
                newDatas = tempDatas.concat(newDatas.filter(item => item.dt5 === row.label));
            });
        }else if(data.area && data.area.length > 0){
            newDatas = [];
            data.area.forEach(row => {
                newDatas = newDatas.concat(this.state.orgData.filter(item => item.dt1 === row.label));
            });
        }else if(data.status && data.status.length > 0){
            newDatas = [];
            data.status.forEach(row => {
                newDatas = newDatas.concat(this.state.orgData.filter(item => item.dt5 === row.label));
            });
        }
        
        this.setState({datas: newDatas},
            () => {
                this.toggleSchedule();
            }    
        )
    }

    toggleApprove = () => {
        this.setState({ modalApprove: !this.state.modalApprove })
    };

    handleApproval = (e, action, id) => {
        e.preventDefault();
        if(action === 'reject'){
            Swal.fire({
                title: 'Reject Issue',
                text: "Are you sure to reject this issue?",
                icon: 'warning',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                confirmButtonColor: '#3085d6',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {       
                    this.setState({
                        datas: this.state.datas.map(el => (el.id === id ? Object.assign(el, { dt5: 'Reject' }) : el))
                    },
                    () => {
                        Swal.fire({
                            title: 'Success!',
                            icon: 'success',
                            text: 'Issue has been rejected.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.toggleApprove();
                    });
                }
            });
        }else{
            Swal.fire({
                title: 'Approve Issue',
                text: "Are you sure to approve this issue?",
                icon: 'question',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                confirmButtonColor: '#3085d6',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {    
                    this.setState({
                        datas: this.state.datas.map(el => (el.id === id ? Object.assign(el, { dt5: 'Approve' }) : el))
                    },
                    () => {   
                        Swal.fire({
                            title: 'Success!',
                            icon: 'success',
                            text: 'Issue has been approved.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.toggleApprove();
                    });
                }
            });
        }
    }

    handlePageChange(page, sizePerPage) {
        this.setState({currentPage: page, sizePerPage: sizePerPage})
    }

    handleAction = (e, row, action) => {
        e.preventDefault()
        switch (action) {
            case 'schedule':
                const min = 1;
                const max = 100;
                const rand = min + Math.random() * (max - min);
                const data3 = {
                  labels: ['21', '22', '23', '24', '25', '26','27','28','29'],
                  datasets: [
                    {
                      label: 'Target Achievement',
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
                      pointRadius: 5,
                      pointHitRadius: 25,
                      data: [100, 100, 95, 100, 80, 70, 100]
                    },
                  ]
                }
                this.setState({ xday: 37, xhour: 12, xminute: 51, xsecond: 17, random: rand.toFixed(0), textTitle: row.dt3, datas2: this.state.datas, data3: data3 });
                
                // let fixDate = (new Date()).setHours(15,0,0); 
                // fixDate.setDate(date.getDate() + 89);
                // let currDate = new Date();
                // let diff = fixDate - currDate
                // let xd = 0
                // let xh = Math.floor(diff/(60*60*1000));
                // let xm = Math.floor((diff-(hours*60*60*1000))/(60*1000))
                // let xs = Math.floor((diff-(hours*60*60*1000)-(mins*60*1000))/1000)
                // this.setState({xhour: xh, xminute: xm, xsecond: xs})
                clearInterval(this.myInterval)
                this.myInterval = setInterval(() => {
                  const { xsecond, xminute } = this.state
      
                  if (xsecond > 0) {
                      this.setState(({ xsecond }) => ({
                          xsecond: xsecond - 1
                      }))
                  }
                  if (xsecond === 0) {
                      if (xminute === 0) {
                          clearInterval(this.myInterval)
                      } else {
                          this.setState(({ xminute }) => ({
                              xminute: xminute - 1,
                              xsecond: 59
                          }))
                      }
                  } 
                }, 1000)

                break;
            default:
                break;
        }
    }

    componentWillUnmount() {
      clearInterval(this.myInterval)
    }


    render() {
        const columns = [
            {
                dataField: '#',
                text: '#',
                headerAlign: 'center',
                align: 'center',
                formatter: (cell, row, rowIndex) => {
                    let rowNumber = (this.state.currentPage - 1) * this.state.sizePerPage + (rowIndex + 1);
                    return <span>{rowNumber}</span>;
                },
                headerStyle: (colum, colIndex) => {
                    return { width: '40px' };
                },
            },
            {
                dataField: 'dt3',
                text: 'Title',
                headerAlign: 'center',
                align: 'left',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '150px' };
                },
            },
            {
                dataField: 'dt4',
                text: 'Budget',
                headerAlign: 'center',
                align: 'right',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '70px' };
                }
            },
            {
                dataField: 'benefit',
                text: 'Benefit',
                headerAlign: 'center',
                align: 'right',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '70px' };
                }
            },
            {
                dataField: 'dt9',
                text: 'Timeline',
                headerAlign: 'center',
                align: 'right',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '70px' };
                }
            },
            {
                dataField: 'dt2',
                text: 'Action',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                isDummyField: true,
                headerStyle: (colum, colIndex) => {
                    return { width: '50px' };
                },
                formatter: (cellContent, row) => {
                    return (
                        <div>
                            <span className="btnInTable">
                                <Button className="btn-facebook btn-brand btn-sm icon" onClick={(e) => this.handleAction(e, row, 'schedule')}><i className="icon-play3"> </i></Button>
                            </span>
                        </div>
                    );
                },
            },
        ];

        const columns2 = [
          {
              dataField: '#',
              text: '#',
              headerAlign: 'center',
              align: 'center',
              formatter: (cell, row, rowIndex) => {
                  let rowNumber = (this.state.currentPage - 1) * this.state.sizePerPage + (rowIndex + 1);
                  return <span>{rowNumber}</span>;
              },
              headerStyle: (colum, colIndex) => {
                  return { width: '40px' };
              },
          },
          {
              dataField: 'dt1',
              text: 'Task',
              headerAlign: 'center',
              align: 'left',
              editable: false,
              headerStyle: (colum, colIndex) => {
                  return { width: '200px' };
              },
          },
          {
              dataField: 'dt7',
              text: 'Start',
              headerAlign: 'center',
              align: 'center',
              editable: false,
              headerStyle: (colum, colIndex) => {
                  return { width: '110px' };
              },
              formatter: (cell, row, rowIndex) => {
                  // return <div onClick={(e) => this.handleAction(e, row, 'schedule')}><img src={calendar} alt='' style={{width:'22px', height: '22px', borderRadius: '4px', cursor: 'pointer'}}/></div>;
                  if(row.dt7){
                      return <span>{row.dt7}</span>
                  }else{
                      return <span>-</span>
                  }                    
              },
          },
          {
              dataField: 'dt8',
              text: 'Finish',
              headerAlign: 'center',
              align: 'center',
              editable: false,
              headerStyle: (colum, colIndex) => {
                  return { width: '110px' };
              },
              formatter: (cell, row, rowIndex) => {
                  // return <div onClick={(e) => this.handleAction(e, row, 'schedule')}><img src={calendar} alt='' style={{width:'22px', height: '22px', borderRadius: '4px', cursor: 'pointer'}}/></div>;
                  if(row.dt7){
                      return <span>{row.dt8}</span>
                  }else{
                      return <span>-</span>
                  }                    
              },
          },
          {
              dataField: 'dtx',
              text: 'Duration',
              headerAlign: 'center',
              align: 'center',
              editable: false,
              headerStyle: (colum, colIndex) => {
                  return { width: '90px' };
              }
          }
        ];

        var options = {
          scales: {
            axisY:{
              interval: 20
            },
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 25
              },
              scaleLabel: {
                display: false,
                labelString: '%'
              }    
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Week'
              }
            }],
          },
          legend: {
            display: false
          },
        };

        const { xhour, xminute, xsecond } = this.state
        return (
            <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.state.blocking}>
                    <Row>
                        <Col xs="12" md="12">
                            <Card style={{marginBottom:'0'}}>
                                <CardBody>
                                    <Row>
                                        <Col md="6">
                                            <div className="titleFilter"><i className="icon-stack"></i> Tracking & Monitoring Selected Technology</div>
                                            <div className="freeze1">
                                                <Table2Edit
                                                    caption=''
                                                    tableHead={columns}
                                                    datas={this.state.datas}
                                                    handlePageChange={this.handlePageChange}
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6" style={{backgroundColor:'#fff', padding: '15px'}}>
                                            <div className="titleFilter"><i className="icon-display"></i> {this.state.textTitle}</div>
                                            <hr/>
                                            <div style={{display:'flex'}}>
                                                <Label style={{lineHeight:'25px'}}>Progress</Label>
                                                <div style={{width: 'calc(100% - 46px)', marginLeft:'10px'}}>
                                                  <Progress multi>
                                                    <Progress bar value={this.state.random} color="success">{this.state.random}%</Progress>
                                                    <Progress bar value={100-this.state.random} color="info"></Progress>
                                                  </Progress>
                                                </div>
                                            </div>
                                            <Row style={{marginTop:'10px'}}>
                                                <Col>
                                                  <Label style={{lineHeight:'25px'}}>Schedulle</Label>
                                                  <div className="freeze1">
                                                      <Table2EditNoPag
                                                          caption=''
                                                          tableHead={columns2}
                                                          datas={this.state.datas2}
                                                          handlePageChange={this.handlePageChange}
                                                      />
                                                  </div>
                                                </Col>
                                            </Row>
                                            <Row style={{marginTop:'10px'}}>
                                                <Col md="6">
                                                  <Label style={{lineHeight:'25px'}}>Target Achievement (%)</Label>
                                                  <Line data={this.state.data3} options={options} height={200}/>
                                                </Col>
                                                <Col md="6">
                                                  <Label style={{lineHeight:'25px'}}>Finishing Time Remaining</Label>
                                                  <div style={{width: '100%', textAlign: 'center'}}>
                                                    <Label style={{fontSize: '16px'}}>{this.state.xday} <b>Day</b></Label><br/>
                                                    <Label style={{fontSize: '16px'}}>{xhour < 10 ? `0${xhour}` : xhour} <b>Hour</b> {xminute < 10 ? `0${xminute}` : xminute} <b>Minute</b> {xsecond < 10 ? `0${xsecond}` : xsecond} <b>Second</b></Label>
                                                  </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </BlockUi>
                <Add modalAdd={this.state.modalAdd} toggleAdd={this.toggleAdd} btnSubmit={this.addSubmitBtn}/>
                <Schedule modalSchedule={this.state.modalSchedule} toggleSchedule={this.toggleSchedule} btnSubmit={this.scheduleSubmitBtn}/>
                <Approve modalApprove={this.state.modalApprove} toggleApprove={this.toggleApprove} passData={this.state.passData} clickBtnApproval={this.handleApproval}/>
            </div >
        );
    }
}

export default Solution;