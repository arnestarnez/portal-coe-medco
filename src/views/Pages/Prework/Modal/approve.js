import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import Checkbox from '@material-ui/core/Checkbox';

class Approve extends Component {
    constructor(props) {
        super();
    }

    handleApproval = (e, action) => {
        var id = this.props.passData.data[0].id;
        this.props.clickBtnApproval(e, action, id);
    }

    handleClick = () => {
        this.props.toggleApprove();
    }

    render() {
        // console.log(this.props.passData.data, 'data')
        if(this.props.passData.data){
            console.log(this.props.passData.data[0].sct.impactValue, 'data')
        }
        let dataMain = this.props.passData.data ? this.props.passData.data[0] : []
        let dataReviewer = this.props.passData.reviewer;
        return (
            <Modal isOpen={this.props.modalApprove} toggle={this.handleClick} className="modal-lg full-screen">
                <ModalHeader toggle={this.handleClick}>Form Approval</ModalHeader>
                <ModalBody>
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
                            <Label className="labelForm">Discipline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{dataMain.discipline}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Facility</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{dataMain.dt1}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Asset</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{dataMain.aset}</Label>
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
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Brief of Case</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{dataMain.desc}</Label>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Priority</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{dataMain.priority}</Label>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-start',marginLeft:'15px'}}>
                            <Label className="labelForm">List Reviewer</Label>
                        </div>
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
                                        <Label className="labelFormNB">{item.name}, {item.dept}, {item.job}</Label>
                                    </Col>
                                </Row>
                            )
                        }))
                        :
                        null
                    }
                    <hr/>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Solution Description</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.desc : '-'}</Label>
                        </Col>
                    </Row>
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
                            <Label className="labelForm">Operating Boundary</Label>
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
                            <Label className="labelForm">FMEA</Label>
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
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Application Rating</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.apprat : '-'}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Maturity Rating</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.poe : '-'}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Safety</Label>
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
                            <Label className="labelForm">Legal Aspect</Label>
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
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">IS</Label>
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
                    <hr/>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Conclusion Summary</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8" md="3">
                            <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.summary : '-'}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Cluster</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8" md="3">
                        <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.cluster : '-'}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Impact Rating</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8" md="3">
                            <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.impact : '-'}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelFormNB">{dataMain.sct ? dataMain.sct.impactValue : '-'}</Label>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleApproval(e, 'approve')}><i className="icon-checkmark4"> </i><span>Approve</span></Button>
                    <Button className="btn-google-plus btn-brand btn-sm" onClick={(e) => this.handleApproval(e, 'reject')}><i className="icon-cross2"> </i><span>Reject</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Approve;
