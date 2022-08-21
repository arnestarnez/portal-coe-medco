import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import caseImg from '../../../assets/img/case.png';
import solutionImg from '../../../assets/img/solution.png';

class Track extends Component {
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
                this.props.history.push('/cessation/solution');
                break;
            default:
                this.props.history.push('/cessation/case');
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
                                        <h3>Track & Monitoring Case</h3>
                                        <p>
                                            • Owner Cases<br/>
                                            • Impact Rating Cases<br/>
                                            • Prioritization Case<br />
                                            • Facility Case<br />
                                            • Prework Case Status<br />
                                            • Register Case Status<br />
                                        </p>
                                    </div>
                                    <div className="card-desc">
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
                                        <h3 style={{fontSize:'17px'}}>Track & Monitoring Solutions</h3>
                                        <p>
                                            • Owner Solustion<br/>
                                            • Impact Rating Solustion<br/>
                                            • Prioritization Solution<br />
                                            • Facility Solution<br />
                                            • Prework Solution Status<br />
                                            • Register Solution Status<br />
                                        </p>
                                    </div>
                                    <div className="card-desc">
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

export default Track;
