import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import Checkbox from '@material-ui/core/Checkbox';
import Swal from 'sweetalert2';
import Select from 'react-select';
import cs1 from '../../../Commons/jsonFile/impactCluster1.json';
import cs2 from '../../../Commons/jsonFile/impactCluster2.json';
import tech from '../../../Commons/jsonFile/techNovelty.json';

class Solution extends Component {
    constructor(props) {
        super();
        this.state = {
            modalReviewer: false,
            dataReviewer: [],
            impact: [],
            selectedOptionAppRating: [],
            selectedOptionMatRating: [],
            selectedOptionSummary: [],
            selectedOptionCluster: [],
            selectedOptionImpact: [],
            impactDisable: true,
            impactValue: '',
            desc: '',
            opc: '',
            ev1: false,
            oab: '',
            ev2: false,
            par: '',
            ev3: false,
            fmea: '',
            ev4: false,
            poe: '',
            ev5: false,
            safety: '',
            ev6: false,
            budget: '',
            ev7: false,
            legal: '',
            ev8: false,
            mgt: '',
            ev9: false,
            is: '',
            ev10: false,
            consume: [
                {id:"11", value:"No New Technical Uncertainties"},
                {id:"12", value:"New Technical Uncertainties"},
                {id:"13", value:"New Technical Challenges"},
                {id:"21", value:"New Technical Uncertainties"},
                {id:"22", value:"New Technical Challenges"},
                {id:"23", value:"Demanding New Technical Challenges"},
                {id:"31", value:"New Technical Challenges"},
                {id:"32", value:"Demanding New Technical Challenges"},
                {id:"33", value:"Demanding New Technical Challenges"}
            ],
            selectConsume: '-'
        }
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeCB = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
    }

    handleSolution = (e) => {
        const id = this.props.passData.id;
        const summary = this.state.selectConsume;
        const cluster = this.state.selectedOptionCluster;
        const impact = this.state.selectedOptionImpact;
        const apprat = this.state.selectedOptionAppRating;
        const matrat = this.state.selectedOptionMatRating;
        if(summary !== '-' && Object.keys(cluster).length > 0 && Object.keys(impact).length > 0){
            const data = {
                summary: summary,
                cluster: cluster.label,
                impact: impact.label,
                impactValue: impact.value,
                desc: this.state.desc,
                opc: this.state.opc,
                ev1: this.state.ev1,
                oab: this.state.oab,
                ev2: this.state.ev2,
                par: this.state.par,
                ev3: this.state.ev3,
                fmea: this.state.fmea,
                ev4: this.state.ev4,
                apprat: apprat.label,
                poe: matrat.label,
                ev5: this.state.ev5,
                safety: this.state.safety,
                ev6: this.state.ev6,
                budget: this.state.budget,
                ev7: this.state.ev7,
                legal: this.state.legal,
                ev8: this.state.ev8,
                mgt: this.state.mgt,
                ev9: this.state.ev9,
                is: this.state.is,
                ev10: this.state.ev10
            };
            this.props.clickBtnSolution(e, id, data);
        }else{
            Swal.fire({
                title: 'Failed Submit Data!',
                icon: 'warning',
                text: 'Please Complete Data!',
                showConfirmButton: false,
                timer: 2000
            })
        }        
    }

    handleClick = () => {
        this.props.toggleSolution();
    }

    onChangeSelect = (selectedOptions, key) => {
        if(key==="selectedOptionCluster"){
            if(selectedOptions.label === 'Non SubSurface'){
                this.setState({ impact: cs1, selectedOptionImpact: [], impactDisable: false, impactValue: ''})
            }else if(selectedOptions.label === 'SubSurface'){
                this.setState({ impact: cs2, selectedOptionImpact: [], impactDisable: false, impactValue: ''})
            }else{
                this.setState({ impact: [], selectedOptionImpact: [], impactDisable: true, impactValue: ''})
            }
        }else if(key==="selectedOptionImpact"){
            this.setState({ impactValue: selectedOptions ? selectedOptions.value : ''})
        }
        this.setState({ [key]: selectedOptions },
            ()=>{
                if(key==="selectedOptionAppRating" || key==="selectedOptionMatRating"){
                    if(this.state.selectedOptionAppRating && Object.keys(this.state.selectedOptionAppRating).length > 0 && this.state.selectedOptionMatRating && Object.keys(this.state.selectedOptionMatRating).length > 0){
                        const c1 = this.state.selectedOptionAppRating.value;
                        const c2 = this.state.selectedOptionMatRating.value;
                        const idcs = c1+''+c2
                        const sc = this.state.consume.filter(item => item.id === idcs)
                        this.setState({selectConsume: sc[0].value})
                    }else{
                        this.setState({selectConsume: '-'})
                    }
                }
            }
        );
    }

