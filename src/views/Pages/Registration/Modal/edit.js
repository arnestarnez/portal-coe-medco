import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import Reviewer from './reviewer';
import Swal from 'sweetalert2';
import Select from 'react-select';
import user from '../../../Commons/jsonFile/user.json';

class Edit extends Component {
    constructor(props) {
        super();
        this.state = {
            modalReviewer: false,
            dataReviewer: [],
            userTeamLead : [],
            selectedOptionTeamLead: [],
            tljob: '',
            tldept: '',
            sdate: '',
            edate: '',
            venue: '',
        }
    }

    componentDidMount = () => {
        let newDatas = [];
        let users = user.filter(row => row.level === 'teamlead')
        users.forEach(row => {
            var child = [{value: row.name, label: row.name}]
            newDatas = newDatas.concat(child)
        })
        this.setState({userTeamLead: newDatas})

        var curr = new Date();
        curr.setDate(curr.getDate());
        this.setState({sdate: curr.toISOString().substr(0,10), edate: curr.toISOString().substr(0,10)})
    }

    toggleReviewer = () => {
        this.setState({ modalReviewer: !this.state.modalReviewer })
    };

    handleReviewer = (e, revData) => {
        Swal.fire({
            title: 'Assign Reviewer',
            text: "Are you sure to add?",
            icon: 'question',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {    
                let newData = this.state.dataReviewer.concat(revData);
                this.setState({dataReviewer: newData},
                () => {   
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Data already submited!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.toggleReviewer();
                });
            }
        });
    }

    onChangeInput = (e) => {
        console.log(e.target.name, 'change')
        this.setState({ [e.target.name]: e.target.value });
    }

    handleEdit = (e) => {
        const data = this.state.dataReviewer;
        console.log(this.state.edate, 'edate submit')
        if(data.length > 0 && this.state.selectedOptionTeamLead && Object.keys(this.state.selectedOptionTeamLead).length > 0){
            const id = this.props.passData.id;
            const extraData = {
                id: id,
                tlname: this.state.selectedOptionTeamLead.label,
                tljob: this.state.tljob,
                tldept: this.state.tldept,
                sdate: this.state.sdate,
                edate: this.state.edate,
                venue: this.state.venue,
            }
            this.props.btnSubmitEdit(e, id, data, extraData);
        }else{
            Swal.fire({
                title: 'Failed Submit Data!',
                icon: 'warning',
                text: 'Please Assign Reviewer!',
                showConfirmButton: false,
                timer: 2000
            })
        }        
    }

    handleClick = () => {
        this.props.toggleEdit();
    }

    deleteReviewer = (e, item) => {
        e.preventDefault()
        let newDatas = []
        this.state.dataReviewer.filter(row => {
            if(row.name !== item.name){
                newDatas.push(row);
            }
        })
        this.setState({dataReviewer: newDatas})
    }

    onChangeSelect = (selectedOptions, key) => {
        if(key==="selectedOptionTeamLead"){
            user.filter(row => {
                if(selectedOptions && row.name === selectedOptions.label){
                    this.setState({ tljob: row.job, tldept: row.dept})
                }
                return null
            })
            if(selectedOptions === null){
                this.setState({ tljob: '', tldept: ''})
            }
        }
        this.setState({ [key]: selectedOptions });
    }

    render() {
        let dataReviewer = this.state.dataReviewer;
        return (
            <Modal isOpen={this.props.modalEdit} toggle={this.handleClick} className="modal-lg full-screen">
                <ModalHeader toggle={this.handleClick}>Assign Reviewer</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Title</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passData.issue}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Business Case</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passData.bcase}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Tech. Grouping</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passData.tgrup}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Facility</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.area}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Discipline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.discipline}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Submitter</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.submitter}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Date</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.date}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Tech. Owner</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.owner}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Tech. Principal</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.tp}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Est. Cost</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.escost} (USD)</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Est. Timeline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.estime}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Brief Solution</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passData.briefsol}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Additional Data</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passData.addData}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Benefits</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passData.benefit} (USD)</Label>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Impact Rating</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8" md="3">
                            <Label className="labelFormNB">{this.props.passData.impact}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Value Adding</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.valueAdd}</Label>
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Priority</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.priority}</Label>
                        </Col>
                    </Row>
                    <hr/>
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
                            <Input type="date" name="sdate" value={this.state.sdate} onChange={this.onChangeInput} />
                        </Col>
                        <Col xs="2">
                            <Label className="labelForm">End Date</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="4">
                            <Input type="date" name="edate" value={this.state.edate} onChange={this.onChangeInput} />
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
                            <Label className="labelFormNB">*Attached Attributed Technology</Label>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Team Lead</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="3">
                            <Select options={this.state.userTeamLead} menuPlacement="top" name="selectedOptionTeamLead" value={this.state.selectedOptionTeamLead} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionTeamLead')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                        <Col xs="3">
                            <Input type="text" name="tldept" value={this.state.tldept} onChange={this.onChangeInput} placeholder="Dept" disabled/>
                        </Col>
                        <Col xs="3">
                            <Input type="text" name="tljob" value={this.state.tljob} onChange={this.onChangeInput} placeholder="Job" disabled/>
                        </Col>
                    </Row>
                    <Row>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-start',marginBottom:'15px',marginRight:'15px',marginLeft:'15px'}}>
                            <Button className="btn-facebook btn-brand btn-sm" onClick={this.toggleReviewer}><i className="icon-user-plus"> </i><span>Add Reviewer</span></Button>
                        </div>
                    </Row>
                    {
                        (dataReviewer.length > 0) ?
                        (this.state.dataReviewer.map((item, index) => {
                            return (
                                <Row key={index}>
                                    <Col xs="2">
                                        <Label className="labelForm">Reviewer {index+1}</Label>
                                        <span className="spanForm">:</span>
                                    </Col>
                                    <Col xs="3">
                                        <Input type="text" name={"reviewer"+index} value={item.name} onChange={this.onChangeInput} placeholder="" disabled/>
                                    </Col>
                                    <Col xs="3">
                                        <Input type="text" name={"dept"+index} value={item.dept} onChange={this.onChangeInput} placeholder="" disabled/>
                                    </Col>
                                    <Col xs="3">
                                        <Input type="text" name={"job"+index} value={item.job} onChange={this.onChangeInput} placeholder="" disabled/>
                                    </Col>
                                    {/* <Col xs="2">
                                        <Input type="text" name={"type"+index} value={item.type} onChange={this.onChangeInput} placeholder="" disabled/>
                                    </Col> */}
                                    <Col xs="1" style={{lineHeight:'32px'}}>
                                        <Button className="btn-google-plus btn-brand btn-sm" onClick={(e) => this.deleteReviewer(e, item)}><i className="icon-cross3"> </i></Button>
                                    </Col>
                                </Row>
                            )
                        }))
                        :
                        (
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <Label className="labelForm">----- No Data -----</Label>
                            </div>
                        )
                    }
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleEdit(e)}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-dropbox btn-brand btn-sm" onClick={this.handleClick}><i className="icon-undo2"> </i><span>Cancel</span></Button>
                </ModalFooter>
                <Reviewer modalReviewer={this.state.modalReviewer} toggleReviewer={this.toggleReviewer} passId={this.props.passData.id} clickBtnReviewer={this.handleReviewer}/>
            </Modal>
        );
    }
}

export default Edit;
