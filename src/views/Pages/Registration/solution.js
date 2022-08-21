import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Badge, Button, UncontrolledTooltip} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import dataJson from './dataSolution.json';
import Filter from './Modal/filter';
import Edit from './Modal/edit';
import ModalSolution from './Modal/solution';
import Approve from './Modal/approve';
import Preview from './Modal/preview';

class Solution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocking: false,
            open: false,
            collapse: true,
            fadeIn: true,
            modalFilter: false,
            modalEdit: false,
            modalSolution: false,
            modalApprove: false,
            modalPreview: false,
            passData: [],
            offset: 0,
            datas: dataJson,
            data: [],
            revData: [
                {id:1, name: 'Abdullah',job: 'Operations',dept: 'Engineer'},
                {id:1, name: 'Ikhwan',job: 'Safety',dept: 'Engineer'},
                {id:1, name: 'Cecep',job: 'Safety',dept: 'Engineer'},
                {id:1, name: 'Hadi',job: 'Engineering',dept: 'Sr Engineer'}
            ],
            extraData: [{id:1, tlname: 'Tommy',tljob: 'Supervisor',tldept: 'Sub Surface',sdate: '2020-11-11',edate: '2020-12-11',venue: 'Sample venue here'}],
            passDataSolution: [],
            perPage: 8,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    toggleEdit = () => {
        this.setState({ modalEdit: !this.state.modalEdit })
    };

    editSubmitBtn = (e, id, getData, extraData) => {
        console.log(extraData, 'exdata edit')
        e.preventDefault();
        const newArr = this.state.revData.filter((item) => item.id !== id);
        const dtArr = this.state.extraData.filter((item) => item.id !== id);
        Swal.fire({
            title: 'Submit Reviewer',
            text: "Are you sure to submit?",
            icon: 'question',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {    
                this.setState({
                    datas: this.state.datas.map(el => (el.id === id ? Object.assign(el, { dt5: 'Pending' }) : el)),
                    revData: newArr.concat(getData),
                    extraData: dtArr.concat(extraData)
                },
                () => {   
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Data already submited!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.toggleEdit();
                    this.receivedData();
                });
            }
        });
    }

    toggleSolution = () => {
        this.setState({ modalSolution: !this.state.modalSolution })
    };

    handleSolution = (e, id, getData) => {
        e.preventDefault();
        let newArr = this.state.datas.filter((item) => item.id === id);
        const elseArr = this.state.datas.filter((item) => item.id !== id);
        newArr[0].dt5 = 'Waiting Approval';
        newArr[0].sct = getData;
        Swal.fire({
            title: 'Submit Assessment',
            text: "Are you sure to submit?",
            icon: 'question',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {    
                this.setState({
                    datas: newArr.concat(elseArr)
                },
                () => {   
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Data already submited, waiting approval!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.receivedData();
                    this.toggleSolution();
                });
            }
        });
    }

    toggleApprove = () => {
        this.setState({ modalApprove: !this.state.modalApprove })
    };

    handleApproval = (e, action, id) => {
        console.log(this.state.revData, 'revdata')
        e.preventDefault();
        if(action === 'reject'){
            Swal.fire({
                title: 'Reject Technology',
                text: "Are you sure to reject this Technology?",
                icon: 'warning',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                confirmButtonColor: '#3085d6',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {       
                    this.setState({
                        datas: this.state.datas.map(el => (el.id === id ? Object.assign(el, { dt5: 'Reject' }) : el))
                    },
                    () => {
                        Swal.fire({
                            title: 'Success!',
                            icon: 'success',
                            text: 'Technology has been rejected.',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        this.receivedData();
                        this.toggleApprove();
                    });
                }
            });
        }else{
            Swal.fire({
                title: 'Approve Technology',
                text: "Are you sure to approve this Technology?",
                icon: 'question',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                confirmButtonColor: '#3085d6',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {    
                    this.setState({
                        datas: this.state.datas.map(el => (el.id === id ? Object.assign(el, { dt5: 'Approve' }) : el))
                    },
                    () => {   
                        Swal.fire({
                            title: 'Success!',
                            icon: 'success',
                            text: 'Technology has been approved.',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        this.receivedData();
                        this.toggleApprove();
                    });
                }
            });
        }
    }

    togglePreview = () => {
        this.setState({ modalPreview: !this.state.modalPreview })
    };

    handleAction = (e, row, action) => {
        e.preventDefault()
        switch (action) {
            case 'edit':
                if(row.dt5 === 'New') {
                    var dataEdit = {
                        issue: row.dt3,
                        area: row.area,
                        bcase: row.bcase,
                        tgrup: row.tgrup,
                        escost: row.escost,
                        estime: row.estime,
                        benefit: row.benefit,
                        tp: row.tp,
                        id: row.id,
                        discipline: row.discipline,
                        date: row.date,
                        submitter: row.submitter,
                        briefsol: row.briefsol,
                        addData: row.addData,
                        owner: row.owner,
                        impact: row.impact,
                        valueAdd: row.valueAdd,
                        priority: row.priority
                    }
                    this.setState({passData: dataEdit})
                    this.toggleEdit()
                }else{
                    Swal.fire({
                        title: 'Already Add Reviewer',
                        icon: 'info',
                        text: 'Data already submited.',
                        showConfirmButton: false
                    })
                }
                break;
            case 'solution':
                if(row.dt5 === 'Pending') {
                    var dataSolution = {
                        issue: row.dt3,
                        area: row.area,
                        bcase: row.bcase,
                        tgrup: row.tgrup,
                        escost: row.escost,
                        estime: row.estime,
                        benefit: row.benefit,
                        tp: row.tp,
                        id: row.id,
                        discipline: row.discipline,
                        date: row.date,
                        submitter: row.submitter,
                        briefsol: row.briefsol,
                        addData: row.addData,
                        owner: row.owner,
                        impact: row.impact,
                        valueAdd: row.valueAdd,
                        priority: row.priority,
                        reviewer: this.state.revData.filter(item => item.id === row.id),
                        extradata: this.state.extraData.filter(item => item.id === row.id)
                    }
                    this.setState({passDataSolution: dataSolution})
                    this.toggleSolution()
                }else if(row.dt5 === 'Waiting Approval' || row.dt5 === 'Approved' || row.dt5 === 'Reject'){
                    Swal.fire({
                        title: 'Already Add Solution',
                        icon: 'info',
                        text: 'Data already submited.',
                        showConfirmButton: false
                    })
                }else{
                    Swal.fire({
                        title: 'Data On Progress',
                        icon: 'info',
                        text: 'Submit Solution After Assign Reviewer Complete.',
                        showConfirmButton: false
                    })
                }
                break;
            case 'approve':
                console.log(this.state.datas, 'datas')
                if(row.dt5 === 'Waiting Approval') {
                    var data = {
                        data: this.state.datas.filter(item => item.id === row.id),
                        reviewer: this.state.revData.filter(item => item.id === row.id),
                        extradata: this.state.extraData.filter(item => item.id === row.id)
                    }
                    this.setState({passData: data})
                    this.toggleApprove()
                }else{
                    Swal.fire({
                        title: 'Data Not Complete',
                        icon: 'info',
                        text: 'Wait Until Process Data Complete.',
                        showConfirmButton: false
                    })
                }
                break;
            case 'preview':
                console.log(this.state.datas, 'dataspreview')
                var data = {
                    data: this.state.datas.filter(item => item.id === row.id),
                    reviewer: this.state.revData.filter(item => item.id === row.id),
                    extradata: this.state.extraData.filter(item => item.id === row.id)
                }
                this.setState({passData: data})
                this.togglePreview()
                break;
            default:
                break;
        }
    }

    receivedData() {
        const data = this.state.datas;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(row => 
            <React.Fragment key={row.id}>
                <Col xs="6" lg="3">
                    <div>
                        <Card>
                            <CardBody className="customBox">
                                <div className="cbnumber">
                                    {row.id}
                                    <Badge style={{backgroundColor: 'white'}}>{row.priority}</Badge>
                                </div>
                                <div className="cbissue">
                                    {row.dt3}<br/>
                                    <span className="cbdesc">{row.bcase}</span><br/>
                                    <span className="cbdesc">{row.benefit} (USD)</span><br/>
                                    <span className="cbdate">{row.date}</span>
                                </div>
                                <div>
                                    <Badge color={(() => {
                                        switch (row.dt5) {
                                            case "New":   return "secondary";
                                            case "Pending": return "primary";
                                            case "Waiting Approval": return "warning";
                                            case "Reject": return "danger"
                                            default:      return "success";
                                        }
                                    })()}>{row.dt5}</Badge>
                                </div>
                                <div className="cbbtn1"><Button className="btn-vine btn-brand btn-sm" id="btn1" onClick={(e) => this.handleAction(e, row, 'edit')}><i className="icon-users2"></i></Button></div>
                                <UncontrolledTooltip placement="top" target="btn1">
                                    Assign Reviewer
                                </UncontrolledTooltip>
                                <div className="cbbtn2"><Button className="btn-vine btn-brand btn-sm" id="btn2" onClick={(e) => this.handleAction(e, row, 'solution')}><i className="icon-file-text2"></i></Button></div>
                                <UncontrolledTooltip placement="top" target="btn2">
                                    Tech Assessment
                                </UncontrolledTooltip>
                                <div className="cbbtn3"><Button className="btn-vine btn-brand btn-sm" id="btn3" onClick={(e) => this.handleAction(e, row, 'approve')}><i className="icon-file-check"></i></Button></div>
                                <UncontrolledTooltip placement="top" target="btn3">
                                    Approval
                                </UncontrolledTooltip>
                                <div className="cbbtn4"><Button className="btn-vine btn-brand btn-sm" id="btn4" onClick={(e) => this.handleAction(e, row, 'preview')}><i className="icon-search4"></i></Button></div>
                                <UncontrolledTooltip placement="top" target="btn4">
                                    Preview
                                </UncontrolledTooltip>
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
                                            <div className="titleFilter"><i className="icon-stack"></i> Identify and recognize technology</div>
                                            <div style={{float:'left'}}>
                                                <div style={{float:'left'}}><span style={{fontSize:'24px'}}><b style={{color:'#134A71'}}>3</b> Technology |</span></div>
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
                <Edit modalEdit={this.state.modalEdit} toggleEdit={this.toggleEdit} passData={this.state.passData} btnSubmitEdit={this.editSubmitBtn}/>
                <ModalSolution modalSolution={this.state.modalSolution} toggleSolution={this.toggleSolution} passData={this.state.passDataSolution} clickBtnSolution={this.handleSolution}/>
                <Approve modalApprove={this.state.modalApprove} toggleApprove={this.toggleApprove} passData={this.state.passData} clickBtnApproval={this.handleApproval}/>
                <Preview modalPreview={this.state.modalPreview} togglePreview={this.togglePreview} passData={this.state.passData}/>
            </div >
        );
    }
}

export default Solution;
