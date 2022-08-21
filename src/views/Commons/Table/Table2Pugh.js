import React from 'react';
//------react-bootstrap-table---------------
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { tableEditOptions } from './TableEditOptions';

const TablePugh = (props) => {

    function onAfterSaveCell(row, cellName, cellValue) {
        // alert(`Save cell ${cellName} with value ${cellValue}`);
      
        // let rowStr = '';
        // for (const prop in row) {
        //   rowStr += prop + ': ' + row[prop] + '\n';
        // }
      
        // alert('Thw whole row :\n' + rowStr);
        props.action(row, cellName, cellValue)
    }
      
    function onBeforeSaveCell(row, cellName, cellValue) {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        return true;
    }

    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: onBeforeSaveCell,
        afterSaveCell: onAfterSaveCell
    };

    function edit(param1, param2) {
        if(param1===true && param2 !== 'dt2'){
            return { type: 'select', options: { values: nilai } }
        }else if(param2 === 'dt2'){
            return true
        }else{
            return false
        }
    }

    const nilai = [
      {value:'-', text:'-'},
      {value:'+', text:'+'},
      {value:'S', text:'S'},
    ]

    return(
        <div className="table-pugh">
            <BootstrapTable data={ props.datas } striped hover version='4' 
                cellEdit={ cellEditProp }
                options={ tableEditOptions }
                keyField='id'
                footerData={ props.footerData }
                footer
                wrapperClass='class-responsive'
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
                                        // editable={ (column.editable===true && column.dataField != 'dt2') ? { type: 'select', options: { values: nilai } } : true }
                                        editable={ edit(column.editable, column.dataField) }
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

export default TablePugh