import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, UncontrolledTooltip} from 'reactstrap';
import Checkbox from '@material-ui/core/Checkbox';
import Swal from 'sweetalert2';
import Select from 'react-select';
import DescModal from './desc';
import HintModal from './hint';

class Solution extends Component {
    constructor(props) {
        super();
        this.state = {
            modalDesc: false,
            descId: 0,
            titleDesc: '',
            modalHint: false,
            hintId: 0,
            titleHint: '',
            dataReviewer: [],
            extradt: [],
            impact: [],
            selectedOptionAppRating: [],
            selectedOptionMatRating: [],
            selectedOptionMrd: [],
            selectedOptionSummary: [],
            selectedOptionCluster: [],
            selectedOptionImpact: [],
            mrdDisable: true,
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
            mrdItem: [
                {value:"Proven Oil and Gas", label: "Proven Oil and Gas", cat: "Proven"},
                {value:"Proven Non Oil and Gas", label: "Proven Non Oil and Gas", cat: "Proven"},
                {value:"Proven Limited Oil and Gas", label: "Proven Limited Oil and Gas", cat: "Proven"},
                {value:"Proven Limited Non Oil and Gas", label: "Proven Limited Non Oil and Gas", cat: "Proven"},
                {value:"Emerging", label: "Emerging", cat: "Unproven"},
                {value:"Growth", label: "Growth", cat: "Unproven"},
            ],
            mrd: [],
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
        const mrd = this.state.selectedOptionMrd;
        const matrat = this.state.selectedOptionMatRating;
        if(id && Object.keys(mrd).length > 0 && Object.keys(matrat).length > 0){
            const data = {
                mrd: mrd.label,
                matrat: matrat.label,
                desc: this.state.desc,
                opc: this.state.opc,
                ev1: this.state.ev1,
                oab: this.state.oab,
                ev2: this.state.ev2,
                par: this.state.par,
                ev3: this.state.ev3,
                fmea: this.state.fmea,
                ev4: this.state.ev4,
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

    toggleDesc = () => {
        this.setState({ modalDesc: !this.state.modalDesc })
    };

    handleDesc = (e, no, titleDesc) => {
        e.preventDefault()
        this.setState({descId: no, titleDesc: titleDesc}, () => {this.toggleDesc()})
    }

    toggleHint = () => {
        this.setState({ modalHint: !this.state.modalHint })
    };

    handleHint = (e, no, titleHint) => {
        e.preventDefault()
        this.setState({hintId: no, titleHint: titleHint}, () => {this.toggleHint()})
    }

    onChangeSelect = (selectedOptions, key) => {
        if(key==="selectedOptionMatRating"){
            if(selectedOptions && selectedOptions.label === 'Proven'){
                const arr = this.state.mrdItem.filter(item => item.cat === 'Proven')
                this.setState({ mrd: arr, selectedOptionMrd: [], mrdDisable: false})
            }else if(selectedOptions && selectedOptions.label === 'Unproven'){
                const arr = this.state.mrdItem.filter(item => item.cat === 'Unproven')
                this.setState({ mrd: arr, selectedOptionMrd: [], mrdDisable: false})
            }else{
                this.setState({ mrd: [], selectedOptionMrd: [], mrdDisable: true})
            }
        }
        this.setState({ [key]: selectedOptions });
    }

    render() {
        let dataReviewer = this.props.passData.reviewer;
        let extradt = this.props.passData.extradata;
        const matrat = [
            {value: '1', label: 'Proven'},
            {value: '2', label: 'Unproven'}
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
                            <Label className="labelFormNB">{extradt ? extradt[0].sdate : '-'}</Label>
                        </Col>
                        <Col xs="2">
                            <Label className="labelForm">End Date</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="4">
                            <Label className="labelFormNB">{extradt ? extradt[0].edate : '-'}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Venue</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="10">
                            <Label className="labelFormNB">{extradt ? extradt[0].venue : '-'}</Label>
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
                            <Label className="labelFormNB">{extradt ? extradt[0].tlname : ''}, {extradt ? extradt[0].tljob : ''}, {extradt ? extradt[0].tldept : ''}</Label>
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
                    <hr/>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Operating Parameter</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="7">
                            <Input type="text" name="opc" value={this.state.opc} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev1} name="ev1" value={this.state.ev1} onChange={this.onChangeCB}/>
                        </Col>
                        <Col xs="1">
                            <Button className="btn-behance btn-brand btn-sm" id="desc1" onClick={(e) => this.handleDesc(e, 1, 'Operating Parameter')} style={{marginRight:'5px'}}><i className="icon-price-tags"></i></Button>
                            <UncontrolledTooltip placement="top" target="desc1">
                                Description
                            </UncontrolledTooltip>
                            <Button className="btn-behance btn-brand btn-sm" id="hint1" onClick={(e) => this.handleHint(e, 1, 'Operating Parameter')}><i className="icon-question4"> </i></Button>
                            <UncontrolledTooltip placement="top" target="hint1">
                                Hint Question
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Operating Context</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="7">
                            <Input type="text" name="oab" value={this.state.oab} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev2} name="ev2" value={this.state.ev2} onChange={this.onChangeCB}/>
                        </Col>
                        <Col xs="1">
                            <Button className="btn-behance btn-brand btn-sm" id="desc2" onClick={(e) => this.handleDesc(e, 2, 'Operating Context')} style={{marginRight:'5px'}}><i className="icon-price-tags"></i></Button>
                            <UncontrolledTooltip placement="top" target="desc2">
                                Description
                            </UncontrolledTooltip>
                            <Button className="btn-behance btn-brand btn-sm" id="hint2" onClick={(e) => this.handleHint(e, 2, 'Operating Context')}><i className="icon-question4"> </i></Button>
                            <UncontrolledTooltip placement="top" target="hint2">
                                Hint Question
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Past Application Result</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="7">
                            <Input type="text" name="par" value={this.state.par} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev3} name="ev3" value={this.state.ev3} onChange={this.onChangeCB}/>
                        </Col>
                        <Col xs="1">
                            <Button className="btn-behance btn-brand btn-sm" id="desc3" onClick={(e) => this.handleDesc(e, 3, 'Past Application Result')} style={{marginRight:'5px'}}><i className="icon-price-tags"></i></Button>
                            <UncontrolledTooltip placement="top" target="desc3">
                                Description
                            </UncontrolledTooltip>
                            <Button className="btn-behance btn-brand btn-sm" id="hint3" onClick={(e) => this.handleHint(e, 3, 'Past Application Result')}><i className="icon-question4"> </i></Button>
                            <UncontrolledTooltip placement="top" target="hint3">
                                Hint Question
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Risk Mapping</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="7">
                            <Input type="text" name="fmea" value={this.state.fmea} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev4} name="ev4" value={this.state.ev4} onChange={this.onChangeCB}/>
                        </Col>
                        <Col xs="1">
                            <Button className="btn-behance btn-brand btn-sm" id="desc4" onClick={(e) => this.handleDesc(e, 4, 'Risk Mapping')} style={{marginRight:'5px'}}><i className="icon-price-tags"></i></Button>
                            <UncontrolledTooltip placement="top" target="desc4">
                                Description
                            </UncontrolledTooltip>
                            <Button className="btn-behance btn-brand btn-sm" id="hint4" onClick={(e) => this.handleHint(e, 4, 'Risk Mapping')}><i className="icon-question4"> </i></Button>
                            <UncontrolledTooltip placement="top" target="hint4">
                                Hint Question
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">HSE</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="7">
                            <Input type="text" name="safety" value={this.state.safety} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev6} name="ev6" value={this.state.ev6} onChange={this.onChangeCB}/>
                        </Col>
                        <Col xs="1">
                            <Button className="btn-behance btn-brand btn-sm" id="desc6" onClick={(e) => this.handleDesc(e, 6, 'HSE')} style={{marginRight:'5px'}}><i className="icon-price-tags"></i></Button>
                            <UncontrolledTooltip placement="top" target="desc6">
                                Description
                            </UncontrolledTooltip>
                            <Button className="btn-behance btn-brand btn-sm" id="hint6" onClick={(e) => this.handleHint(e, 6, 'HSE')}><i className="icon-question4"> </i></Button>
                            <UncontrolledTooltip placement="top" target="hint6">
                                Hint Question
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Budget</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="7">
                            <Input type="text" name="budget" value={this.state.budget} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev7} name="ev7" value={this.state.ev7} onChange={this.onChangeCB}/>
                        </Col>
                        <Col xs="1">
                            <Button className="btn-behance btn-brand btn-sm" id="desc7" onClick={(e) => this.handleDesc(e, 7, 'Budget')} style={{marginRight:'5px'}}><i className="icon-price-tags"></i></Button>
                            <UncontrolledTooltip placement="top" target="desc7">
                                Description
                            </UncontrolledTooltip>
                            <Button className="btn-behance btn-brand btn-sm" id="hint7" onClick={(e) => this.handleHint(e, 7, 'Budget')}><i className="icon-question4"> </i></Button>
                            <UncontrolledTooltip placement="top" target="hint7">
                                Hint Question
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Legal</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="7">
                            <Input type="text" name="legal" value={this.state.legal} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev8} name="ev8" value={this.state.ev8} onChange={this.onChangeCB}/>
                        </Col>
                        <Col xs="1">
                            <Button className="btn-behance btn-brand btn-sm" id="desc8" onClick={(e) => this.handleDesc(e, 8, 'Legal')} style={{marginRight:'5px'}}><i className="icon-price-tags"></i></Button>
                            <UncontrolledTooltip placement="top" target="desc8">
                                Description
                            </UncontrolledTooltip>
                            <Button className="btn-behance btn-brand btn-sm" id="hint8" onClick={(e) => this.handleHint(e, 8, 'Legal')}><i className="icon-question4"> </i></Button>
                            <UncontrolledTooltip placement="top" target="hint8">
                                Hint Question
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">IS/IT</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="7">
                            <Input type="text" name="is" value={this.state.is} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev10} name="ev10" value={this.state.ev10} onChange={this.onChangeCB}/>
                        </Col>
                        <Col xs="1">
                            <Button className="btn-behance btn-brand btn-sm" id="desc10" onClick={(e) => this.handleDesc(e, 10, 'IS/IT')} style={{marginRight:'5px'}}><i className="icon-price-tags"></i></Button>
                            <UncontrolledTooltip placement="top" target="desc10">
                                Description
                            </UncontrolledTooltip>
                            <Button className="btn-behance btn-brand btn-sm" id="hint10" onClick={(e) => this.handleHint(e, 10, 'IS/IT')}><i className="icon-question4"> </i></Button>
                            <UncontrolledTooltip placement="top" target="hint10">
                                Hint Question
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Management</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="7">
                            <Input type="text" name="mgt" value={this.state.mgt} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                        <Col xs="1">
                            <Label className="labelFormRight">Evidence :</Label>
                        </Col>
                        <Col xs="1">
                            <Checkbox color="primary" checked={this.state.ev9} name="ev9" value={this.state.ev9} onChange={this.onChangeCB}/>
                        </Col>
                        <Col xs="1">
                            <Button className="btn-behance btn-brand btn-sm" id="desc9" onClick={(e) => this.handleDesc(e, 9, 'Management')} style={{marginRight:'5px'}}><i className="icon-price-tags"></i></Button>
                            <UncontrolledTooltip placement="top" target="desc9">
                                Description
                            </UncontrolledTooltip>
                            <Button className="btn-behance btn-brand btn-sm" id="hint9" onClick={(e) => this.handleHint(e, 9, 'Management')}><i className="icon-question4"> </i></Button>
                            <UncontrolledTooltip placement="top" target="hint9">
                                Hint Question
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs="2">
                            <Label className="labelForm">Maturity Rating</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="3">
                            <Select options={matrat} menuPlacement="top" name="selectedOptionMatRating" value={this.state.selectedOptionMatRating} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionMatRating')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                        <Col md="3">
                            <Select isDisabled={this.state.mrdDisable} menuPlacement="top" options={this.state.mrd} name="selectedOptionMrd" value={this.state.selectedOptionMrd} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionMrd')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleSolution(e)}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-dropbox btn-brand btn-sm" onClick={this.handleClick}><i className="icon-undo2"> </i><span>Cancel</span></Button>
                </ModalFooter>
                <DescModal modalDesc={this.state.modalDesc} toggleDesc={this.toggleDesc} passId={this.state.descId} titleDesc={this.state.titleDesc}/>
                <HintModal modalHint={this.state.modalHint} toggleHint={this.toggleHint} passId={this.state.hintId} titleDesc={this.state.titleHint}/>
            </Modal>
        );
    }
}

export default Solution;
