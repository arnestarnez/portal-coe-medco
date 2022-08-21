import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button, Label} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Table2Pugh from '../../Commons/Table/Table2Pugh';
import { POSITION } from '../../Constants/Position';
import dataJson from './data.json';

class Actionp extends Component {

    constructor(props) {
        super(props);
        if(this.props.location.id){
            console.log();
        }else{
            this.props.history.push('/qualification')
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
                { width:"130",dataField:'dt1',title: "Kye Criteria", row: '0', rowSpan: '2', headerAlign: POSITION.CENTER, dataAlign: POSITION.RIGHT, editable: false },
                { dataField:'tp', title: "Solutions & Concepts", row: '0', colSpan: '7', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: false },
                { width:"90",dataField:'sc1',title: "Technology 1", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'sc2',title: "Technology 2", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'sc3',title: "Technology 3", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'sc4',title: "Technology 4", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'sc5',title: "Technology 5", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'sc6',title: "Technology 6", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'sc7',title: "Technology 7", row: '1',colSpan:'1', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true },
                { width:"90",dataField:'dt2',title: "Weightings", row: '0',rowSpan: '2', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, editable: true }
            ],
            datas: [
                { id: 1, dt1:'Life Cycle Cost',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:16},
                { id: 2, dt1:'Complexity of implementation',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:22},
                { id: 3, dt1:'Troubleshooting Support Availability',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:10},
                { id: 4, dt1:'Complexitiof Operation',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:6},
                { id: 5, dt1:'Timeline Required of Implementation',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:10},
                { id: 6, dt1:'Benfits/ Production Gain',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:8},
                { id: 7, dt1:'Certificate-Related Safety Availability',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:6},
                { id: 8, dt1:'Company Reputation',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:5},
                { id: 9, dt1:'Company Financial Position',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:7},
                { id: 10, dt1:'Business Representative in Indonesia',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:5},
                { id: 11, dt1:'Local Content Amount (TKDN)',sc1:'',sc2:'',sc3:'',sc4:'',sc5:'',sc6:'',sc7:'',dt2:7}
            ],
            sp1: 0, sp2: 0, sp3: 0, sp4: 0, sp5: 0, sp6: 0, sp7: 0,
            sn1: 0, sn2: 0, sn3: 0, sn4: 0, sn5: 0, sn6: 0, sn7: 0,
            ss1: 0, ss2: 0, ss3: 0, ss4: 0, ss5: 0, ss6: 0, ss7: 0,
            wsp1: 0, wsp2: 0, wsp3: 0, wsp4: 0, wsp5: 0, wsp6: 0, wsp7: 0,
            wsn1: 0, wsn2: 0, wsn3: 0, wsn4: 0, wsn5: 0, wsn6: 0, wsn7: 0,
            df1: 0, df2: 0, df3: 0, df4: 0, df5: 0, df6: 0, df7: 0
        }
    }

    handleAction = (row, cellName, cellValue) => {
        this.setState({
            datas: this.state.datas.map(el => (el.id === row.id ? Object.assign({}, el, { row }) : el))
        });
        var sp1 = 0, sn1 = 0, ss1 = 0, sp2 = 0, sn2 = 0, ss2 = 0, sp3 = 0, sn3 = 0, ss3 = 0, sp4 = 0, sn4 = 0, ss4 = 0, sp5 = 0, sn5 = 0, ss5 = 0, sp6 = 0, sn6 = 0, ss6 = 0, sp7 = 0, sn7 = 0, ss7 = 0
        var wsp1= 0, wsp2= 0, wsp3= 0, wsp4= 0, wsp5= 0, wsp6= 0, wsp7= 0, wsn1= 0, wsn2= 0, wsn3= 0, wsn4= 0, wsn5= 0, wsn6= 0, wsn7= 0
        for (let index = 0; index < this.state.datas.length; index++) {            
            if(this.state.datas[index].sc1 === '-'){
                sn1 = sn1+1
                wsn1 = wsn1 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc1 === '+'){
                sp1 = sp1+1
                wsp1 = wsp1 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc1 === 'S'){ss1 = ss1+1}
            if(this.state.datas[index].sc2 === '-'){
                sn2 = sn2+1
                wsn2 = wsn2 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc2 === '+'){
                sp2 = sp2+1
                wsp2 = wsp2 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc2 === 'S'){ss2 = ss2+1}
            if(this.state.datas[index].sc3 === '-'){
                sn3 = sn3+1
                wsn3 = wsn3 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc3 === '+'){
                sp3 = sp3+1
                wsp3 = wsp3 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc3 === 'S'){ss3 = ss3+1}
            if(this.state.datas[index].sc4 === '-'){
                sn4 = sn4+1
                wsn4 = wsn4 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc4 === '+'){
                sp4 = sp4+1
                wsp4 = wsp4 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc4 === 'S'){ss4 = ss4+1}
            if(this.state.datas[index].sc5 === '-'){
                sn5 = sn5+1
                wsn5 = wsn5 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc5 === '+'){
                sp5 = sp5+1
                wsp5 = wsp5 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc5 === 'S'){ss5 = ss5+1}
            if(this.state.datas[index].sc6 === '-'){
                sn6 = sn6+1
                wsn6 = wsn6 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc6 === '+'){
                sp6 = sp6+1
                wsp6 = wsp6 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc6 === 'S'){ss6 = ss6+1}
            if(this.state.datas[index].sc7 === '-'){
                sn7 = sn7+1
                wsn7 = wsn7 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc7 === '+'){
                sp7 = sp7+1
                wsp7 = wsp7 + parseInt(this.state.datas[index].dt2)
            }else if(this.state.datas[index].sc7 === 'S'){ss7 = ss7+1}
        }
        this.setState({sp1: sp1, sn1: sn1, ss1: ss1, sp2: sp2, sn2: sn2, ss2: ss2, sp3: sp3, sn3: sn3, ss3: ss3, sp4: sp4, sn4: sn4, ss4: ss4, sp5: sp5, sn5: sn5, ss5: ss5, sp6: sp6, sn6: sn6, ss6: ss6, sp7: sp7, sn7: sn7, ss7: ss7})
        this.setState({wsp1: wsp1, wsp2: wsp2, wsp3: wsp3, wsp4: wsp4, wsp5: wsp5, wsp6: wsp6, wsp7: wsp7})
        this.setState({wsn1: wsn1, wsn2: wsn2, wsn3: wsn3, wsn4: wsn4, wsn5: wsn5, wsn6: wsn6, wsn7: wsn7})
        this.setState({df1: wsp1-wsn1, df2: wsp2-wsn2, df3: wsp3-wsn3, df4: wsp4-wsn4, df5: wsp5-wsn5, df6: wsp6-wsn6, df7: wsp7-wsn7})
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
                            <span>Sum of Positives</span> 
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
                {
                    columnIndex: 5,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].jumlahFKTP;
                            // }
                            return (
                                <strong>{this.state.sp5}</strong>
                            );
                        }
                },
                {
                    columnIndex: 6,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].puskesmas;
                            // }
                            return (
                                <strong>{this.state.sp6}</strong>
                            );
                        }
                },
                {
                    columnIndex: 7,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].praktekDokter;
                            // }
                            return (
                                <strong>{this.state.sp7}</strong>
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
                            <span>Sum of Negatives</span> 
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
                                <strong>{this.state.sn1}</strong>
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
                                <strong>{this.state.sn2}</strong>
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
                                <strong>{this.state.sn3}</strong>
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
                                <strong>{this.state.sn4}</strong>
                            );
                        }
                },
                {
                    columnIndex: 5,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].jumlahFKTP;
                            // }
                            return (
                                <strong>{this.state.sn5}</strong>
                            );
                        }
                },
                {
                    columnIndex: 6,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].puskesmas;
                            // }
                            return (
                                <strong>{this.state.sn6}</strong>
                            );
                        }
                },
                {
                    columnIndex: 7,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].praktekDokter;
                            // }
                            return (
                                <strong>{this.state.sn7}</strong>
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
                            <span>Sum of Sames</span> 
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
                                <strong>{this.state.ss1}</strong>
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
                                <strong>{this.state.ss2}</strong>
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
                                <strong>{this.state.ss3}</strong>
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
                                <strong>{this.state.ss4}</strong>
                            );
                        }
                },
                {
                    columnIndex: 5,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].jumlahFKTP;
                            // }
                            return (
                                <strong>{this.state.ss5}</strong>
                            );
                        }
                },
                {
                    columnIndex: 6,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].puskesmas;
                            // }
                            return (
                                <strong>{this.state.ss6}</strong>
                            );
                        }
                },
                {
                    columnIndex: 7,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].praktekDokter;
                            // }
                            return (
                                <strong>{this.state.ss7}</strong>
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
                            <span>Weighted Sum of Positives</span> 
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
                                <strong>{this.state.wsp1}</strong>
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
                                <strong>{this.state.wsp2}</strong>
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
                                <strong>{this.state.wsp3}</strong>
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
                                <strong>{this.state.wsp4}</strong>
                            );
                        }
                },
                {
                    columnIndex: 5,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].jumlahFKTP;
                            // }
                            return (
                                <strong>{this.state.wsp5}</strong>
                            );
                        }
                },
                {
                    columnIndex: 6,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].puskesmas;
                            // }
                            return (
                                <strong>{this.state.wsp6}</strong>
                            );
                        }
                },
                {
                    columnIndex: 7,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].praktekDokter;
                            // }
                            return (
                                <strong>{this.state.wsp7}</strong>
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
                            <span>Weighted Sum of Negatives</span> 
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
                                <strong>{this.state.wsn1}</strong>
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
                                <strong>{this.state.wsn2}</strong>
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
                                <strong>{this.state.wsn3}</strong>
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
                                <strong>{this.state.wsn4}</strong>
                            );
                        }
                },
                {
                    columnIndex: 5,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].jumlahFKTP;
                            // }
                            return (
                                <strong>{this.state.wsn5}</strong>
                            );
                        }
                },
                {
                    columnIndex: 6,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].puskesmas;
                            // }
                            return (
                                <strong>{this.state.wsn6}</strong>
                            );
                        }
                },
                {
                    columnIndex: 7,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].praktekDokter;
                            // }
                            return (
                                <strong>{this.state.wsn7}</strong>
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
                            <span>Difference?</span> 
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
                                <strong>{this.state.df1}</strong>
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
                                <strong>{this.state.df2}</strong>
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
                                <strong>{this.state.df3}</strong>
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
                                <strong>{this.state.df4}</strong>
                            );
                        }
                },
                {
                    columnIndex: 5,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].jumlahFKTP;00BF8F
                            // }
                            return (
                                <strong>{this.state.df5}</strong>
                            );
                        }
                },
                {
                    columnIndex: 6,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].puskesmas;
                            // }
                            return (
                                <strong>{this.state.df6}</strong>
                            );
                        }
                },
                {
                    columnIndex: 7,
                    align: 'center',
                        formatter: (tableData) => {
                            // let label = 0;
                            // for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
                            // label += tableData[i].praktekDokter;
                            // }
                            return (
                                <strong>{this.state.df7}</strong>
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
                                                    <Col xs="12" lg="12" style={{marginBottom:'10px'}}><b>Pugh Matrix</b></Col>
                                                    <Col xs="12" lg="12">
                                                        <Table2Pugh
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

export default Actionp;
