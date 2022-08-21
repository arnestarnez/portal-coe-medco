import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import Reviewer from './reviewer';
import Swal from 'sweetalert2';

class Rating extends Component {
    constructor(props) {
        super();
        this.state = {
            modalReviewer: false,
            dataReviewer: []
        }
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
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRating = (e) => {
        const id = this.props.passData.id;
        const data = this.state.dataReviewer;
        if(data.length > 0){
            this.props.clickBtnRating(e, id, data);
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
        this.props.toggleRating();
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

    render() {
        let dataReviewer = this.state.dataReviewer;
        return (
            <Modal isOpen={this.props.modalRating} toggle={this.handleClick} className="modal-lg full-screen">
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
                        <div style={{width:'100%',display:'flex',justifyContent:'space-between',marginBottom:'15px',marginRight:'15px',marginLeft:'15px'}}>
                            <Label><b>List Reviewer</b></Label>
                            <Button className="btn-facebook btn-brand btn-sm" onClick={this.toggleReviewer}><i className="icon-user-plus"> </i><span>Add</span></Button>
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
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleRating(e)}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-google-plus btn-brand btn-sm" onClick={this.handleClick}><i className="icon-cross2"> </i><span>Cancel</span></Button>
                </ModalFooter>
                <Reviewer modalReviewer={this.state.modalReviewer} toggleReviewer={this.toggleReviewer} passId={this.props.passData.id} clickBtnReviewer={this.handleReviewer}/>
            </Modal>
        );
    }
}

export default Rating;
