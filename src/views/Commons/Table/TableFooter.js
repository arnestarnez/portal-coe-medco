import React from 'react';
//------react-bootstrap-table---------------
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { tableEditOptions } from './TableEditOptions';

const TableFooter = (props) => {

    const cellEditProp = {
        mode: 'click'
    };

    return(
        <div>
            <BootstrapTable data={ props.datas } striped hover version='4' 
                width='1260px'
                cellEdit={ cellEditProp }
                search={ true }
                options={ tableEditOptions }
                keyField='id'
                wrapperClass='class-responsive'
                footerData={ props.footerData }
                footer
                >
                    {
                        props.tableHead.map((column, index) => {
                            return <TableHeaderColumn 
                                        row={ column.row }
                                        rowSpan={ column.rowSpan }
                                        colSpan={ column.colSpan }
                                        width={ column.width }
                                        key={ column.dataField } 
                                        dataField={ column.dataField } 
                                        headerAlign={ column.headerAlign } 
                                        dataAlign={ column.dataAlign }
                                        dataSort={ column.dataSort }
                                        tdStyle={ column.tdStyle }
                                        dataFormat={ column.dataFormat } 
                                        editable={ false }
                                        thStyle={{ whiteSpace: 'normal' }}
                                    >
                                            { column.title }
                                    </TableHeaderColumn>
                        })
                    }
            </BootstrapTable>
        </div>
    )
}

export default TableFooter