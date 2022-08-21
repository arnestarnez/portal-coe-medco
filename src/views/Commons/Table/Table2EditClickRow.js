import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';

const Table2EditClickRow = (props) => {

    const handleClick = (oldValue, newValue, row, column) => {
        props.action(oldValue, newValue, row, column);
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            props.actionRow(row, rowIndex);
        },
      };

    return(
        <div>
            <BootstrapTable keyField='id' data={ props.datas } columns={ props.tableHead } rowEvents={ rowEvents }
                caption={ props.caption }
                striped
                hover
                condensed
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    autoSelectText: true,
                    afterSaveCell: (oldValue, newValue, row, column) => { handleClick(oldValue, newValue, row, column); }
                }) }
            />
        </div>
    )
}

export default Table2EditClickRow