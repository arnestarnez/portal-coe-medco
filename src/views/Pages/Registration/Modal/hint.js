import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import hintData from '../../../Commons/jsonFile/hint.json';

class Hint extends Component {
    constructor(props) {
        super();
        this.state = {
            contentBody: ''
        }
    }

    componentWillReceiveProps = () => {
        const hintId = this.props.passId
        if(hintId != 0){
            const arr = hintData.filter(row => row.no === hintId)
            this.setState({contentBody: arr[0].value})
        }
    }

    handleClick = () => {
        this.props.toggleHint();
    }

    render() {
        return (
            <Modal isOpen={this.props.modalHint} toggle={this.handleClick}>
                <ModalHeader toggle={this.handleClick}>Hint Question of {this.props.titleHint}</ModalHeader>
                <ModalBody>
                    <span style={{whiteSpace: 'pre-line',verticalAlign: 'bottom'}}>
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

export default Hint;
