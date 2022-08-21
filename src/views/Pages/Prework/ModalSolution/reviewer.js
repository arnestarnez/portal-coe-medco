import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import user from '../../../Commons/jsonFile/user.json';
import Select from 'react-select';
import Swal from 'sweetalert2';

class Reviewer extends Component {
    constructor(props) {
        super();
        this.state = {
            reviewer: [],
            selectedOptionReviewer: [],
            selectedOptionType: [],
            selectedOptionAck: [],
            purpose: '',
            sdate: '',
            edate: '',
            venue: '',
            premdata: '',
            job: '',
            dept: '',
            task: ''
        }
    }

    componentDidMount = () => {
        let newDatas = [];
        let users = user.filter(row => row.level === 'reviewer')
        users.forEach(row => {
            var child = [{value: row.name, label: row.name}]
            newDatas = newDatas.concat(child)
        })
        this.setState({reviewer: newDatas})

        var curr = new Date();
        curr.setDate(curr.getDate());
        this.setState({sdate: curr.toISOString().substr(0,10), edate: curr.toISOString().substr(0,10)})
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeSelect = (selectedOptions, key) => {
        if(key==="selectedOptionReviewer"){
            user.filter(row => {
                if(selectedOptions && row.name === selectedOptions.label){
                    this.setState({ job: row.job, dept: row.dept})
                }
                return null
            })
            if(selectedOptions === null){
                this.setState({ job: '', dept: ''})
            }
        }
        this.setState({ [key]: selectedOptions });
    }

    handleReviewer = (e) => {
        if(this.state.job !== ''){
            const data = {
                id: this.props.passId,
                purpose: this.state.purpose,
                sdate: this.state.sdate,
                edate: this.state.edate,
                venue: this.state.venue,
                premdata: this.state.premdata,
                name: this.state.selectedOptionReviewer.label,
                job: this.state.job,
                dept: this.state.dept,
                type: this.state.selectedOptionType.label,
                task: this.state.task,
                ack: this.state.selectedOptionAck.label
            }
            this.props.clickBtnReviewer(e, data);
        }else{
            Swal.fire({
                title: 'Failed Submit Data!',
                icon: 'warning',
                text: 'Form data not complete yet!',
                showConfirmButton: false,
                timer: 2000
            })
        }        
    }

    handleClick = () => {
        this.props.toggleReviewer();
    }

    render() {
        const type = [
            {value: '1', label: 'Team Lead'},
            {value: '2', label: 'Team Member'},
        ]

        const ack = [
            {value: '1', label: 'Yes'},
            {value: '2', label: 'No'},
        ]

        return (
            <Modal isOpen={this.props.modalReviewer} toggle={this.handleClick} className="modal-lg">
                <ModalHeader toggle={this.handleClick}>Reviewer Form</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Team Purpose</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Input type="text" name="purpose" value={this.state.purpose} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Start Date</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="4">
                            <Input type="date" name="sdate" defaultValue={this.state.sdate} onChange={this.onChangeInput} />
                        </Col>
                        <Col xs="2">
                            <Label className="labelForm">End Date</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="4">
                            <Input type="date" name="edate" defaultValue={this.state.edate} onChange={this.onChangeInput} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Venue</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Input type="text" name="venue" value={this.state.venue} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Data/Fact</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Input type="text" name="premdata" value={this.state.premdata} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Reviewer Name</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Select options={this.state.reviewer} name="selectedOptionReviewer" value={this.state.selectedOptionReviewer} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionReviewer')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Reviewer Job</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Input type="text" disabled name="job" value={this.state.job} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Reviewer Dept</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Input type="text" disabled name="dept" value={this.state.dept} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Assign As</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Select options={type} name="selectedOptionType" value={this.state.selectedOptionType} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionType')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Task</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Input type="text" name="task" value={this.state.task} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Admit</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Select options={ack} name="selectedOptionAck" value={this.state.selectedOptionAck} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionAck')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleReviewer(e)}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-google-plus btn-brand btn-sm" onClick={this.handleClick}><i className="icon-cross2"> </i><span>Cancel</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Reviewer;
