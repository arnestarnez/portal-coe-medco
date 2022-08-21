import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Badge, Button, UncontrolledTooltip} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import dataJson from './dataSolution.json';
import Filter from './Modal/filter';
import Ahp from './Modal/ahp';
import Pugh from './Modal/pugh';
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
            modalAhp: false,
            modalPugh: false,
            modalApprove: false,
            modalPreview: false,
            revData: [
                {id:1, name: 'Abdullah',job: 'Operations',dept: 'Engineer'},
                {id:1, name: 'Ikhwan',job: 'Safety',dept: 'Engineer'},
                {id:1, name: 'Cecep',job: 'Safety',dept: 'Engineer'},
                {id:1, name: 'Hadi',job: 'Engineering',dept: 'Sr Engineer'}
            ],
            extraData: [{id:1, tlname: 'Tommy',tljob: 'Supervisor',tldept: 'Sub Surface',sdate: '2020-11-11',edate: '2020-12-11',venue: 'Sample venue here'}],
            offset: 0,
            data: [],
            passData: [],
            perPage: 8,
            currentPage: 0,
            datas: dataJson,
            dataAhp: [],
            dataPugh: [
                { id: 1, dt1:'Complexity of Implementation',sc1:'',sc2:'',sc3:'5',sc4:'5',sc5:'',sc6:'',sc7:'',dt2:0},
                { id: 2, dt1:'Timeline of Implementation',sc1:'',sc2:'',sc3:'3',sc4:'5',sc5:'',sc6:'',sc7:'',dt2:0},
                { id: 3, dt1:'Technical Supports Resources',sc1:'',sc2:'',sc3:'1',sc4:'3',sc5:'',sc6:'',sc7:'',dt2:0},
                { id: 4, dt1:'Cost',sc1:'',sc2:'',sc3:'3',sc4:'4',sc5:'',sc6:'',sc7:'',dt2:0},
                { id: 5, dt1:'Benefit',sc1:'',sc2:'',sc3:'3',sc4:'3',sc5:'',sc6:'',sc7:'',dt2:0},
                { id: 6, dt1:'Business Reputation',sc1:'',sc2:'',sc3:'1',sc4:'1',sc5:'',sc6:'',sc7:'',dt2:0},
                { id: 7, dt1:'Well Known by Oil and Gas Company',sc1:'',sc2:'',sc3:'1',sc4:'2',sc5:'',sc6:'',sc7:'',dt2:0},
                { id: 8, dt1:'Have Strong Financial Position',sc1:'',sc2:'',sc3:'2',sc4:'2',sc5:'',sc6:'',sc7:'',dt2:0},
                { id: 9, dt1:'Register in Approved Manufacturing List',sc1:'',sc2:'',sc3:'1',sc4:'1',sc5:'',sc6:'',sc7:'',dt2:0},
                { id: 10, dt1:'Local Content Amount (TKDN)',sc1:'',sc2:'',sc3:'4',sc4:'5',sc5:'',sc6:'',sc7:'',dt2:0}
            ],
            sp1: 0, sp2: 0, sp3: 24, sp4: 31,
            sn1: 0, sn2: 0, sn3: 0, sn4: 0,
            colorsn1: 'white',
            colorsn2: 'white',
            colorsn3: 'white',
            colorsn4: 'white'
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    setFooterPugh = (row) => {
        var sp1 = 0, sn1 = 0, sp2 = 0, sn2 = 0, sp3 = 0, sn3 = 0, sp4 = 0, sn4 = 0
        for (let index = 0; index < this.state.dataPugh.length; index++) {            
            sp1 = sp1+parseFloat(this.state.dataPugh[index].sc1 !== '' ? this.state.dataPugh[index].sc1 : 0)
            sp2 = sp2+parseFloat(this.state.dataPugh[index].sc2 !== '' ? this.state.dataPugh[index].sc2 : 0)
            sp3 = sp3+parseFloat(this.state.dataPugh[index].sc3 !== '' ? this.state.dataPugh[index].sc3 : 0)
            sp4 = sp4+parseFloat(this.state.dataPugh[index].sc4 !== '' ? this.state.dataPugh[index].sc4 : 0)

            sn1 = sn1+parseFloat(this.state.dataPugh[index].sc1 !== '' ? this.state.dataPugh[index].sc1*this.state.dataPugh[index].dt2 : 0)
            sn2 = sn2+parseFloat(this.state.dataPugh[index].sc2 !== '' ? this.state.dataPugh[index].sc2*this.state.dataPugh[index].dt2 : 0)
            sn3 = sn3+parseFloat(this.state.dataPugh[index].sc3 !== '' ? this.state.dataPugh[index].sc3*this.state.dataPugh[index].dt2 : 0)
            sn4 = sn4+parseFloat(this.state.dataPugh[index].sc4 !== '' ? this.state.dataPugh[index].sc4*this.state.dataPugh[index].dt2 : 0)
        }
        if(sn4 > sn1 && sn4 > sn2 && sn4 > sn3){
            this.setState({colorsn4: 'yellow'})
        }else{
            this.setState({colorsn4: 'white'})
        } 
        if(sn3 > sn1 && sn3 > sn2 && sn3 > sn4){
            this.setState({colorsn3: 'yellow'})
        }else{
            this.setState({colorsn3: 'white'})
        }
        if(sn2 > sn1 && sn2 > sn3 && sn2 > sn4){
            this.setState({colorsn2: 'yellow'})
        }else{
            this.setState({colorsn2: 'white'})
        }
        if(sn1 > sn2 && sn1 > sn3 && sn1 > sn4){
            this.setState({colorsn1: 'yellow'})
        }else{
            this.setState({colorsn1: 'white'})
        }
        this.setState({sp1: sp1, sp2: sp2, sp3: sp3, sp4: sp4, sn1: sn1, sn2: sn2, sn3: sn3, sn4: sn4})
    }

    updatePugh = (getData) => {
        let dataPugh = this.state.dataPugh
        getData.map(item => {
            dataPugh.map(el => (el.id === item.id ? Object.assign(el, { dt2: item.sc5 }) : el))
        })
        dataPugh.map(row => this.setFooterPugh(row))
    }

    toggleAhp = () => {
        this.setState({ modalAhp: !this.state.modalAhp })
    };

    ahpSubmitBtn = (e, id, getData) => {
        e.preventDefault();
        const newArr = this.state.revData.filter((item) => item.id !== id);
        const dtArr = this.state.extraData.filter((item) => item.id !== id);
        Swal.fire({
            title: 'Submit AHP',
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
                    dataAhp: getData
                },
                () => {   
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Data already submited!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.toggleAhp();
                    this.receivedData();
                    this.updatePugh(getData);
                });
            }
        });
    }

    togglePugh = () => {
        this.setState({ modalPugh: !this.state.modalPugh })
    };

    pughSubmitBtn = (e, id, data, footer) => {
        e.preventDefault();
        const newArr = this.state.revData.filter((item) => item.id !== id);
        const dtArr = this.state.extraData.filter((item) => item.id !== id);
        Swal.fire({
            title: 'Submit Pugh Matrix',
            text: "Are you sure to submit?",
            icon: 'question',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {    
                this.setState({
                    datas: this.state.datas.map(el => (el.id === id ? Object.assign(el, { dt5: 'Waiting Approval' }) : el)),
                    dataPugh : data,
                    sp1: footer.sp1, sp2: footer.sp2, sp3: footer.sp3, sp4: footer.sp4,
                    sn1: footer.sn1, sn2: footer.sn2, sn3: footer.sn3, sn4: footer.sn4,
                    colorsn1: footer.colorsn1,
                    colorsn2: footer.colorsn2,
                    colorsn3: footer.colorsn3,
                    colorsn4: footer.colorsn4
                },
                () => {   
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Data already submited!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.togglePugh();
                    this.receivedData();
                });
            }
        });
    }

    toggleApprove = () => {
        this.setState({ modalApprove: !this.state.modalApprove })
    };

    handleApproval = (e, action, id) => {
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
            case 'ahp':
                if(row.dt5 === 'New') {
                    console.log(this.state.datas, 'datas')
                    var data = {
                        data: this.state.datas.filter(item => item.id === row.id),
                        reviewer: this.state.revData.filter(item => item.id === row.id),
                        extradata: this.state.extraData.filter(item => item.id === row.id)
                    }
                    this.setState({passData: data})
                    this.toggleAhp()
                }else{
                    Swal.fire({
                        title: 'Already Add Reviewer',
                        icon: 'info',
                        text: 'Data already submited.',
                        showConfirmButton: false
                    })
                }
                break;
            case 'pugh':
                if(row.dt5 === 'Pending') {
                    var data = {
                        data: this.state.datas.filter(item => item.id === row.id),
                        reviewer: this.state.revData.filter(item => item.id === row.id),
                        extradata: this.state.extraData.filter(item => item.id === row.id),
                        dpugh: this.state.dataPugh,
                        sp1: this.state.sp1, sp2: this.state.sp2, sp3: this.state.sp3, sp4: this.state.sp4,
                        sn1: this.state.sn1, sn2: this.state.sn2, sn3: this.state.sn3, sn4: this.state.sn4,
                        colorsn1: this.state.colorsn1, colorsn2: this.state.colorsn2, colorsn3: this.state.colorsn3, colorsn4: this.state.colorsn4,
                    }
                    this.setState({passData: data})
                    this.togglePugh()
                }else if(row.dt5 === 'Waiting Approval' || row.dt5 === 'Approved' || row.dt5 === 'Reject'){
                    Swal.fire({
                        title: 'Already Submit Pugh Matrix',
                        icon: 'info',
                        text: 'Data already submited.',
                        showConfirmButton: false
                    })
                }else{
                    Swal.fire({
                        title: 'Data On Progress',
                        icon: 'info',
                        text: 'Submit Pugh Matrix After AHP Complete.',
                        showConfirmButton: false
                    })
                }
                break;
            case 'approve':
                console.log(this.state.dataPugh, 'datas')
                if(row.dt5 === 'Waiting Approval') {
                    var data = {
                        data: this.state.datas.filter(item => item.id === row.id),
                        reviewer: this.state.revData.filter(item => item.id === row.id),
                        extradata: this.state.extraData.filter(item => item.id === row.id),
                        dpugh: this.state.dataPugh,
                        sp1: this.state.sp1, sp2: this.state.sp2, sp3: this.state.sp3, sp4: this.state.sp4,
                        sn1: this.state.sn1, sn2: this.state.sn2, sn3: this.state.sn3, sn4: this.state.sn4,
                        colorsn1: this.state.colorsn1, colorsn2: this.state.colorsn2, colorsn3: this.state.colorsn3, colorsn4: this.state.colorsn4,
                    }
                    this.setState({passData: data})
                    this.toggleApprove()
                }else if(row.dt5 === 'Approve' || row.dt5 === 'Reject') {
                    Swal.fire({
                        title: 'Process Complete',
                        icon: 'info',
                        text: 'Already Submit.',
                        showConfirmButton: false
                    })
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
                var data = {
                    data: this.state.datas.filter(item => item.id === row.id),
                    reviewer: this.state.revData.filter(item => item.id === row.id),
                    extradata: this.state.extraData.filter(item => item.id === row.id),
                    dpugh: this.state.dataPugh,
                    sp1: this.state.sp1, sp2: this.state.sp2, sp3: this.state.sp3, sp4: this.state.sp4,
                    sn1: this.state.sn1, sn2: this.state.sn2, sn3: this.state.sn3, sn4: this.state.sn4,
                    colorsn1: this.state.colorsn1, colorsn2: this.state.colorsn2, colorsn3: this.state.colorsn3, colorsn4: this.state.colorsn4,
                }
                this.setState({passData: data})
                this.togglePreview()
                break;
            default:
                break;
        }
    }

    receivedData() {
        const data = dataJson;
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
                                    {row.issue}<br/>
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
                                <div className="cbbtn1"><Button className="btn-vine btn-brand btn-sm" id="btn1" onClick={(e) => this.handleAction(e, row, 'ahp')}><i className="icon-file-text2"></i></Button></div>
                                <UncontrolledTooltip placement="top" target="btn1">
                                    AHP
                                </UncontrolledTooltip>
                                <div className="cbbtn2"><Button className="btn-vine btn-brand btn-sm" id="btn2" onClick={(e) => this.handleAction(e, row, 'pugh')}><i className="icon-file-text2"></i></Button></div>
                                <UncontrolledTooltip placement="top" target="btn2">
                                    Pugh Matrix
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
        console.log(this.state.datas, 'datas')
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
                                            <div className="titleFilter"><i className="icon-stack"></i> Evaluate and select technology</div>
                                            <div style={{float:'left'}}>
                                                <div style={{float:'left'}}><span style={{fontSize:'24px'}}><b style={{color:'#134A71'}}>1</b> Technology |</span></div>
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
                <Ahp modalAhp={this.state.modalAhp} toggleAhp={this.toggleAhp} passData={this.state.passData} btnSubmitAhp={this.ahpSubmitBtn}/>
                <Pugh modalPugh={this.state.modalPugh} togglePugh={this.togglePugh} passData={this.state.passData} btnSubmitPugh={this.pughSubmitBtn}/>
                <Approve modalApprove={this.state.modalApprove} toggleApprove={this.toggleApprove} passData={this.state.passData} clickBtnApproval={this.handleApproval}/>
                <Preview modalPreview={this.state.modalPreview} togglePreview={this.togglePreview} passData={this.state.passData}/>
            </div >
        );
    }
}

export default Solution;