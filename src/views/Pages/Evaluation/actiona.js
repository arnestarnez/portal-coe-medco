import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button, Label} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Table2AHP from '../../Commons/Table/Table2AHP';
import { POSITION } from '../../Constants/Position';
import dataJson from './data.json';

class Actiona extends Component {

    constructor(props) {
        super(props);
        if(this.props.location.id){
            console.log();
        }
        this.state = {
            blocking: false,
            open: false,
            collapse: true,
            fadeIn: true,
            currentPage: 1,
            sizePerPage: 2,
            data: dataJson.filter(item => item.id === this.props.location.id)[0],
            tableHead: [
                { width:"100",dataField:'fcn',title: "Function", row: '0', rowSpan: '1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"180",dataField:'dt1',title: "Kye Criteria", row: '0', rowSpan: '1', headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, editable: false },
                { width:"100",dataField:'sc1',title: "Reviewer 1", row: '0',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"100",dataField:'sc2',title: "Reviewer 2", row: '0',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"100",dataField:'sc3',title: "Reviewer 3", row: '0',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"100",dataField:'sc4',title: "Average", row: '0',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"100",dataField:'sc5',title: "Proportion", row: '0',rowSpan: '1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false }
            ],
            datas: [
                { id: 1, dt1:'Life Cycle Cost',sc1:'',sc2:'7',sc3:'5',sc4:'4.0',sc5:'17', fcn: 'Engineering'},
                { id: 2, dt1:'Complexity of implementation',sc1:'',sc2:'9',sc3:'7',sc4:'5.3',sc5:'22', fcn: 'Engineering'},
                { id: 3, dt1:'Troubleshooting Support Availability',sc1:'',sc2:'3',sc3:'5',sc4:'2.7',sc5:'11', fcn: 'Engineering'},
                { id: 4, dt1:'Complexitiof Operation',sc1:'',sc2:'1',sc3:'3',sc4:'1.3',sc5:'5', fcn: 'Operations'},
                { id: 5, dt1:'Timeline Required of Implementation',sc1:'',sc2:'5',sc3:'2',sc4:'2.3',sc5:'10', fcn: 'Operations'},
                { id: 6, dt1:'Benfits/ Production Gain',sc1:'',sc2:'3',sc3:'3',sc4:'2.0',sc5:'8', fcn: 'Operations'},
                { id: 7, dt1:'Certificate-Related Safety Availability',sc1:'',sc2:'2',sc3:'2',sc4:'1.3',sc5:'5', fcn: 'Safety'},
                { id: 8, dt1:'Company Reputation',sc1:'',sc2:'2',sc3:'2',sc4:'1.3',sc5:'5', fcn: 'General'},
                { id: 9, dt1:'Company Financial Position',sc1:'',sc2:'3',sc3:'2',sc4:'1.7',sc5:'7', fcn: 'General'},
                { id: 10, dt1:'Business Representative in Indonesia',sc1:'',sc2:'2',sc3:'1',sc4:'1.0',sc5:'4', fcn: 'General'},
                { id: 11, dt1:'Local Content Amount (TKDN)',sc1:'',sc2:'2',sc3:'2',sc4:'1.3',sc5:'5', fcn: 'General'}
            ],
            sp1: 24.2, sp2: 99
        }
    }
    
    handleAction = (row, cellName, cellValue) => {
        var sc4 = parseFloat(row.sc1)+parseFloat(row.sc2)+parseFloat(row.sc3);
        let newsc4 = (sc4/3).toFixed(1);
        row.sc4 = newsc4;
        console.log(row, 'row after')
        this.setState({
            datas: this.state.datas.map(el => (el.id === row.id ? Object.assign({}, el, { row }) : el))
        });
        var sp1 = 0, sp2 = 0
        for (let index = 0; index < this.state.datas.length; index++) {            
            sp1 = sp1+parseFloat(this.state.datas[index].sc4)
        }
        sp1 = sp1.toFixed(1);
        let newDatas = [];
        for (let index = 0; index < this.state.datas.length; index++) {            
            const newsc5 = (this.state.datas[index].sc4/sp1*100).toFixed(0)
            let arr = this.state.datas[index]
            arr.sc5 = newsc5
            this.setState({
                datas: this.state.datas.map(el => (el.id === index ? Object.assign({}, el, { arr }) : el))
            });
            newDatas.push(arr)
        }
        for (let index = 0; index < newDatas.length; index++) {            
            sp2 = sp2+parseFloat(newDatas[index].sc5)
        }
        this.setState({sp1: sp1, sp2: sp2})
        // console.log(this.state.datas, 'datas');
    }

    render() {
        const footerData = [
            [
                {
                columnIndex: 0,
                align: 'right',
                    formatter: (tableData) => {
                        // let label = 0;
                        // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                        // label += tableData[i].jmlhTempatPelKb;
                        // }
                        return (
                            <span> </span> 
                        );
                    }
                },
                {
                    columnIndex: 1,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].jmlhFKTRL;
                            // }
                            return (
                                <strong> </strong>
                            );
                        }
                },
                {
                    columnIndex: 2,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].klinikUtama;
                            // }
                            return (
                                <strong> </strong>
                            );
                        }
                },
                {
                    columnIndex: 3,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].rsUmum;
                            // }
                            return (
                                <strong> </strong>
                            );
                        }
                },
                {
                    columnIndex: 4,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].rsKhusus;
                            // }
                            return (
                                <strong>Total</strong>
                            );
                        }
                },
                {
                    columnIndex: 5,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].puskesmas;
                            // }
                            return (
                                <strong>{this.state.sp1}</strong>
                            );
                        }
                },
                {
                    columnIndex: 6,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].praktekDokter;
                            // }
                            return (
                                <strong>{this.state.sp2}</strong>
                            );
                        }
                },
            ]
		];

        return (
            <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.state.blocking}>
                    <Row>
                        <Col xs="12" md="12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md="12">
                                            <div className="titleCustomBody">
                                                <Row>
                                                    <Col xs="3" lg="2"><b>Title</b></Col>
                                                    <Col>
                                                        <div><span style={{fontSize:'14px', color:'#134A71'}}> Mesin NG</span></div>
                                                    </Col>
                                                </Row>    
                                            </div>
                                            <div className="customBody">
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Discipline</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Mechanical</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Facility</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Belida</Label>
                                                    </Col>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Asset</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Turbomachinery</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Submitter</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Roni</Label>
                                                    </Col>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Date</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">2020-10-16</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Owner</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Bagus</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Brief of Case</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="10">
                                                        <Label className="labelFormNB">Sample Case Description 4</Label>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Priority</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Optimization</Label>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col xs="12" lg="12" style={{marginBottom:'10px'}}><b>Analytical Hierarchical Process</b></Col>
                                                    <Col xs="12" lg="12">
                                                        <Table2AHP
                                                            tableHead={ this.state.tableHead }
                                                            datas={ this.state.datas }
                                                            footerData={footerData}
                                                            action={ this.handleAction }
                                                        />
                                                    </Col>
                                                </Row>
                                                <div style={{marginTop:'10px'}}>
                                                    <Button style={{marginRight:'5px'}} className="btn-vine btn-brand btn-sm"><i className="icon-checkmark4"> </i><span>Approve</span></Button>
                                                    <Button style={{marginRight:'5px'}} className="btn-google-plus btn-brand btn-sm"><i className="icon-cross2"> </i><span>Reject</span></Button>
                                                    <Button className="btn-dropbox btn-brand btn-sm" onClick={() => {this.props.history.push('/qualification/case')}}><i className="icon-undo2"> </i><span>Back</span></Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </BlockUi>
            </div >
        );
    }
}

export default Actiona;
