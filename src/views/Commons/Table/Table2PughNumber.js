import React, { useState } from 'react';
//------react-bootstrap-table---------------
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { tableEditOptions } from './TableEditOptions';

const TablePughNumber = (props) => {

    const [rowSelected, setRowSelected] = useState()

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

    function onRowSelect(row, isSelected, e) {
        setRowSelected(row)
      }

    const selectRow = {
        mode: 'checkbox',
        hideSelectColumn: true,
        clickToSelect: true,
        clickToSelectAndEditCell: true,
        onSelect: onRowSelect,
    };

    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: onBeforeSaveCell,
        afterSaveCell: onAfterSaveCell
    };

    function edit(param1, param2) {
        if(param1===true && (param2 === 'sc1' || param2 === 'sc2' || param2 === 'sc3' || param2 === 'sc4') && rowSelected && (rowSelected.id === 1 || rowSelected.id === 2 || rowSelected.id === 3 || rowSelected.id === 4 || rowSelected.id === 5 || rowSelected.id === 10)){
            return { type: 'select', options: { values: nilai1 } }
        }else if(param1===true && (param2 === 'sc1' || param2 === 'sc2' || param2 === 'sc3' || param2 === 'sc4') && rowSelected && (rowSelected.id === 6 || rowSelected.id === 7 || rowSelected.id === 8 || rowSelected.id === 9)){
            return { type: 'select', options: { values: nilai2 } }
        }else if(param2 === 'dt2'){
            return true
        }else{
            return false
        }
    }

    const nilai1 = [
      {value:'1', text:'1'},
      {value:'2', text:'2'},
      {value:'3', text:'3'},
      {value:'4', text:'4'},
      {value:'5', text:'5'}
    ]

    const nilai2 = [
        {value:'1', text:'1'},
        {value:'2', text:'2'}
    ]

    return(
        <div className="table-pugh">
            <BootstrapTable data={ props.datas } striped hover version='4' 
                cellEdit={ cellEditProp }
                selectRow={ selectRow }
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

export default TablePughNumber