    render() {
        let dataReviewer = this.props.passData.reviewer;
        const cluster = [
            {value: '1', label: 'Non SubSurface'},
            {value: '2', label: 'SubSurface'}
        ]
        const apprat = [
            {value: '1', label: 'Known'},
            {value: '2', label: 'Limited'},
            {value: '3', label: 'New'}
        ]
        const matrat = [
            {value: '1', label: 'Proven'},
            {value: '2', label: 'Limited Field History'},
            {value: '3', label: 'New or Unproven'}
        ]

        return (
            <Modal isOpen={this.props.modalSolution} toggle={this.handleClick} className="modal-lg full-screen">
                <ModalHeader toggle={this.handleClick}>Solution Candidate Type</ModalHeader>
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
                            <Label className="labelForm">Discipline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.discipline}</Label>
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
                            <Label className="labelForm">Asset</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.aset}</Label>
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
                            <Label className="labelForm">Owner</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="4">
                            <Label className="labelFormNB">{this.props.passData.owner}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Brief of Case</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col sm="6" md="10">
                            <Label className="labelFormNB">{this.props.passData.desc}</Label>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
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
                            <Input type="text" name="desc" value={this.state.desc} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Operating Parameter</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="opc" value={this.state.opc} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev1} name="ev1" value={this.state.ev1} onChange={this.onChangeCB}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Operating Boundary</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="oab" value={this.state.oab} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev2} name="ev2" value={this.state.ev2} onChange={this.onChangeCB}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Past Application Result</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="par" value={this.state.par} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev3} name="ev3" value={this.state.ev3} onChange={this.onChangeCB}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">FMEA</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="fmea" value={this.state.fmea} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev4} name="ev4" value={this.state.ev4} onChange={this.onChangeCB}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Application Rating</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={apprat} name="selectedOptionAppRating" value={this.state.selectedOptionAppRating} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionAppRating')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Maturity Rating</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={matrat} name="selectedOptionMatRating" value={this.state.selectedOptionMatRating} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionMatRating')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                            {/* <Input type="text" name="poe" value={this.state.poe} onChange={this.onChangeInput} placeholder="" /> */}
                        </Col>
                        {/* <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev5} name="ev5" value={this.state.ev5} onChange={this.onChangeCB}/>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Safety</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="safety" value={this.state.safety} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev6} name="ev6" value={this.state.ev6} onChange={this.onChangeCB}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Budget</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="budget" value={this.state.budget} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev7} name="ev7" value={this.state.ev7} onChange={this.onChangeCB}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Legal Aspect</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="legal" value={this.state.legal} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev8} name="ev8" value={this.state.ev8} onChange={this.onChangeCB}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Management</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="mgt" value={this.state.mgt} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev9} name="ev9" value={this.state.ev9} onChange={this.onChangeCB}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">IS</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="is" value={this.state.is} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev10} name="ev10" value={this.state.ev10} onChange={this.onChangeCB}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Conclusion Summary</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8" md="3">
                            <Label className="labelFormNB">{this.state.selectConsume}</Label>
                            {/* <Select menuPlacement="top" options={tech} name="selectedOptionSummary" value={this.state.selectedOptionSummary} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionSummary')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} /> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Cluster</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8" md="3">
                            <Select options={cluster} menuPlacement="top" name="selectedOptionCluster" value={this.state.selectedOptionCluster} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionCluster')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">Impact Rating</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8" md="3">
                            <Select isDisabled={this.state.impactDisable} menuPlacement="top" options={this.state.impact} name="selectedOptionImpact" value={this.state.selectedOptionImpact} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionImpact')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                        <Col sm="6" md="2">
                            <Label className="labelForm">{this.state.impactValue}</Label>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleSolution(e)}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-google-plus btn-brand btn-sm" onClick={this.handleClick}><i className="icon-cross2"> </i><span>Cancel</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Solution;
