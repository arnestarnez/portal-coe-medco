import React, { Component } from 'react';
import { Col, Row, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import Select from 'react-select';
import Swal from 'sweetalert2';
import discipline from '../../../Commons/jsonFile/discipline.json'
import aset from '../../../Commons/jsonFile/aset.json'

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issue: '',
            briefcase: '',
            submitter: localStorage.getItem('name'),
            date: null,
            selectedOptionArea: [],
            selectedOptionDiscipline: [],
            selectedOptionOwner: [],
            asetDisable: true,
            asetOption: [],
            selectedOptionAset: [],
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
            briefcase: '',
            date: null,
            selectedOptionArea: [],
            selectedOptionDiscipline: [],
            selectedOptionOwner: [],
            asetDisable: true,
            asetOption: [],
            selectedOptionAset: [],
        });
    }

    handleSubmit = () => {
        const disc = this.state.selectedOptionDiscipline;
        const area = this.state.selectedOptionArea;
        const aset = this.state.selectedOptionAset;
        const owner = this.state.selectedOptionOwner;
        if(this.state.issue && this.state.briefcase && Object.keys(disc).length > 0 && Object.keys(area).length > 0 && Object.keys(aset).length > 0 && Object.keys(owner).length > 0){
            var data = {
                issue: this.state.issue,
                discipline: disc,
                area: area,
                aset: aset,
                date: this.state.date,
                submitter: this.state.submitter,
                owner: owner,
                briefcase: this.state.briefcase
            }
            Swal.fire({
                title: 'Submit Data',
                text: "Are you sure to submit new Case?",
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
        if(key==="selectedOptionArea"){
            let asets = [];
            aset.filter(row => {
                if(selectedOptions && row.facility === selectedOptions.label){
                    asets.push(row)
                }
                return null
            })
            if(asets.length > 0){
                this.setState({ asetOption: asets, asetDisable: false})
            }else{
                this.setState({ asetOption: [], selectedOptionAset: [], asetDisable: true})
            }
        }
        this.setState({ [key]: selectedOptions });
    }

    render() {
        const area = [
            {value: '1', label: 'Belida'},
            {value: '2', label: 'Kerisi'},
            {value: '3', label: 'Belanak'},
            {value: '4', label: 'Bawal'},
            {value: '5', label: 'North Belut'},
            {value: '6', label: 'South Belut'},
            {value: '7', label: 'Tembang'}
        ]

        const owner = [
            {value: '1', label: 'Bagus'},
            {value: '2', label: 'Adi'},
            {value: '3', label: 'Dani'}
        ]

        return (
            <Modal isOpen={this.props.modalAdd} toggle={this.handleClick}>
                <ModalHeader toggle={this.handleClick}>Case Description</ModalHeader>
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
                            <Label className="labelForm">Discipline</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={discipline} name="selectedOptionDiscipline" value={this.state.selectedOptionDiscipline} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionDiscipline')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
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
                            <Label className="labelForm">Asset Name</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select isDisabled={this.state.asetDisable} options={this.state.asetOption} name="selectedOptionAset" value={this.state.selectedOptionAset} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionAset')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Date</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="date" name="date" defaultValue={this.state.date} onChange={this.onChangeInput} />
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
                            <Label className="labelForm">Process Owner</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={owner} name="selectedOptionOwner" value={this.state.selectedOptionOwner} onChange={(selectedOption) => this.onChangeSelect(selectedOption, 'selectedOptionOwner')} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Brief of Case</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="textarea" name="briefcase" value={this.state.briefcase} onChange={this.onChangeInput} placeholder="" />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={this.handleSubmit}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-vine btn-brand btn-sm" onClick={this.handleClear}><i className="icon-eraser2"> </i><span>Clear</span></Button>
                    <Button className="btn-google-plus btn-brand btn-sm" onClick={this.handleClick}><i className="icon-cross2"> </i><span>Cancel</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Add;
