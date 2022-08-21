import React, { Component } from 'react';
import { Col, Row, Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import ReactGantt from 'gantt-for-react';
import Table2Edit from '../../../Commons/Table/Table2Schedule';

class Approve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [
                { id: 1, dt1: 'Alternatif 1', dt2: true, dt3: 'Initiate', dt4: 'Rp. 210.000.000', dt5: 'Pending', dt6: true, dt7: '2020-07-16', dt8: '2020-07-23', dt9: '7' },
                { id: 2, dt1: 'Alternatif 5', dt2: true, dt3: 'Design', dt4: 'Rp. 146.000.000', dt5: 'Pending', dt6: true, dt7: '2020-07-18', dt8: '2020-07-28', dt9: '10' },
                { id: 3, dt1: 'Alternatif 3', dt2: true, dt3: 'Build', dt4: 'Rp. 379.000.000', dt5: 'Pending', dt6: true, dt7: '2020-08-03', dt8: '2020-08-08', dt9: '5' },
                { id: 4, dt1: 'Alternatif 1', dt2: false, dt3: 'Test', dt4: 'Rp. 1.090.000.000', dt5: 'Ongoing', dt6: false, dt7: '2020-07-29', dt8: '2020-08-15', dt9: '18' },
                { id: 5, dt1: 'Alternatif 6', dt2: false, dt3: 'Deploy', dt4: 'Rp. 110.000.000', dt5: 'Ongoing', dt6: true, dt7: '2020-08-15', dt8: '2020-08-25', dt9: '10' },
                { id: 6, dt1: 'Alternatif 6', dt2: true, dt3: 'Complete', dt4: 'Rp. 310.000.000', dt5: 'Ongoing', dt6: false, dt7: '2020-08-26', dt8: '2020-08-26', dt9: '1' },
            ],
            currentPage: 1,
            sizePerPage: 2,
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handleClick = () => {
        this.props.toggleApprove();
    }

    handlePageChange(page, sizePerPage) {
        this.setState({currentPage: page, sizePerPage: sizePerPage})
    }

    handleApproval = (e, action) => {
        var id = this.props.passData.id;
        this.props.clickBtnApproval(e, action, id);
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
                text: 'Task',
                headerAlign: 'center',
                align: 'left',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '270px' };
                },
            },
            {
                dataField: 'dt7',
                text: 'Start',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '110px' };
                },
                formatter: (cell, row, rowIndex) => {
                    // return <div onClick={(e) => this.handleAction(e, row, 'schedule')}><img src={calendar} alt='' style={{width:'22px', height: '22px', borderRadius: '4px', cursor: 'pointer'}}/></div>;
                    if(row.dt7){
                        return <span>{row.dt7}</span>
                    }else{
                        return <span>-</span>
                    }                    
                },
            },
            {
                dataField: 'dt8',
                text: 'Finish',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '110px' };
                },
                formatter: (cell, row, rowIndex) => {
                    // return <div onClick={(e) => this.handleAction(e, row, 'schedule')}><img src={calendar} alt='' style={{width:'22px', height: '22px', borderRadius: '4px', cursor: 'pointer'}}/></div>;
                    if(row.dt7){
                        return <span>{row.dt8}</span>
                    }else{
                        return <span>-</span>
                    }                    
                },
            },
            {
                dataField: 'dt9',
                text: 'Duration',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '90px' };
                }
            }
        ];

        var tasks = [
            {
              id: 'Task 1',
              name: 'Initiate',
              start: '2020-07-16',
              end: '2020-07-23',
              progress: 0,
              dependencies: 'Task 0',
              custom_class: 'bar-milestone' // optional
            },
            {
                id: 'Task 2',
                name: 'Design',
                start: '2020-07-18',
                end: '2020-07-28',
                progress: 0,
                dependencies: 'Task 1',
                custom_class: 'bar-milestone' // optional
            },
            {
                id: 'Task 3',
                name: 'Build',
                start: '2020-07-29',
                end: '2020-08-08',
                progress: 0,
                dependencies: 'Task 2',
                custom_class: 'bar-milestone' // optional
            },
            {
                id: 'Task 4',
                name: 'Test',
                start: '2020-08-03',
                end: '2020-08-15',
                progress: 0,
                dependencies: 'Task 3',
                custom_class: 'bar-milestone' // optional
            },
            {
                id: 'Task 5',
                name: 'Deploy',
                start: '2020-08-15',
                end: '2020-08-25',
                progress: 0,
                dependencies: 'Task 4',
                custom_class: 'bar-milestone' // optional
            },
            {
                id: 'Task 6',
                name: 'Complete',
                start: '2020-08-26',
                end: '2020-08-26',
                progress: 0,
                dependencies: 'Task 5',
                custom_class: 'bar-milestone' // optional
            },
        ]

        return (
            <Modal isOpen={this.props.modalApprove} toggle={this.handleClick} className="modal-lg">
                <ModalHeader toggle={this.handleClick}>Implementation Form <Badge color="primary">Pending</Badge></ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Issue</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Label className="labelForm">Sample issue 2</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Solution</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Label className="labelForm">Alternatif 1</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Budget</Label>
                            <span className="spanForm">:</span>
                        </Col>
                        <Col xs="8">
                            <Label className="labelForm">Rp. 146.000.000</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            <Label className="labelForm">Schedule</Label>
                            <span className="spanForm">:</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                    <Row>
                        <Col>
                            <ReactGantt 
                                tasks={tasks}
                                viewMode={'Day'}
                                onClick={() => {return false}}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-vine btn-brand btn-sm" onClick={(e) => this.handleApproval(e, 'approve')}><i className="icon-checkmark4"> </i><span>Approve</span></Button>
                    <Button className="btn-google-plus btn-brand btn-sm" onClick={(e) => this.handleApproval(e, 'reject')}><i className="icon-cross2"> </i><span>Reject</span></Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Approve;
