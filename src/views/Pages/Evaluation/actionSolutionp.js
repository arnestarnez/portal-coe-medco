import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button, Label} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Table2PughNumber from '../../Commons/Table/Table2PughNumber';
import { POSITION } from '../../Constants/Position';
import dataJson from './data.json';

class ActionSolutionp extends Component {

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
                { width:"130",dataField:'dt1',title: "Solution Criteria", row: '0', rowSpan: '2', headerAlign: POSITION.CENTER, dataAlign: POSITION.RIGHT, editable: false },
                { dataField:'tp', title: "Solutions & Concepts", row: '0', colSpan: '4', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"90",dataField:'sc1',title: "Technology 1", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'sc2',title: "Technology 2", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'sc3',title: "Technology 3", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'sc4',title: "Technology 4", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'dt2',title: "Weightings", row: '0',rowSpan: '2', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true }
            ],
            datas: [
                { id: 1, dt1:'Life Cycle Cost',sc1:'',sc2:'',sc3:'5',sc4:'5',sc5:'',sc6:'',sc7:'',dt2:16},
                { id: 2, dt1:'Complexity of implementation',sc1:'',sc2:'',sc3:'3',sc4:'5',sc5:'',sc6:'',sc7:'',dt2:22},
                { id: 3, dt1:'Troubleshooting Support Availability',sc1:'',sc2:'',sc3:'1',sc4:'3',sc5:'',sc6:'',sc7:'',dt2:10},
                { id: 4, dt1:'Complexitiof Operation',sc1:'',sc2:'',sc3:'3',sc4:'7',sc5:'',sc6:'',sc7:'',dt2:6},
                { id: 5, dt1:'Timeline Required of Implementation',sc1:'',sc2:'',sc3:'3',sc4:'3',sc5:'',sc6:'',sc7:'',dt2:10},
                { id: 6, dt1:'Benfits/ Production Gain',sc1:'',sc2:'',sc3:'5',sc4:'1',sc5:'',sc6:'',sc7:'',dt2:8},
                { id: 7, dt1:'Certificate-Related Safety Availability',sc1:'',sc2:'',sc3:'1',sc4:'0',sc5:'',sc6:'',sc7:'',dt2:6},
                { id: 8, dt1:'Company Reputation',sc1:'',sc2:'',sc3:'1',sc4:'0',sc5:'',sc6:'',sc7:'',dt2:5},
                { id: 9, dt1:'Company Financial Position',sc1:'',sc2:'',sc3:'1',sc4:'1',sc5:'',sc6:'',sc7:'',dt2:7},
                { id: 10, dt1:'Business Representative in Indonesia',sc1:'',sc2:'',sc3:'1',sc4:'1',sc5:'',sc6:'',sc7:'',dt2:5},
                { id: 11, dt1:'Local Content Amount (TKDN)',sc1:'',sc2:'',sc3:'1',sc4:'0',sc5:'',sc6:'',sc7:'',dt2:7}
            ],
            sp1: 0, sp2: 0, sp3: 25, sp4: 26,
            sn1: 0, sn2: 0, sn3: 274, sn4: 312,
            colorsn1: 'white',
            colorsn2: 'white',
            colorsn3: 'white',
            colorsn4: 'yellow'
        }
    }

    handleAction = (row, cellName, cellValue) => {
        this.setState({
            datas: this.state.datas.map(el => (el.id === row.id ? Object.assign({}, el, { row }) : el))
        });
        var sp1 = 0, sn1 = 0, sp2 = 0, sn2 = 0, sp3 = 0, sn3 = 0, sp4 = 0, sn4 = 0
        for (let index = 0; index < this.state.datas.length; index++) {            
            sp1 = sp1+parseFloat(this.state.datas[index].sc1 !== '' ? this.state.datas[index].sc1 : 0)
            sp2 = sp2+parseFloat(this.state.datas[index].sc2 !== '' ? this.state.datas[index].sc2 : 0)
            sp3 = sp3+parseFloat(this.state.datas[index].sc3 !== '' ? this.state.datas[index].sc3 : 0)
            sp4 = sp4+parseFloat(this.state.datas[index].sc4 !== '' ? this.state.datas[index].sc4 : 0)

            sn1 = sn1+parseFloat(this.state.datas[index].sc1 !== '' ? this.state.datas[index].sc1*this.state.datas[index].dt2 : 0)
            sn2 = sn2+parseFloat(this.state.datas[index].sc2 !== '' ? this.state.datas[index].sc2*this.state.datas[index].dt2 : 0)
            sn3 = sn3+parseFloat(this.state.datas[index].sc3 !== '' ? this.state.datas[index].sc3*this.state.datas[index].dt2 : 0)
            sn4 = sn4+parseFloat(this.state.datas[index].sc4 !== '' ? this.state.datas[index].sc4*this.state.datas[index].dt2 : 0)
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
                            <span>Sum of Score</span> 
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
                                <strong>{this.state.sp1}</strong>
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
                                <strong>{this.state.sp2}</strong>
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
                                <strong>{this.state.sp3}</strong>
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
                                <strong>{this.state.sp4}</strong>
                            );
                        }
                },
            ],
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
                            <span>Sum Weighted of Score</span> 
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
                                <div style={{backgroundColor:this.state.colorsn1}}>
                                    <strong>{this.state.sn1}</strong>
                                </div>
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
                                <div style={{backgroundColor:this.state.colorsn2}}>
                                    <strong>{this.state.sn2}</strong>
                                </div>
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
                                <div style={{backgroundColor:this.state.colorsn3}}>
                                    <strong>{this.state.sn3}</strong>
                                </div>
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
                                <div style={{backgroundColor:this.state.colorsn4}}>
                                    <strong>{this.state.sn4}</strong>
                                </div>
                            );
                        }
                },
            ],
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
                                                        <div><span style={{fontSize:'14px', color:'#134A71'}}> New Mesin</span></div>
                                                    </Col>
                                                </Row>    
                                            </div>
                                            <div className="customBody">
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Submitter</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Budi</Label>
                                                    </Col>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Date</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">2020-11-06</Label>
                                                    </Col>
                                                </Row>
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
                                                        <Label className="labelForm">Tech. Principal</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Honeywell</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Owner</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Didik</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Brief Solution</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="10">
                                                        <Label className="labelFormNB">Sample Brief of Solution 1 Here</Label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Additional Data</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="10">
                                                        <Label className="labelFormNB">Sample Additional Data 1 Here</Label>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col sm="6" md="2">
                                                        <Label className="labelForm">Value Adding</Label>
                                                        <span className="spanForm">:</span>
                                                    </Col>
                                                    <Col sm="6" md="4">
                                                        <Label className="labelFormNB">Reduced Cost</Label>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col xs="12" lg="12" style={{marginBottom:'10px'}}><b>Pugh Matrix</b></Col>
                                                    <Col xs="12" lg="12">
                                                        <Table2PughNumber
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
                                                    <Button className="btn-dropbox btn-brand btn-sm" onClick={() => {this.props.history.push('/qualification')}}><i className="icon-undo2"> </i><span>Back</span></Button>
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

export default ActionSolutionp;
