import React, { Component } from 'react';
import { Col, Row, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import Select from 'react-select';
import Swal from 'sweetalert2';
import discipline from '../../../Commons/jsonFile/discipline.json'
import techPrincipal from '../../../Commons/jsonFile/techPrincipal.json'
//import 'bootstrap/dist/css/bootstrap.min.css';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issue: '',
            bcase:'',
            tgrup:'',
            escost: '',
            estime: '',
            benefit: '',
            briefsol: '',
            addData: '',
            submitter: localStorage.getItem('name'),
            date: null,
            selectedOptionTp: [],
            selectedOptionDiscipline: [],
            selectedOptionOwner: [],
            selectedOptionArea: [],
        }
    }

    componentDidMount = () => {
        var curr = new Date();
        curr.setDate(curr.getDate());
        this.setState({date: curr.toISOString().substr(0,10)})
    }

    handleClick = () => {
        this.props.toggleAdd();
    }

    handleClear = () => {
        this.setState({ 
            issue: '',
            bcase: '',
            tgrup:'',
            escost: '',
            estime: '',
            benefit: '',
            briefsol: '',
            addData: '',
            date: null,
            selectedOptionTp: [],
            selectedOptionDiscipline: [],
            selectedOptionOwner: [],
            selectedOptionArea: [],
        });
    }

    handleSubmit = () => {
        const disc = this.state.selectedOptionDiscipline;
        const tp = this.state.selectedOptionTp;
        const owner = this.state.selectedOptionOwner;
        const area = this.state.selectedOptionArea;
        if(this.state.issue && this.state.briefsol && this.state.addData && Object.keys(disc).length > 0 && Object.keys(tp).length > 0 && Object.keys(owner).length > 0){
            var data = {
                issue: this.state.issue,
                bcase: this.state.bcase,
                tgrup: this.state.tgrup,
                escost: this.state.escost,
                estime: this.state.estime,
                benefit: this.state.benefit,
                discipline: disc,
                tp: tp,
                date: this.state.date,
                submitter: this.state.submitter,
                owner: owner,
                briefsol: this.state.briefsol,
                addData: this.state.addData,
                area: area,
            }
            Swal.fire({
                title: 'Submit Data',
                text: "Are you sure to submit new Technology?",
                icon: 'warning',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                confirmButtonColor: '#3085d6',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {       
                    this.props.btnSubmit(data);
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

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeSelect = (selectedOptions, key) => {
        this.setState({ [key]: selectedOptions });
    }

    render() {
        const owner = [
            {value: '1', label: 'Didik'},
            {value: '2', label: 'Alif'},
            {value: '3', label: 'Gugun'}
        ]

        const area = [
            {value: '1', label: 'Belida'},
            {value: '2', label: 'Kerisi'},
            {value: '3', label: 'Belanak'},
            {value: '4', label: 'Bawal'},
            {value: '5', label: 'North Belut'},
            {value: '6', label: 'South Belut'},
            {value: '7', label: 'Tembang'}
        ]

        return (
            <Modal isOpen={this.props.modalAdd} toggle={this.handleClick}>
                <ModalHeader toggle={this.handleClick}>Technology Description</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Title</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="issue" value={this.state.issue} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Business Case</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="bcase" value={this.state.bcase} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Tech Grouping</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="tgrup" value={this.state.tgrup} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Facility</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={area} name="selectedOptionArea" value={this.state.selectedOptionArea} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionArea')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Discipline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={discipline} name="selectedOptionDiscipline" value={this.state.selectedOptionDiscipline} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionDiscipline')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Submitter</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="submitter" value={this.state.submitter} onChange={this.onChangeInput} placeholder="" disabled/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Date</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="date" name="date" value={this.state.date} onChange={this.onChangeInput} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Tech Owner</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={owner} name="selectedOptionOwner" value={this.state.selectedOptionOwner} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionOwner')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Tech Principal</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={techPrincipal} name="selectedOptionTp" value={this.state.selectedOptionTp} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionTp')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Estimate Cost</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="escost" value={this.state.escost} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Estimate Timeline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="estime" value={this.state.estime} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Brief of Solution</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="textarea" name="briefsol" value={this.state.briefsol} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Additional Data</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="textarea" name="addData" value={this.state.addData} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Benefits (USD)</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="benefit" value={this.state.benefit} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={this.handleSubmit}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-vine btn-brand btn-sm" onClick={this.handleClear}><i className="icon-eraser2"> </i><span>Clear</span></Button>
                    <Button className="btn-dropbox btn-brand btn-sm" onClick={this.handleClick}><i className="icon-undo2"> </i><span>Cancel</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Add;
