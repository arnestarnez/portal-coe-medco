import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button} from 'reactstrap';
import Table2Edit from '../../Commons/Table/Table2Edit';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Add from './Modal/add';
import Schedule from './Modal/schedule';
import Approve from './Modal/approve';

class Execution extends Component {
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
                { id: 1, dt1: 'Alternatif 1', dt2: true, dt3: 'Sample title 1', dt4: '200.000 (USD)', dt5: 'New', dt6: true, dt7: '2020-07-14', dt8: '2020-08-14', dt9: '30', "benefit" : "860.000 (USD)" },
                { id: 2, dt1: 'Alternatif 5', dt2: true, dt3: 'Sample title 2', dt4: '100.000 (USD)', dt5: 'New', dt6: true, dt7: '2020-07-10', dt8: '2020-08-24', dt9: '44', "benefit" : "390.000 (USD)" },
                { id: 3, dt1: 'Alternatif 3', dt2: true, dt3: 'Sample title 3', dt4: '70.000 (USD)', dt5: 'New', dt6: true, dt7: '2020-07-17', dt8: '2020-09-17', dt9: '60', "benefit" : "250.000 (USD)" },
                { id: 4, dt1: 'Alternatif 1', dt2: false, dt3: 'Sample title 4', dt4: '40.000 (USD)', dt5: 'Pending', dt6: false, dt7: '2020-07-18', dt8: '2020-08-18', dt9: '30', "benefit" : "120.000 (USD)" },
                { id: 5, dt1: 'Alternatif 6', dt2: false, dt3: 'Sample title 5', dt4: '400.000 (USD)', dt5: 'Waiting Approval', dt6: true, dt7: '2020-06-10', dt8: '2020-09-10', dt9: '90', "benefit" : "1.360.000 (USD)" },
            ],
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
            case 'delete':
                this.setState({blocking: true});
                Swal.fire({
                  title: 'Delete Data',
                  text: "Are you sure to delete this data?",
                  icon: 'warning',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes!',
                  confirmButtonColor: '#3085d6',
                  showCancelButton: true,
                }).then((result) => {
                  if (result.value) {       
                        this.setState(prevState => ({
                            datas: prevState.datas.filter(data => data.id !== row.id)
                        }),
                        () => {
                            Swal.fire({
                                title: 'Success!',
                                icon: 'success',
                                text: 'Delete Success.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            .then(() => {})
                            this.setState({blocking: false});    
                        }
                        );
                  }else{
                    this.setState({blocking: false});
                  }
                });
                break;
            case 'schedule':
                this.toggleSchedule()
                break;
            case 'approve':
                if(row.dt5 !== 'Reject' && row.dt5 !== 'Approve') {
                    var data = {
                        issue: row.dt3,
                        area: row.dt1,
                        id: row.id
                    }
                    this.setState({passData: data})
                    this.toggleApprove()
                }
                break;
            default:
                break;
        }
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
                    return { width: '200px' };
                },
            },
            {
                dataField: 'dt1',
                text: 'Technology',
                headerAlign: 'center',
                align: 'left',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '200px' };
                },
            },
            {
                dataField: 'dt4',
                text: 'Budget',
                headerAlign: 'center',
                align: 'right',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '130px' };
                }
            },
            {
                dataField: 'benefit',
                text: 'Benefit',
                headerAlign: 'center',
                align: 'right',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '130px' };
                }
            },
            {
                dataField: 'dt6',
                text: 'Schedule',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '160px' };
                },
                formatter: (cell, row, rowIndex) => {
                    // return <div onClick={(e) => this.handleAction(e, row, 'schedule')}><img src={calendar} alt='' style={{width:'22px', height: '22px', borderRadius: '4px', cursor: 'pointer'}}/></div>;
                    if(row.dt7){
                        return <span>{row.dt7} / {row.dt8}</span>
                    }else{
                        return <span>-</span>
                    }                    
                },
            },
            {
                dataField: 'dt9',
                text: 'Duration',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '90px' };
                }
            },
            {
                dataField: 'dt5',
                text: 'Status',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                formatter: (cell, row, rowIndex) => {
                    var clr = '#000';
                    var fw = '400';
                    switch (row.dt5) {
                        case 'Reject':
                            clr = 'red';
                            fw = '700';
                            break;
                        case 'Approve':
                            clr = 'green';
                            fw = '700';
                            break;
                        default:
                            break;
                    }
                    return <span style={{color: clr, fontWeight: fw}}>{row.dt5}</span>;
                },
                headerStyle: (colum, colIndex) => {
                    return { width: '120px' };
                },
            },
            {
                dataField: 'dt2',
                text: 'Action',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                isDummyField: true,
                headerStyle: (colum, colIndex) => {
                    return { width: '110px' };
                },
                formatter: (cellContent, row) => {
                    return (
                        <div>
                            <span className="btnInTable">
                                <Button className="btn-facebook btn-brand btn-sm icon" onClick={(e) => this.handleAction(e, row, 'schedule')}><i className="icon-inbox"> </i></Button>
                            </span>
                            <span className="btnInTable">
                                <Button className="btn-twitter btn-brand btn-sm icon" onClick={(e) => this.handleAction(e, row, 'schedule')}><i className="icon-pencil"> </i></Button>
                            </span>
                            <span className="btnInTable">
                                <Button className="btn-vine btn-brand btn-sm icon" onClick={(e) => this.handleAction(e, row, 'schedule')}><i className="icon-file-check"> </i></Button>
                            </span>
                        </div>
                    );
                },
            },
        ];

        return (
            <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.state.blocking}>
                    <Row>
                        <Col xs="12" md="12">
                            <Card style={{marginBottom:'0'}}>
                                <CardBody>
                                    <Row>
                                        <Col md="12">
                                            <div className="titleFilter"><i className="icon-stack"></i> Implement Selected Technology</div>
                                            <div className="freeze1">
                                                <Table2Edit
                                                    caption=''
                                                    tableHead={columns}
                                                    datas={this.state.datas}
                                                    handlePageChange={this.handlePageChange}
                                                />
                                            </div>
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

export default Execution;
