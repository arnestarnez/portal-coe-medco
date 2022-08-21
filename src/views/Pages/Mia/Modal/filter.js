import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import Select from 'react-select';
import techPrincipal from '../../../Commons/jsonFile/techPrincipal.json'

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptionTp: [],
            selectedOptionOwner: [],
            selectedOptionStatus: [],
        }
    }

    handleClick = () => {
        this.props.toggleFilter();
    }

    handleClear = () => {
        this.setState({ 
            selectedOptionTp: null,
            selectedOptionOwner: null,
            selectedOptionStatus: null,
        });
    }

    handleSubmit = () => {
        var data = {
            tp: this.state.selectedOptionTp,
            owner: this.state.selectedOptionOwner,
            status: this.state.selectedOptionStatus,
        }
        this.props.btnSubmit(data);
    }

    onChangeTp = (selectedOptions) => {
        this.setState({ selectedOptionTp: selectedOptions });
    }

    onChangeTypeIssue = (selectedOptions) => {
        this.setState({ selectedOptionTypeIssue: selectedOptions });
    }

    onChangeOwner = (selectedOptions) => {
        this.setState({ selectedOptionOwner: selectedOptions });
    }

    onChangeStatus = (selectedOptions) => {
        this.setState({ selectedOptionStatus: selectedOptions });
    }

    render() {
        const owner = [
            {value: '1', label: 'Didik'},
            {value: '2', label: 'Alif'},
            {value: '3', label: 'Gungun'}
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

        const status = [
            {value: '1', label: 'Approved'},
            {value: '2', label: 'Reject'},
            {value: '3', label: 'Pending'},
            {value: '4', label: 'Ongoing'},
            {value: '5', label: 'Waiting Solution'},
            {value: '6', label: 'Waiting Approval'}
        ]

        return (
            <Modal isOpen={this.props.modalFilter} toggle={this.handleClick}>
                <ModalHeader toggle={this.handleClick}>Filter Data</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Tech Principal</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={techPrincipal} value={this.state.selectedOptionTp} onChange={this.onChangeTp} isMulti isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Owner</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={owner} value={this.state.selectedOptionOwner} onChange={this.onChangeOwner} isMulti isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Status</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Select options={status} value={this.state.selectedOptionStatus} onChange={this.onChangeStatus} isMulti isClearable styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} menuPortalTarget={document.body} />
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

export default Filter;
