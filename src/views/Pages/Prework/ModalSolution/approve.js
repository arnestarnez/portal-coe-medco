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
