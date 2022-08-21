import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import Swal from 'sweetalert2';
import Checkbox from '@material-ui/core/Checkbox';
import Table2PughNumber from '../../../Commons/Table/Table2PughNumber';
import { POSITION } from '../../../Constants/Position';

class Approve extends Component {
    constructor(props) {
        super();
        this.state = {
            modalPugh: false,
            activeTab: new Array(4).fill('0'),
            iconTab: 'icon-arrow-down12',
            tableHead: [
                { width:"130",dataField:'dt1',title: "Solution Criteria", row: '0', rowSpan: '2', headerAlign: POSITION.CENTER, dataAlign: POSITION.RIGHT, editable: false },
                { dataField:'tp', title: "Solutions & Concepts", row: '0', colSpan: '4', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"90",dataField:'sc1',title: "Technology 1", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"90",dataField:'sc2',title: "Technology 2", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"90",dataField:'sc3',title: "Technology 3", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"90",dataField:'sc4',title: "Technology 4", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"90",dataField:'dt2',title: "Weightings", row: '0',rowSpan: '2', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false }
            ],
            datas: [],
            sp1: 0,
            sp2: 0,
            sp3: 0,
            sp4: 0,
            sn1: 0,
            sn2: 0,
            sn3: 0,
            sn4: 0,
            colorsn1: 'white',
            colorsn2: 'white',
            colorsn3: 'white',
            colorsn4: 'white',
        }
    }

    componentDidUpdate = (previousProps, previousState) => {
        if(this.props.modalApprove === true){
            const getDataPugh = this.props && this.props.passData.dpugh != undefined ? this.props.passData.dpugh : []
            if (previousProps.modalApprove !== this.props.modalApprove) {
                console.log("masuk approval")
                this.setState({
                    datas: getDataPugh,
                    sp1: this.props.passData.sp1,
                    sp2: this.props.passData.sp2,
                    sp3: this.props.passData.sp3,
                    sp4: this.props.passData.sp4,
                    sn1: this.props.passData.sn1,
                    sn2: this.props.passData.sn2,
                    sn3: this.props.passData.sn3,
                    sn4: this.props.passData.sn4,
                    colorsn1: this.props.passData.colorsn1,
                    colorsn2: this.props.passData.colorsn2,
                    colorsn3: this.props.passData.colorsn3,
                    colorsn4: this.props.passData.colorsn4
                })
            }
        }
    }

