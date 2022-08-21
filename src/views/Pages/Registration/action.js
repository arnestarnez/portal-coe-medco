import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Label, Button} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Select from 'react-select';
import dataJson from './data.json';

class Action extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.id){
            console.log();
        }else{
            this.props.history.push('/registration/case')
        }
        this.state = {
            blocking: false,
            open: false,
            collapse: true,
            fadeIn: true,
            data: dataJson.filter(item => item.id === this.props.location.id)[0]
        }
    }

    render() {
        return (
            <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.state.blocking}>
                    <Row>
                        <Col xs="12" md="12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md="12">
                                            <div className="titleCustomBody">
                                                <Row>
                                                    <Col xs="3" lg="2"><b>Title</b></Col>
                                                    <Col>
                                                        <div><span style={{fontSize:'14px', color:'#134A71'}}> Mesin NG</span></div>
                                                    </Col>
                                                </Row>    
                                            </div>
                                            <div className="customBody">
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Discipline</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Mechanical</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Facility</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Belida</Label>
                                                    </Col>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Asset</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Turbomachinery</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Submitter</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Roni</Label>
                                                    </Col>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Date</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">2020-10-16</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Owner</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Bagus</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Brief of Case</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="10">
                                                        <Label className="labelFormNB">Sample Case Description 4</Label>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Priority</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Optimization</Label>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col xs="4" lg="2"><b>Assign Reviewer AHP</b></Col>
                                                    <Col xs="7" lg="9">
                                                        <div style={{marginBottom:'10px'}}><Select value={{label:'Aulia - Maintenance'}} isClearable/></div>
                                                        <div style={{marginBottom:'10px'}}><Select value={{label:'Bayu - Engineering'}} isClearable/> <Button style={{float:'right', marginTop:'-33px', marginRight: '-35px'}} className="btn-google-plus btn-brand btn-sm icon"><i className="icon-cross2"> </i></Button></div>
                                                        <div style={{marginBottom:'10px'}}><Select value={{label:'Fajar - Operator'}} isClearable/> <Button style={{float:'right', marginTop:'-33px', marginRight: '-35px'}} className="btn-google-plus btn-brand btn-sm icon"><i className="icon-cross2"> </i></Button></div>
                                                        <div style={{marginBottom:'10px'}}><Select value={{label:'Ilham - Project'}} isClearable/> <Button style={{float:'right', marginTop:'-33px', marginRight: '-35px'}} className="btn-google-plus btn-brand btn-sm icon"><i className="icon-cross2"> </i></Button></div>
                                                        <div style={{marginBottom:'10px'}}><Select value={{label:'Andre - HSE'}} isClearable/> <Button style={{float:'right', marginTop:'-33px', marginRight: '-35px'}} className="btn-google-plus btn-brand btn-sm icon"><i className="icon-cross2"> </i></Button></div>
                                                    </Col>
                                                    <Col xs="1" lg="1">
                                                        <Button style={{position: 'absolute',left: '-5px',top: '5px'}} className="btn-github btn-brand btn-sm icon"><i className="icon-file-plus"> </i></Button>
                                                    </Col>
                                                </Row>
                                                <div style={{marginTop:'10px'}}>
                                                    <Button style={{marginRight:'5px'}} className="btn-vine btn-brand btn-sm"><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                                                    {/* <Button style={{marginRight:'5px'}} className="btn-google-plus btn-brand btn-sm"><i className="icon-cross2"> </i><span>Reject</span></Button> */}
                                                    <Button className="btn-dropbox btn-brand btn-sm" onClick={() => {this.props.history.push('/registration/case')}}><i className="icon-undo2"> </i><span>Cancel</span></Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </BlockUi>
            </div >
        );
    }
}

export default Action;
