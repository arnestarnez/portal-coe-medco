import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button} from 'reactstrap';
import Table2Edit from '../../Commons/Table/Table2Edit';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Add from './Modal/add';
import Filter from './Modal/filter';
import Approve from './Modal/approve';
import Edit from './Modal/edit';
import Rating from './Modal/rating';
import Solution from './Modal/solution';
import sampleData from '../../Commons/jsonFile/sample/preworkCase.json';

class Case extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptionArea: [],
            selectedOptionStatus: [],
            blocking: false,
            modalAdd: false,
            modalFilter: false,
            modalApprove: false,
            modalEdit: false,
            modalRating: false,
            modalSolution: false,
            currentPage: 1,
            sizePerPage: 2,
            passData: [],
            passDataEdit: [],
            passDataSolution: [],
            orgData: [],
            revData: [],
            datas: sampleData,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.setState({orgData: this.state.datas});
    }

    toggleAdd = () => {
        this.setState({ modalAdd: !this.state.modalAdd })
    };

    addSubmitBtn = (data) => {
        var status = 'Pending';
        var labelDiscipline = data.discipline.label;
        var labelArea = data.area.label;
        var labelAset = data.aset.label;
        var labelOwner = data.owner.label;
        var newDatas = [{
            id: this.state.datas.length + 1,
            dt1: labelArea,
            dt2: '',
            dt3: data.issue,
            dt4: '',
            dt5: status,
            dt6: '',
            dt7: '',
            priority: '',
            desc: data.briefcase,
            discipline: labelDiscipline,
            aset: labelAset,
            owner: labelOwner,
            date: data.date,
            submitter: data.submitter
        }];
        newDatas = this.state.datas.concat(newDatas);
        this.setState({datas : newDatas},
            () => {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Case has been submited.',
                    showConfirmButton: false,
                    timer: 2000
                })
                this.toggleAdd();
            }    
        )
    }

    editSubmitBtn = (id, data) => {
        var status = 'Ongoing';
        var lbl_priority = '';
        if(data.priority) {lbl_priority = data.priority.label}
        this.setState({
            datas: this.state.datas.map(el => (el.id === id ? 
                Object.assign(el, { priority: lbl_priority, dt5: status })
                : el))
        },
        () => {
            Swal.fire({
                title: 'Success!',
                icon: 'success',
                text: 'Data has ben submited.',
                showConfirmButton: false,
                timer: 2000
            })
            this.toggleEdit();
        });
    }

    toggleFilter = () => {
        this.setState({ modalFilter: !this.state.modalFilter })
    };

    filterSubmitBtn = (data) => {
        this.setState({
            datas: this.state.orgData,
            selectedOptionArea: data.area,
            selectedOptionOwner: data.owner,
            selectedOptionStatus: data.status
        });
        var newDatas = this.state.orgData;
        var tempDatas = [];
        if(data.area && data.area.length > 0 && data.status && data.status.length > 0 && data.owner && data.owner.length > 0){
            newDatas = [];
            data.area.forEach(row => {
                newDatas = newDatas.concat(this.state.orgData.filter(item => item.dt1 === row.label));
            });
            data.status.forEach(row => {
                newDatas = tempDatas.concat(newDatas.filter(item => item.dt5 === row.label));
            });
            var tempOwner = [];
            data.owner.forEach(row => {
                newDatas = tempOwner.concat(newDatas.filter(item => item.owner === row.label));
            });
        }else if(data.area && data.area.length > 0 && data.status && data.status.length > 0){
            newDatas = [];
            data.area.forEach(row => {
                newDatas = newDatas.concat(this.state.orgData.filter(item => item.dt1 === row.label));
            });
            data.status.forEach(row => {
                newDatas = tempDatas.concat(newDatas.filter(item => item.dt5 === row.label));
            });
        }else if(data.area && data.area.length > 0){
            newDatas = [];
            data.area.forEach(row => {
                newDatas = newDatas.concat(this.state.orgData.filter(item => item.dt1 === row.label));
            });
        }else if(data.status && data.status.length > 0){
            newDatas = [];
            data.status.forEach(row => {
                newDatas = newDatas.concat(this.state.orgData.filter(item => item.dt5 === row.label));
            });
        }else if(data.owner && data.owner.length > 0){
            newDatas = [];
            data.owner.forEach(row => {
                newDatas = newDatas.concat(this.state.orgData.filter(item => item.owner === row.label));
            });
        }
        
        this.setState({datas: newDatas},
            () => {
                this.toggleFilter();
            }    
        )
    }

    toggleApprove = () => {
        this.setState({ modalApprove: !this.state.modalApprove })
    };

    toggleEdit = () => {
        this.setState({ modalEdit: !this.state.modalEdit })
    };

    toggleRating = () => {
        this.setState({ modalRating: !this.state.modalRating })
    };

    toggleSolution = () => {
        this.setState({ modalSolution: !this.state.modalSolution })
    };

    handleApproval = (e, action, id) => {
        console.log(this.state.revData, 'revdata')
        e.preventDefault();
        if(action === 'reject'){
            Swal.fire({
                title: 'Reject Case',
                text: "Are you sure to reject this case?",
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
                            text: 'Case has been rejected.',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        this.toggleApprove();
                    });
                }
            });
        }else{
            Swal.fire({
                title: 'Approve Case',
                text: "Are you sure to approve this case?",
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
                            text: 'Case has been approved.',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        this.toggleApprove();
                    });
                }
            });
        }
    }

    handleRating = (e, id, getData) => {
        e.preventDefault();
        const newArr = this.state.revData.filter((item) => item.id !== id);
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
                    datas: this.state.datas.map(el => (el.id === id ? Object.assign(el, { dt5: 'Waiting Solution' }) : el)),
                    revData: newArr.concat(getData)
                },
                () => {   
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Data already submited!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.toggleRating();
                });
            }
        });
    }

    handleSolution = (e, id, getData) => {
        e.preventDefault();
        let newArr = this.state.datas.filter((item) => item.id === id);
        const elseArr = this.state.datas.filter((item) => item.id !== id);
        newArr[0].dt5 = 'Waiting Approval';
        newArr[0].sct = getData;
        Swal.fire({
            title: 'Submit Solution',
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
                    this.toggleSolution();
                });
            }
        });
    }

    handlePageChange(page, sizePerPage) {
        this.setState({currentPage: page, sizePerPage: sizePerPage})
    }

    handleAction = (e, row, action) => {
        e.preventDefault()
        switch (action) {
            case 'delete':
                this.setState({blocking: true});
                if(row.dt5 === 'Pending') {
                    Swal.fire({
                    title: 'Delete Data',
                    text: "Are you sure to delete this data?",
                    icon: 'warning',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes!',
                    confirmButtonColor: '#3085d6',
                    showCancelButton: true,
                    }).then((result) => {
                        if (result.value) {       
                                this.setState(prevState => ({
                                    datas: prevState.datas.filter(data => data.id !== row.id)
                                }),
                                () => {
                                    Swal.fire({
                                        title: 'Success!',
                                        icon: 'success',
                                        text: 'Delete Success.',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                    .then(() => {})
                                    this.setState({blocking: false});    
                                }
                                );
                        }else{
                            this.setState({blocking: false});
                        }
                    });
                }else{
                    Swal.fire({
                        title: 'Cannot Delete This Data',
                        icon: 'info',
                        text: 'Data has been processed.',
                        showConfirmButton: false
                    })
                    this.setState({blocking: false});    
                }
                break;
            case 'edit':
                if(row.dt5 === 'Pending') {
                    var dataEdit = {
                        issue: row.dt3,
                        area: row.dt1,
                        desc: row.desc,
                        id: row.id,
                        discipline: row.discipline,
                        aset: row.aset,
                        date: row.date,
                        submitter: row.submitter,
                        owner: row.owner
                    }
                    this.setState({passDataEdit: dataEdit})
                    this.toggleEdit()
                }else{
                    Swal.fire({
                        title: 'Already Add Case Description',
                        icon: 'info',
                        text: 'Data already submited.',
                        showConfirmButton: false
                    })
                }
                break;
            case 'rating':
                if(row.dt5 === 'Ongoing') {
                    var dataRating = {
                        issue: row.dt3,
                        area: row.dt1,
                        desc: row.desc,
                        id: row.id,
                        discipline: row.discipline,
                        aset: row.aset,
                        date: row.date,
                        submitter: row.submitter,
                        owner: row.owner,
                        priority: row.priority
                    }
                    this.setState({passData: dataRating})
                    this.toggleRating()
                }else if(row.dt5 === 'Pending'){
                    Swal.fire({
                        title: 'Status Still Pending',
                        icon: 'info',
                        text: 'Waiting Submit Data From Coordinator.',
                        showConfirmButton: false
                    })
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
                if(row.dt5 === 'Waiting Solution') {
                    var dataSolution = {
                        issue: row.dt3,
                        area: row.dt1,
                        desc: row.desc,
                        id: row.id,
                        discipline: row.discipline,
                        aset: row.aset,
                        date: row.date,
                        submitter: row.submitter,
                        owner: row.owner,
                        priority: row.priority,
                        reviewer: this.state.revData.filter(item => item.id === row.id)
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
                        reviewer: this.state.revData.filter(item => item.id === row.id)
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
            default:
                break;
        }
    }

    render() {
        const columns = [
            {
                dataField: '#',
                text: '#',
                headerAlign: 'center',
                align: 'center',
                formatter: (cell, row, rowIndex) => {
                    let rowNumber = (this.state.currentPage - 1) * this.state.sizePerPage + (rowIndex + 1);
                    return <span>{rowNumber}</span>;
                },
                headerStyle: (colum, colIndex) => {
                    return { width: '40px' };
                },
            },
            {
                dataField: 'dt3',
                text: 'Title',
                headerAlign: 'center',
                align: 'left',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '120px' };
                },
            },
            {
                dataField: 'discipline',
                text: 'Discipline',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '120px' };
                },
            },
            {
                dataField: 'dt1',
                text: 'Facility',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '120px' };
                },
            },
            {
                dataField: 'aset',
                text: 'Asset',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '120px' };
                },
            },
            {
                dataField: 'date',
                text: 'Date',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '90px' };
                },
            },
            {
                dataField: 'owner',
                text: 'Owner',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '90px' };
                },
            },
            {
                dataField: 'submitter',
                text: 'Submitter',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '90px' };
                },
            },
            {
                dataField: 'priority',
                text: 'Priority',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '120px' };
                },
            },
            {
                dataField: 'dt5',
                text: 'Status',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                formatter: (cell, row, rowIndex) => {
                    var clr = '#000';
                    var fw = '400';
                    switch (row.dt5) {
                        case 'Reject':
                            clr = 'red';
                            fw = '700';
                            break;
                        case 'Approve':
                            clr = 'green';
                            fw = '700';
                            break;
                        default:
                            break;
                    }
                    return <span style={{color: clr, fontWeight: fw}}>{row.dt5}</span>;
                },
                headerStyle: (colum, colIndex) => {
                    return { width: '120px' };
                },
            },
            {
                dataField: 'dt6',
                text: 'Action',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                isDummyField: true,
                headerStyle: (colum, colIndex) => {
                    return { width: '180px' };
                },
                formatter: (cellContent, row) => {
                    return (
                        <div>
                            <span className="btnInTable">
                                <Button className="btn-google-plus btn-brand btn-sm icon" onClick={(e) => this.handleAction(e, row, 'delete')}><i className="icon-trash-alt"> </i></Button>
                            </span>
                            <span className="btnInTable">
                                <Button className="btn-twitter btn-brand btn-sm icon" onClick={(e) => this.handleAction(e, row, 'edit')}><i className="icon-pencil"> </i></Button>
                            </span>
                            <span className="btnInTable">
                                <Button className="btn-twitter btn-brand btn-sm icon" onClick={(e) => this.handleAction(e, row, 'rating')}><i className="icon-user-plus"> </i></Button>
                            </span>
                            <span className="btnInTable">
                                <Button className="btn-twitter btn-brand btn-sm icon" onClick={(e) => this.handleAction(e, row, 'solution')}><i className="icon-puzzle"> </i></Button>
                            </span>
                            <span className="btnInTable">
                                <Button className="btn-vine btn-brand btn-sm icon" onClick={(e) => this.handleAction(e, row, 'approve')}><i className="icon-file-check"> </i></Button>
                            </span>
                        </div>
                    );
                },
            },
        ];

        return (
            <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.state.blocking}>
                    <Row>
                        <Col xs="12" md="12">
                            <Card style={{marginBottom:'0'}}>
                                <CardBody>
                                    <Row>
                                        <Col md="12">
                                            <div className="titleFilter"><i className="icon-stack"></i> Collected and validated case</div>
                                            <div className="btnAddUpTable">
                                                <Button className="btn-github btn-brand btn-sm" onClick={this.toggleAdd}><i className="icon-file-plus"> </i><span>Create</span></Button>
                                                <Button className="btn-vine btn-brand btn-sm" onClick={this.toggleFilter}><i className="icon-filter4"> </i><span>Filter</span></Button>
                                            </div>
                                            <div className="freeze1">
                                                <Table2Edit
                                                    caption=''
                                                    tableHead={columns}
                                                    datas={this.state.datas}
                                                    handlePageChange={this.handlePageChange}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </BlockUi>
                <Add modalAdd={this.state.modalAdd} toggleAdd={this.toggleAdd} btnSubmit={this.addSubmitBtn}/>
                <Filter modalFilter={this.state.modalFilter} toggleFilter={this.toggleFilter} btnSubmit={this.filterSubmitBtn}/>
                <Approve modalApprove={this.state.modalApprove} toggleApprove={this.toggleApprove} passData={this.state.passData} clickBtnApproval={this.handleApproval}/>
                <Edit modalEdit={this.state.modalEdit} toggleEdit={this.toggleEdit} passDataEdit={this.state.passDataEdit} btnSubmitEdit={this.editSubmitBtn}/>
                <Rating modalRating={this.state.modalRating} toggleRating={this.toggleRating} passData={this.state.passData} clickBtnRating={this.handleRating}/>
                <Solution modalSolution={this.state.modalSolution} toggleSolution={this.toggleSolution} passData={this.state.passDataSolution} clickBtnSolution={this.handleSolution}/>
            </div >
        );
    }
}

export default Case;
