import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import descData from '../../../Commons/jsonFile/desc.json';

class Desc extends Component {
    constructor(props) {
        super();
        this.state = {
            contentBody: ''
        }
    }

    componentWillReceiveProps = () => {
        const descId = this.props.passId
        if(descId != 0){
            const arr = descData.filter(row => row.no === descId)
            this.setState({contentBody: arr[0].value})
        }
    }

    handleClick = () => {
        this.props.toggleDesc();
    }

    render() {
        return (
            <Modal isOpen={this.props.modalDesc} toggle={this.handleClick}>
                <ModalHeader toggle={this.handleClick}>Description of {this.props.titleDesc}</ModalHeader>
                <ModalBody>
                    <span>
                        {this.state.contentBody}
                    </span>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-dropbox btn-brand btn-sm" onClick={this.handleClick}><i className="icon-undo2"> </i><span>Back</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Desc;