    toggleTab = (tabPane, tab) => {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
            iconTab: tab === '0' ? 'icon-arrow-down12' : 'icon-cross3'
        });
    }

    toggleApprove = () => {
        this.setState({ modalApprove: !this.state.modalApprove })
    };

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleApproval = (e, action) => {
        var id = this.props.passData.data[0].id;
        this.props.clickBtnApproval(e, action, id);
    }

    handleClick = () => {
        this.props.toggleApprove();
    }

    handleAction = (row, cellName, cellValue) => {
        this.setState({
            datas: this.state.datas.map(el => (el.id === row.id ? Object.assign({}, el, { row }) : el))
        });
        var sp1 = 0, sn1 = 0, sp2 = 0, sn2 = 0, sp3 = 0, sn3 = 0, sp4 = 0, sn4 = 0
        for (let index = 0; index < this.state.datas.length; index++) {            
            sp1 = sp1+parseFloat(this.state.datas[index].sc1 !== '' ? this.state.datas[index].sc1 : 0)
            sp2 = sp2+parseFloat(this.state.datas[index].sc2 !== '' ? this.state.datas[index].sc2 : 0)
            sp3 = sp3+parseFloat(this.state.datas[index].sc3 !== '' ? this.state.datas[index].sc3 : 0)
            sp4 = sp4+parseFloat(this.state.datas[index].sc4 !== '' ? this.state.datas[index].sc4 : 0)

            sn1 = sn1+parseFloat(this.state.datas[index].sc1 !== '' ? this.state.datas[index].sc1*this.state.datas[index].dt2 : 0)
            sn2 = sn2+parseFloat(this.state.datas[index].sc2 !== '' ? this.state.datas[index].sc2*this.state.datas[index].dt2 : 0)
            sn3 = sn3+parseFloat(this.state.datas[index].sc3 !== '' ? this.state.datas[index].sc3*this.state.datas[index].dt2 : 0)
            sn4 = sn4+parseFloat(this.state.datas[index].sc4 !== '' ? this.state.datas[index].sc4*this.state.datas[index].dt2 : 0)
        }
        if(sn4 > sn1 && sn4 > sn2 && sn4 > sn3){
            this.setState({colorsn4: 'yellow'})
        }else{
            this.setState({colorsn4: 'white'})
        } 
        if(sn3 > sn1 && sn3 > sn2 && sn3 > sn4){
            this.setState({colorsn3: 'yellow'})
        }else{
            this.setState({colorsn3: 'white'})
        }
        if(sn2 > sn1 && sn2 > sn3 && sn2 > sn4){
            this.setState({colorsn2: 'yellow'})
        }else{
            this.setState({colorsn2: 'white'})
        }
        if(sn1 > sn2 && sn1 > sn3 && sn1 > sn4){
            this.setState({colorsn1: 'yellow'})
        }else{
            this.setState({colorsn1: 'white'})
        }
        this.setState({sp1: sp1, sp2: sp2, sp3: sp3, sp4: sp4, sn1: sn1, sn2: sn2, sn3: sn3, sn4: sn4})
    }

    render() {
        let dataMain = this.props.passData.data ? this.props.passData.data[0] : []
        let dataReviewer = this.props.passData.reviewer;
        let extradt = this.props.passData.extradata;

        const footerData = [
            [
                {
                columnIndex: 0,
                align: 'right',
                    formatter: (tableData) => {
                        return (
                            <span>Sum of Score</span> 
                        );
                    }
                },
                {
                    columnIndex: 1,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong>{this.state.sp1}</strong>
                            );
                        }
                },
                {
                    columnIndex: 2,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong>{this.state.sp2}</strong>
                            );
                        }
                },
                {
                    columnIndex: 3,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong>{this.state.sp3}</strong>
                            );
                        }
                },
                {
                    columnIndex: 4,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong>{this.state.sp4}</strong>
                            );
                        }
                },
            ],
            [
                {
                columnIndex: 0,
                align: 'right',
                    formatter: (tableData) => {
                        return (
                            <span>Sum Weighted of Score</span> 
                        );
                    }
                },
                {
                    columnIndex: 1,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <div style={{backgroundColor:this.state.colorsn1}}>
                                    <strong>{this.state.sn1}</strong>
                                </div>
                            );
                        }
                },
                {
                    columnIndex: 2,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <div style={{backgroundColor:this.state.colorsn2}}>
                                    <strong>{this.state.sn2}</strong>
                                </div>
                            );
                        }
                },
                {
                    columnIndex: 3,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <div style={{backgroundColor:this.state.colorsn3}}>
                                    <strong>{this.state.sn3}</strong>
                                </div>
                            );
                        }
                },
                {
                    columnIndex: 4,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <div style={{backgroundColor:this.state.colorsn4}}>
                                    <strong>{this.state.sn4}</strong>
                                </div>
                            );
                        }
                },
            ],
		];
        return (
            <Modal isOpen={this.props.modalApprove} toggle={this.handleClick} className="modal-lg full-screen">
                <ModalHeader toggle={this.handleClick}>Form Approval</ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                            active={this.state.activeTab[0] === '1'}
                            onClick={() => { this.toggleTab(0, '1'); }}
                            >
                                Technology Description
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            active={this.state.activeTab[0] === '2'}
                            onClick={() => { this.toggleTab(0, '2'); }}
                            >
                                Assign Reviewer Form
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            active={this.state.activeTab[0] === '3'}
                            onClick={() => { this.toggleTab(0, '3'); }}
                            >
                                Tech Assessment
                            </NavLink>
                        </NavItem>
                        <div style={{marginTop: '10px', marginLeft: '10px', cursor: 'pointer'}} onClick={() => { this.toggleTab(0, '0'); }}><i className={this.state.iconTab}></i></div>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab[0]}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Title</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="10">
                                    <Label className="labelFormNB">{dataMain.dt3}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Business Case</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="10">
                                    <Label className="labelFormNB">{dataMain.bcase}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Tech. Grouping</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="10">
                                    <Label className="labelFormNB">{dataMain.tgrup}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Facility</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.area}</Label>
                                </Col>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Discipline</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.discipline}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Submitter</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.submitter}</Label>
                                </Col>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Date</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.date}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Owner</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.owner}</Label>
                                </Col>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Tech. Principal</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.tp}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Est. Cost</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.escost} (USD)</Label>
                                </Col>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Est. Timeline</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.estime}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Brief Solution</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="10">
                                    <Label className="labelFormNB">{dataMain.briefsol}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Additional Data</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="10">
                                    <Label className="labelFormNB">{dataMain.addData}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Benefit</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="10">
                                    <Label className="labelFormNB">{dataMain.benefit} (USD)</Label>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Impact Rating</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8" md="3">
                                    <Label className="labelFormNB">{dataMain.impact}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Value Adding</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.valueAdd}</Label>
                                </Col>
                                <Col sm="6" md="2">
                                    <Label className="labelForm">Priority</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col sm="6" md="4">
                                    <Label className="labelFormNB">{dataMain.priority}</Label>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Team Purpose</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="10">
                                    <Label className="labelFormNB">Technology Assessment</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Start Date</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="4">
                                    <Label className="labelFormNB">{extradt && extradt[0] ? extradt[0].sdate : '-'}</Label>
                                </Col>
                                <Col xs="2">
                                    <Label className="labelForm">End Date</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="4">
                                    <Label className="labelFormNB">{extradt && extradt[0] ? extradt[0].edate : '-'}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Venue</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="10">
                                    <Label className="labelFormNB">{extradt && extradt[0] ? extradt[0].venue : '-'}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Data/Fact</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="10">
                                    <Label className="labelFormNB">*Attached Attributed Technology</Label>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Team Lead</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="10">
                                    <Label className="labelFormNB">{extradt && extradt[0] ? extradt[0].tlname : '-'}, {extradt && extradt[0] ? extradt[0].tljob : '-'}, {extradt && extradt[0] ? extradt[0].tldept : '-'}</Label>
                                </Col>
                            </Row>
                            {
                                (dataReviewer) ?
                                (dataReviewer.map((item, index) => {
                                    return (
                                        <Row key={index}>
                                            <Col xs="2">
                                                <Label className="labelForm">Reviewer {index+1}</Label>
                                                <span className="spanForm">:</span>
                                            </Col>
                                            <Col xs="10">
                                                <Label className="labelFormNB">{item.name}, {item.job}, {item.dept}</Label>
                                            </Col>
                                        </Row>
                                    )
                                }))
                                :
                                null
                            }
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Operating Parameter</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.opc : '-'}</Label>
                                </Col>
                                <Col xs="1">
                                    <Label className="labelFormRight">Evidence :</Label>
                                </Col>
                                <Col xs="1">
                                    <Checkbox color="primary" checked={dataMain.sct ? dataMain.sct.ev1 : false} name="ev1" value={dataMain.sct ? dataMain.sct.ev1 : false} disabled/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Operating Context</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.oab : '-'}</Label>
                                </Col>
                                <Col xs="1">
                                    <Label className="labelFormRight">Evidence :</Label>
                                </Col>
                                <Col xs="1">
                                    <Checkbox color="primary" checked={dataMain.sct ? dataMain.sct.ev2 : false} name="ev2" value={dataMain.sct ? dataMain.sct.ev2 : false} disabled/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Past Application Result</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.par : '-'}</Label>
                                </Col>
                                <Col xs="1">
                                    <Label className="labelFormRight">Evidence :</Label>
                                </Col>
                                <Col xs="1">
                                    <Checkbox color="primary" checked={dataMain.sct ? dataMain.sct.ev3 : false} name="ev3" value={dataMain.sct ? dataMain.sct.ev3 : false} disabled/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Risk Mapping</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.fmea : '-'}</Label>
                                </Col>
                                <Col xs="1">
                                    <Label className="labelFormRight">Evidence :</Label>
                                </Col>
                                <Col xs="1">
                                    <Checkbox color="primary" checked={dataMain.sct ? dataMain.sct.ev4 : false} name="ev4" value={dataMain.sct ? dataMain.sct.ev4 : false} disabled/>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">HSE</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.safety : '-'}</Label>
                                </Col>
                                <Col xs="1">
                                    <Label className="labelFormRight">Evidence :</Label>
                                </Col>
                                <Col xs="1">
                                    <Checkbox color="primary" checked={dataMain.sct ? dataMain.sct.ev6 : false} name="ev6" value={dataMain.sct ? dataMain.sct.ev6 : false} disabled/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Budget</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.budget : '-'}</Label>
                                </Col>
                                <Col xs="1">
                                    <Label className="labelFormRight">Evidence :</Label>
                                </Col>
                                <Col xs="1">
                                    <Checkbox color="primary" checked={dataMain.sct ? dataMain.sct.ev7 : false} name="ev7" value={dataMain.sct ? dataMain.sct.ev7 : false} disabled/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Legal</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.legal : '-'}</Label>
                                </Col>
                                <Col xs="1">
                                    <Label className="labelFormRight">Evidence :</Label>
                                </Col>
                                <Col xs="1">
                                    <Checkbox color="primary" checked={dataMain.sct ? dataMain.sct.ev8 : false} name="ev8" value={dataMain.sct ? dataMain.sct.ev8 : false} disabled/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">IS/IT</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.is : '-'}</Label>
                                </Col>
                                <Col xs="1">
                                    <Label className="labelFormRight">Evidence :</Label>
                                </Col>
                                <Col xs="1">
                                    <Checkbox color="primary" checked={dataMain.sct ? dataMain.sct.ev10 : false} name="ev10" value={dataMain.sct ? dataMain.sct.ev10 : false} disabled/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Management</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="8">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.mgt : '-'}</Label>
                                </Col>
                                <Col xs="1">
                                    <Label className="labelFormRight">Evidence :</Label>
                                </Col>
                                <Col xs="1">
                                    <Checkbox color="primary" checked={dataMain.sct ? dataMain.sct.ev9 : false} name="ev9" value={dataMain.sct ? dataMain.sct.ev9 : false} disabled/>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs="2">
                                    <Label className="labelForm">Maturity Rating</Label>
                                    <span className="spanForm">:</span>
                                </Col>
                                <Col xs="10">
                                    <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.matrat : ''} - {dataMain.sct ? dataMain.sct.mrd : ''}</Label>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                    <Row style={{marginTop:'20px'}}>
                        <Col xs="12" lg="12" style={{marginBottom:'10px'}}><b>Pugh Matrix</b></Col>
                        <Col xs="12" lg="12">
                            <Table2PughNumber
                                tableHead={ this.state.tableHead }
                                datas={ this.state.datas }
                                footerData={footerData}
                                action={ this.handleAction }
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleApproval(e, 'approve')}><i className="icon-checkmark4"> </i><span>Approve</span></Button>
                    <Button className="btn-google-plus btn-brand btn-sm" onClick={(e) => this.handleApproval(e, 'reject')}><i className="icon-cross2"> </i><span>Reject</span></Button>
                    <Button className="btn-dropbox btn-brand btn-sm" onClick={this.handleClick}><i className="icon-undo2"> </i><span>Cancel</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Approve;
