import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import Select from 'react-select';
import Swal from 'sweetalert2';
import cs1 from '../../../Commons/jsonFile/impactCluster1.json';
import solutionva from '../../../Commons/jsonFile/solutionva.json'
import priority from '../../../Commons/jsonFile/priority.json'

class Edit extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedOptionValueAdd: [],
            selectedOptionPriority: [],
            selectedOptionImpactRating: [],
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.props.passDataEdit.id;
        if(this.props.passDataEdit.id && 
                this.state.selectedOptionValueAdd && Object.keys(this.state.selectedOptionValueAdd).length > 0 &&
                this.state.selectedOptionPriority && Object.keys(this.state.selectedOptionPriority).length > 0 &&
                this.state.selectedOptionImpactRating && Object.keys(this.state.selectedOptionImpactRating).length > 0
            ){
            var data = {
                valueAdd: this.state.selectedOptionValueAdd,
                priority: this.state.selectedOptionPriority,
                impact: this.state.selectedOptionImpactRating
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
                        selectedOptionValueAdd: null,
                        selectedOptionPriority: null,
                        selectedOptionImpactRating: null
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

    onChangeValueAdd = (selectedOptions) => {
        this.setState({ selectedOptionValueAdd: selectedOptions });
    }

    onChangePriority = (selectedOptions) => {
        this.setState({ selectedOptionPriority: selectedOptions });
    }

    onChangeImpactRating = (selectedOptions) => {
        this.setState({ selectedOptionImpactRating: selectedOptions });
    }

    render() {
        return (
            <Modal isOpen={this.props.modalEdit} toggle={this.handleClick} className="modal-lg">
                <ModalHeader toggle={this.handleClick}>Solution Candidate Value Adding</ModalHeader>
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
                            <Label className="labelForm">Business Case</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passDataEdit.bcase}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Tech. Grouping</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passDataEdit.tgrup}</Label>
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
                            <Label className="labelForm">Discipline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.discipline}</Label>
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
                            <Label className="labelForm">Tech. Owner</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.owner}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Tech. Principal</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.tp}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Est. Cost</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.escost} (USD)</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Est. Timeline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passDataEdit.estime}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Brief Solution</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passDataEdit.briefsol}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Additional Data</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passDataEdit.addData}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Benefits</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passDataEdit.benefit} (USD)</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Impact Rating</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Select options={cs1} menuPlacement="top" value={this.state.selectedOptionImpactRating} onChange={this.onChangeImpactRating} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Value Adding</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Select options={solutionva} menuPlacement="top" value={this.state.selectedOptionValueAdd} onChange={this.onChangeValueAdd} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Priority</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Select options={priority} menuPlacement="top" value={this.state.selectedOptionPriority} onChange={this.onChangePriority} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleSubmit(e)}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-dropbox btn-brand btn-sm" onClick={this.handleClick}><i className="icon-undo2"> </i><span>Cancel</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Edit;
