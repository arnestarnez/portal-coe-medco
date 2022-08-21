import React, { Component } from 'react';
import { Col, Row, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import Swal from 'sweetalert2';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issue: '',
            selectedOptionArea: [],
            rca: false,
            fmea: false,
            sc: false
        }
    }

    handleClick = () => {
        this.props.toggleAdd();
    }

    handleClear = () => {
        this.setState({ 
            selectedOptionArea: null,
            rca: false,
            fmea: false,
            sc: false
        });
    }

    handleSubmit = () => {
        if(this.state.issue && this.state.selectedOptionArea && Object.keys(this.state.selectedOptionArea).length > 0){
            var data = {
                issue: this.state.issue,
                area: this.state.selectedOptionArea,
                rca: this.state.rca,
                fmea: this.state.fmea,
                sc: this.state.sc,
            }
            this.props.btnSubmit(data);
        }else{
            Swal.fire({
                title: 'Failed',
                icon: 'warning',
                text: 'Please complete data.',
                showConfirmButton: false,
                timer: 1500
            })
        }
        
    }

    onChangeIssue = (e) => {
        this.setState({ issue: e.target.value });
    }

    onChangeArea = (selectedOptions) => {
        this.setState({ selectedOptionArea: selectedOptions });
    }

    onChangeCB = (e, type) => {
        switch (type) {
            case 'rca':
                this.setState({ rca: e.target.checked });
                break;
            case 'fmea':
                this.setState({ fmea: e.target.checked });
                break;
            case 'sc':
                this.setState({ sc: e.target.checked });
                break;
            default:
                break;
        }
    }

    render() {
        const area = [
            {value: '1', label: 'Block A'},
            {value: '2', label: 'South Natuna Sea Block B'},
            {value: '3', label: 'South Sokang'},
            {value: '4', label: 'South & Central Sumatera'},
            {value: '5', label: 'Rimau'},
            {value: '6', label: 'Lematang'},
            {value: '7', label: 'Bengara'},
            {value: '8', label: 'Tarakan'},
            {value: '9', label: 'Simenggaris'},
            {value: '10', label: 'Bangkanai'},
            {value: '11', label: 'Sampang'},
            {value: '12', label: 'Madura Offshore'},
            {value: '13', label: 'Senoro-Toili'}
        ]

        return (
            <Modal isOpen={this.props.modalAdd} toggle={this.handleClick}>
                <ModalHeader toggle={this.handleClick}>Create New Issue</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Issue</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="issue" value={this.state.issue} onChange={this.onChangeIssue} placeholder="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Area</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={area} value={this.state.selectedOptionArea} onChange={this.onChangeArea} isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Data Context</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                    <Checkbox color="primary" checked={this.state.rca} value={this.state.rca} onChange={(e) => this.onChangeCB(e, 'rca')}/>
                                    }
                                    label="RCA"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox color="primary" checked={this.state.fmea} value={this.state.fmea} onChange={(e) => this.onChangeCB(e, 'fmea')}/>
                                    }
                                    label="FMEA"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox color="primary" checked={this.state.sc} value={this.state.sc} onChange={(e) => this.onChangeCB(e, 'sc')}/>
                                    }
                                    label="SC"
                                />
                            </FormGroup>
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
