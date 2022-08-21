import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import Select from 'react-select';
import Swal from 'sweetalert2';
import priority from '../../../Commons/jsonFile/priority.json'

class Edit extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedOptionPriority: [],
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.props.passDataEdit.id;
        if(this.props.passDataEdit.id && 
                this.state.selectedOptionPriority && Object.keys(this.state.selectedOptionPriority).length > 0
            ){
            var data = {
                priority: this.state.selectedOptionPriority
            }
            Swal.fire({
                title: 'Submit Data',
                text: "Are you sure to submit?",
                icon: 'warning',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                confirmButtonColor: '#3085d6',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {       
                    this.props.btnSubmitEdit(id, data);
                    this.setState({ 
                        selectedOptionPriority: null
                    });
                }
            });
        }else{
            Swal.fire({
                title: 'Failed',
                icon: 'warning',
                text: 'Please complete data.',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    handleClick = () => {
        this.props.toggleEdit();
    }

    onChangePriority = (selectedOptions) => {
        this.setState({ selectedOptionPriority: selectedOptions });
    }

    render() {
        return (
            <Modal isOpen={this.props.modalEdit} toggle={this.handleClick} className="modal-lg">
                <ModalHeader toggle={this.handleClick}>Case Prioritization</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Title</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passDataEdit.issue}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Discipline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.discipline}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Facility</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.area}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Asset</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.aset}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Submitter</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.submitter}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Date</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.date}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Owner</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.owner}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Brief of Case</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passDataEdit.desc}</Label>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Priority</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Select options={priority} value={this.state.selectedOptionPriority} onChange={this.onChangePriority} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleSubmit(e)}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-google-plus btn-brand btn-sm" onClick={this.handleClick}><i className="icon-cross2"> </i><span>Cancel</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Edit;
