import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import Select from 'react-select';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptionStatus: [],
        }
    }

    handleClick = () => {
        this.props.toggleFilter();
    }

    onChangeStatus = (selectedOptions) => {
        this.setState({ selectedOptionStatus: selectedOptions });
    }

    render() {
        const status = [
            {value: '1', label: 'New'},
            {value: '2', label: 'Pending'},
            {value: '3', label: 'Ongoing'},
            {value: '4', label: 'Approve'}
        ]

        return (
            <Modal isOpen={this.props.modalFilter} toggle={this.handleClick}>
                <ModalHeader toggle={this.handleClick}>Filter Data</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Search Text</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Input type="text" name="search" value={this.state.issue} placeholder="" />
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
                    <Button className="btn-vine btn-brand btn-sm" onClick={this.handleClick}><i className="icon-checkmark4"> </i><span>Submit</span></Button>
                    <Button className="btn-vine btn-brand btn-sm"><i className="icon-eraser2"> </i><span>Clear</span></Button>
                    <Button className="btn-google-plus btn-brand btn-sm" onClick={this.handleClick}><i className="icon-cross2"> </i><span>Cancel</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Filter;
