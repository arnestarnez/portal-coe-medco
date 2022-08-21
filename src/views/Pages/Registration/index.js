import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import caseImg from '../../../assets/img/case.png';
import solutionImg from '../../../assets/img/solution.png';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocking: false
        };        // this.handleClick = this.handleClick.bind(this);

    }

    handleClick = (e, param) => {
        e.preventDefault()
        switch (param) {
            case 'solution':
                this.props.history.push('/registration/solution');
                break;
            default:
                this.props.history.push('/registration/case');
                break;
        }
    }

    render() {
        return (
            <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.state.blocking}>
                    <div style={{minHeight:'calc(100vh - 115px)', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                        <Row>
                            <Col className="d-none d-md-block" md="2"></Col>
                            <Col xs="12" sm="6" md="4">
                                <div className="card-content">
                                    <div className="card-img">
                                        <img src={caseImg} style={{width:'100%'}} alt="" />
                                    </div>
                                    <div className="card-desc">
                                        <h2>Case</h2>
                                        <p>
                                            • Total Registered Cases: <b>15</b><br/>
                                            • Pending Cases on Registration: <b>14</b>
                                        </p>
                                        <a href="/#" onClick={(e) => this.handleClick(e, 'case')} className="btn-card">Open</a>   
                                    </div>
                                </div>
                            </Col>
                            <Col xs="12" sm="6" md="4">
                                <div className="card-content">
                                    <div className="card-img">
                                        <img src={solutionImg} style={{width:'100%'}} alt="" />
                                    </div>
                                    <div className="card-desc">
                                        <h2>Solution</h2>
                                        <p>
                                            • Total Registered Solutions: <b>10</b><br/>
                                            • Pending Solutions on Registration: <b>5</b>
                                        </p>
                                        <a href="/#" onClick={(e) => this.handleClick(e, 'solution')} className="btn-card">Open</a>   
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </BlockUi>
            </div >
        );
    }
}

export default Registration;
