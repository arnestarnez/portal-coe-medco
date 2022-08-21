import React from 'react';
import { Button } from 'reactstrap';
//------react-bootstrap-table---------------
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { tableOptions } from './TableOptions';

const CommonTable = (props) => {

    const handleClick = (e, tipe, val) => {
        e.preventDefault();
        props.action(tipe, val);
    }

    return(
        <div>
            <div className="buttonTable">
                <Button className="btn-vine btn-brand btn-sm" onClick={ e => handleClick(e, 'download', '') }>
                    <i className="icon-file-excel"></i>
                    <span>Download</span>
                </Button>
                <Button className="btn-twitter btn-brand btn-sm"  onClick={ e => handleClick(e, 'add', '') }>
                    <i className="icon-plus-circle2"></i>
                    <span>Add Data</span>
                </Button>
            </div>
            <BootstrapTable data={ props.datas } striped hover pagination version='4' 
                search={ true }
                options={ tableOptions }
                keyField='id'>
                    {
                        props.tableHead.map((column, index) => {
                            return <TableHeaderColumn 
                                        width={ column.width }
                                        key={ column.dataField } 
                                        dataField={ column.dataField } 
                                        headerAlign={ column.headerAlign } 
                                        dataAlign={ column.dataAlign }
                                        dataSort={ column.dataSort }
                                        tdStyle={ column.tdStyle }
                                        dataFormat={ column.dataFormat } 
                                    >
                                            { column.title }
                                    </TableHeaderColumn>
                        })
                    }
            </BootstrapTable>
        </div>
    )
}

export default CommonTable