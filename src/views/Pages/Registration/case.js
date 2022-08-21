import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Badge, Button} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ReactPaginate from 'react-paginate';
import dataJson from './data.json';
import Filter from './Modal/filter';

class Case extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocking: false,
            open: false,
            collapse: true,
            fadeIn: true,
            modalFilter: false,
            offset: 0,
            data: [],
            perPage: 8,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    receivedData() {
        
        const data = dataJson;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(row => 
            <React.Fragment key={row.id}>
                <Col xs="6" lg="3">
                    <div onClick={() => {this.props.history.push({
                            pathname: '/registration/case/action',
                            id: row.id,
                            })}} >
                        <Card>
                            <CardBody className="customBox">
                                <div className="cbnumber">
                                    {row.id}
                                    <Badge style={{backgroundColor: 'white'}}>{row.priority}</Badge>
                                    {/* <Badge color={(() => {
                                        switch (row.status) {
                                            case "New":   return "success";
                                            case "Pending": return "danger";
                                            default:      return "primary";
                                        }
                                    })()}>{row.status}</Badge> */}
                                </div>
                                <div className="cbissue">
                                    {row.issue}<br/>
                                    <span className="cbdesc">{row.desc}</span>
                                </div>
                                <div>
                                    <Badge color={(() => {
                                        switch (row.status) {
                                            case "New":   return "success";
                                            case "Pending": return "danger";
                                            default:      return "primary";
                                        }
                                    })()}>{row.status}</Badge>
                                </div>
                                <div className="cbdate">{row.date}</div>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </React.Fragment>
        )

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            postData
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    toggleFilter = () => {
        this.setState({ modalFilter: !this.state.modalFilter })
    };

    componentDidMount() {
        this.receivedData()
    }

    render() {
        return (
            <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.state.blocking}>
                    <Row>
                        <Col xs="12" md="12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md="12">
                                            <div className="titleFilter"><i className="icon-stack"></i> Identify and recognize issue</div>
                                            <div style={{float:'left'}}>
                                                <div style={{float:'left'}}><span style={{fontSize:'24px'}}><b style={{color:'#134A71'}}>14</b> Case |</span></div>
                                                <div style={{float:'left', marginTop:'8px'}}><span style={{marginLeft:'10px', lineHeight: '24px'}}>Page {this.state.currentPage+1 + '/' + this.state.pageCount}</span></div>
                                            </div>
                                            <div style={{float:'left', marginLeft:'15px', marginTop:'8px'}}>
                                                <Button className="btn-vine btn-brand btn-sm" onClick={this.toggleFilter}><i className="icon-filter4"> </i></Button>
                                            </div>
                                            <ReactPaginate
                                                previousLabel={"<"}
                                                nextLabel={">"}
                                                breakLabel={"..."}
                                                breakClassName={"break-me"}
                                                pageCount={this.state.pageCount}
                                                marginPagesDisplayed={0}
                                                pageRangeDisplayed={3}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination paginationx"}
                                                subContainerClassName={"pages paginationx"}
                                                activeClassName={"active"}/>
                                            <Row>
                                                {this.state.postData}
                                            </Row>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </BlockUi>
                <Filter modalFilter={this.state.modalFilter} toggleFilter={this.toggleFilter} btnSubmit={this.filterSubmitBtn}/>
            </div >
        );
    }
}

export default Case;
