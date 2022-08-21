import React, { Component } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
// import { TreeTable, TreeState } from 'cp-react-tree-table';
// import umdata from './data/umdata.json';

class Umfaskes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // treeValue: TreeState.create(umdata)
        };
    }

    // handleOnChange = (newValue) => {
    //     this.setState({ treeValue: newValue });
    // }
      
    // renderIndexCell = (row) => {
    //     return (
    //       <div style={{ paddingLeft: (row.metadata.depth * 15) + 'px'}}
    //         className={row.metadata.hasChildren ? 'with-children' : 'without-children'}>
            
    //         {(row.metadata.hasChildren)
    //           ? (
    //               <span onClick={row.toggleChildren}><i className="icon-folder6"></i> </span>
    //             )
    //           : <span><i className="icon-file-empty"></i> </span>
    //         }
            
    //         <span>{row.data.name}</span>
    //       </div>
    //     );
    // }
    
    // renderEmployeesCell = (row) => {
    //     return (
    //       <span className="employees-cell">{row.data.employees}</span>
    //     );
    // }
    
    // renderExpensesCell = (row) => {
    //     return (
    //       <span className="expenses-cell">{row.data.expenses}</span>
    //     );
    // }
    
    // renderEditableCell = (row) => {
    //     return (
    //       <input type="text" value={row.data.contact}
    //         onChange={(event) => {
    //           row.updateData({
    //             ...row.data,
    //             contact: event.target.value,
    //           });
    //         }}/>
    //     );
    // }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md="12">
                                        <div className="titleFilter"><i className="icon-office"></i> Daftar Faskes</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        {/* <TreeTable
                                            value={this.state.treeValue}
                                            onChange={this.handleOnChange}>
                                            <TreeTable.Column basis="240px" grow="0"
                                            renderCell={this.renderIndexCell}
                                            renderHeaderCell={() => <span>Name</span>}/>
                                            <TreeTable.Column
                                            renderCell={this.renderEditableCell}
                                            renderHeaderCell={() => <span>Contact person</span>}/>
                                            <TreeTable.Column
                                            renderCell={this.renderEmployeesCell}
                                            renderHeaderCell={() => <span className="t-right">Employees</span>}/>
                                            <TreeTable.Column
                                            renderCell={this.renderExpensesCell}
                                            renderHeaderCell={() => <span className="t-right">Expenses ($)</span>}/>
                                        </TreeTable> */}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Umfaskes;
