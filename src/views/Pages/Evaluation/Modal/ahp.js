import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import Swal from 'sweetalert2';
import Checkbox from '@material-ui/core/Checkbox';
import Table2AHP from '../../../Commons/Table/Table2AHP';
import { POSITION } from '../../../Constants/Position';

class Ahp extends Component {
    constructor(props) {
        super();
        this.state = {
            modalAhp: false,
            dataAhp: [],
            activeTab: new Array(4).fill('0'),
            iconTab: 'icon-arrow-down12',
            tableHead: [
                // { width:"100",dataField:'fcn',title: "Function", row: '0', rowSpan: '1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"180",dataField:'dt1',title: "Selection Criteria", row: '0', rowSpan: '1', headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, editable: false },
                { width:"100",dataField:'sc1',title: "Reviewer 1", row: '0',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"100",dataField:'sc2',title: "Reviewer 2", row: '0',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"100",dataField:'sc3',title: "Reviewer 3", row: '0',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"100",dataField:'sc4',title: "Average", row: '0',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"100",dataField:'sc5',title: "Proportion", row: '0',rowSpan: '1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false }
            ],
            datas: [
                { id: 1, dt1:'Complexity of Implementation',sc1:'',sc2:'7',sc3:'5',sc4:'4.0',sc5:'17', fcn: 'Engineering'},
                { id: 2, dt1:'Timeline of Implementation',sc1:'',sc2:'9',sc3:'7',sc4:'5.3',sc5:'23', fcn: 'Engineering'},
                { id: 3, dt1:'Technical Supports Resources',sc1:'',sc2:'3',sc3:'5',sc4:'2.7',sc5:'12', fcn: 'Engineering'},
                { id: 4, dt1:'Cost',sc1:'',sc2:'1',sc3:'3',sc4:'1.3',sc5:'6', fcn: 'Operations'},
                { id: 5, dt1:'Benefit',sc1:'',sc2:'5',sc3:'2',sc4:'2.3',sc5:'10', fcn: 'Operations'},
                { id: 6, dt1:'Business Reputation',sc1:'',sc2:'3',sc3:'3',sc4:'2.0',sc5:'9', fcn: 'Operations'},
                { id: 7, dt1:'Well Known by Oil and Gas Company',sc1:'',sc2:'2',sc3:'2',sc4:'1.3',sc5:'6', fcn: 'Safety'},
                { id: 8, dt1:'Have Strong Financial Position',sc1:'',sc2:'2',sc3:'2',sc4:'1.3',sc5:'6', fcn: 'General'},
                { id: 9, dt1:'Register in Approved Manufacturing List',sc1:'',sc2:'3',sc3:'2',sc4:'1.7',sc5:'7', fcn: 'General'},
                { id: 10, dt1:'Local Content Amount (TKDN)',sc1:'',sc2:'2',sc3:'5',sc4:'2.3',sc5:'10', fcn: 'General'},
                // { id: 11, dt1:'Local Content Amount (TKDN)',sc1:'',sc2:'2',sc3:'2',sc4:'1.3',sc5:'5', fcn: 'General'}
            ],
            sp1: 22.9, sp2: 100
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

    toggleAhp = () => {
        this.setState({ modalAhp: !this.state.modalAhp })
    };

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleAhp = (e) => {
        const data = this.state.datas;
        if(this.props.passData.data[0].id){
            const id = this.props.passData.data[0].id;
            this.props.btnSubmitAhp(e, id, data);
        }else{
            Swal.fire({
                title: 'Failed Submit Data!',
                icon: 'warning',
                text: 'Please Assign Ahp!',
                showConfirmButton: false,
                timer: 2000
            })
        }        
    }

    handleClick = () => {
        this.props.toggleAhp();
    }

    handleAction = (row, cellName, cellValue) => {
        var sc4 = parseFloat(row.sc1)+parseFloat(row.sc2)+parseFloat(row.sc3);
        let newsc4 = (sc4/3).toFixed(1);
        row.sc4 = newsc4;
        console.log(row, 'row after')
        this.setState({
            datas: this.state.datas.map(el => (el.id === row.id ? Object.assign({}, el, { row }) : el))
        });
        var sp1 = 0, sp2 = 0
        for (let index = 0; index < this.state.datas.length; index++) {            
            sp1 = sp1+parseFloat(this.state.datas[index].sc4)
        }
        sp1 = sp1.toFixed(1);
        let newDatas = [];
        for (let index = 0; index < this.state.datas.length; index++) {            
            const newsc5 = (this.state.datas[index].sc4/sp1*100).toFixed(0)
            let arr = this.state.datas[index]
            arr.sc5 = newsc5
            this.setState({
                datas: this.state.datas.map(el => (el.id === index ? Object.assign({}, el, { arr }) : el))
            });
            newDatas.push(arr)
        }
        for (let index = 0; index < newDatas.length; index++) {            
            sp2 = sp2+parseFloat(newDatas[index].sc5)
        }
        this.setState({sp1: sp1, sp2: sp2})
        // console.log(this.state.datas, 'datas');
    }

    render() {
        let dataMain = this.props.passData.data ? this.props.passData.data[0] : []
        let dataReviewer = this.props.passData.reviewer;
        let extradt = this.props.passData.extradata;

        const footerData = [
            [
                // {
                // columnIndex: 0,
                // align: 'right',
                //     formatter: (tableData) => {
                //         return (
                //             <span> </span> 
                //         );
                //     }
                // },
                {
                    columnIndex: 0,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong> </strong>
                            );
                        }
                },
                {
                    columnIndex: 1,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong> </strong>
                            );
                        }
                },
                {
                    columnIndex: 2,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong> </strong>
                            );
                        }
                },
                {
                    columnIndex: 3,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong>Total</strong>
                            );
                        }
                },
                {
                    columnIndex: 4,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong>{this.state.sp1}</strong>
                            );
                        }
                },
                {
                    columnIndex: 5,
                    align: 'center',
                        formatter: (tableData) => {
                            return (
                                <strong>{this.state.sp2}</strong>
                            );
                        }
                },
            ]
		];
        return (
            <Modal isOpen={this.props.modalAhp} toggle={this.handleClick} className="modal-lg full-screen">
                <ModalHeader toggle={this.handleClick}>Form AHP</ModalHeader>
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
                    <Row style={{marginTop: '20px'}}>
                        <Col xs="12" lg="12" style={{marginBottom:'10px'}}><b>Analytical Hierarchical Process</b></Col>
                        <Col xs="12" lg="12">
                            <Table2AHP
                                tableHead={ this.state.tableHead }
                                datas={ this.state.datas }
                                footerData={footerData}
                                action={ this.handleAction }
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleAhp(e)}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-dropbox btn-brand btn-sm" onClick={this.handleClick}><i className="icon-undo2"> </i><span>Cancel</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Ahp;
