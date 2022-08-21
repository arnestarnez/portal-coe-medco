import React, { useState } from 'react';
//import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SearchInput } from 'components';

import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/styles';
import DataTable from 'react-data-table-component';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TableSortLabel
} from '@material-ui/core';

import { getInitials } from 'helpers';
import { red } from '@material-ui/core/colors';
// import LaporanPerKabupatenTable from '.';

const useStyles=makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    //    minWidth: 1050
    minWidth: '100%'
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }, importButton: {
    marginRight: theme.spacing(1)
  },
}));
const LaporanPerKabupatenTable=props => {
  const {
    handleOpenViewMap,
    className,handleDelete,
    textfind,kecamatanfind,
    order, orderBy,
    kecamatanExport, filteredItems, handleOpen, selectedkecamatan,
    rowSelect,setRowSelect,
    setselectedkecamatan,
    Export,ExportPDF,
    convertArrayOfObjectsToCSV,
    downloadCSV,
    setKab,
    kab

    , ...rest }=props;

  const [filterText, setFilterText]=React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle]=React.useState(false);
  const classes=useStyles();

  const [rowsPerPage, setRowsPerPage]=useState(10);
  const [page, setPage]=useState(0);




  const customStyles={
    header: {
      style: {
        minHeight: '10px',
        borderTopStyle: 'hidden',
        borderTopWidth: '0',
        borderTopsColor: 'ffffff',

      },
    },
    rows: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '000000',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '000000',
        minWidth: '98%',
        marginLeft: '7px', // override the cell padding for head cells
        //paddingRight: '3px',
        width: '98%',
        minHeight: '30px', // override the row height

      },

    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '000000',
        //alignItems: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBott0mColor: '000000',
        width: '98%',

        marginLeft: '7px', // override the cell padding for head cells
        //paddingRight: '3px',

        minHeight: '30px', // override the row height

      },
      //height: '30px',
    },
    headCells: {
      style: {
        '&:not(:last-of-type)': {

          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          borderLeftColor: '000000',
          //marginLeft: '3px', // override the cell padding for head cells
          //          marginRight: '3px',
          minHeight: '30px', // override the row heigh
        },

        ':last-of-type': {
          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          borderLeftColor: '000000',

          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '000000',
          minHeight: '30px', // override the row heigh

        },
        //textAlign: 'center',
        justifyContent: 'center',

        //alignItems: 'center',


      },

    },
    cells: {
      style: {
        '&:not(:last-of-type)': {

          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          borderLeftColor: '000000',
          //marginLeft: '3px', // override the cell padding for head cells
          //          marginRight: '3px',
          minHeight: '30px', // override the row heigh
        },

        ':last-of-type': {
          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          borderLeftColor: '000000',

          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '000000',
          minHeight: '30px', // override the row heigh

        }
      },

    },
  };



  const columns=[

    {
      name: 'Jumlah Kecamatan',
      selector: 'Jumlah_Kecamatan',
      sortable: true,
    },
    {
      name: 'Jumlah Kelurahan',
      selector: 'Jumlah_Kelurahan',
      sortable: true,
    },    
    {
      name: 'Jumlah RT',
      selector: 'Jumlah_RT',
      sortable: true,
    },
    {
      name: 'Jumlah RW',
      selector: 'Jumlah_RW',
      sortable: true,
    },

  ];
  // const filteredItems=provinsis.filter(item => item.nama_provinsi&&item.nama_provinsi.toLowerCase().includes(filterText.toLowerCase()));
  const subHeaderComponentMemo=React.useMemo(() => {
    const handleClear=() => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return <div class="form-group">
      <div class="col-md-6">
        <Button filteredItems={filteredItems} color="primary" onClick={(e) => downloadCSV(e, [])}>
          <img src="/img/xls.jpeg" />
        </Button>
        <Button filteredItems={filteredItems} color="primary" onClick={() => ExportPDF()}>
          <img src="/img/pdf.jpeg" />
        </Button>
      </div>
    </div>



      ;
  }, [filteredItems, filterText, resetPaginationToggle]);





  /*  if (localStorage.getItem('accessId')!=="2") {
      return <Redirect to='/beranda' />;
    }
  */

  const handleSelectAll=event => {

    //const { groups }=props;
    //setSelectedUsers
    let selectedkecamatan_var;

    if (event.target.checked) {
      selectedkecamatan_var=provinsis.map(provinsi => provinsi.id);
    } else {
      selectedkecamatan_var=[];
    }

    setselectedkecamatan(selectedkecamatan_var);
  };

  const handleSelectOne=(event, id) => {

    const selectedIndex=selectedkecamatan.indexOf(id);
    let newselectedkecamatan=[];

    if (selectedIndex===-1) {
      newselectedkecamatan=newselectedkecamatan.concat(selectedkecamatan, id);
    } else if (selectedIndex===0) {
      newselectedkecamatan=newselectedkecamatan.concat(selectedkecamatan.slice(1));
    } else if (selectedIndex===selectedkecamatan.length-1) {
      newselectedkecamatan=newselectedkecamatan.concat(selectedkecamatan.slice(0, -1));
    } else if (selectedIndex>0) {
      newselectedkecamatan=newselectedkecamatan.concat(
        selectedkecamatan.slice(0, selectedIndex),
        selectedkecamatan.slice(selectedIndex+1)
      );
    }

    setselectedkecamatan(newselectedkecamatan);
    //console.log(selectedUsers);
  };

  const handlePageChange=(event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange=event => {
    setRowsPerPage(event.target.value);
  };

 

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <DataTable
              title={rowSelect.nama_kabupaten == undefined ? "Jumlah Wilayah Kab/Kota" : "Jumlah Wilayah Kab/Kota " +rowSelect.nama_kabupaten}
              customStyles={customStyles}
              columns={columns}
              data={filteredItems}
              keyField="nama_kabupaten"
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              selectableRows
              persistTableHead
              dense
            />
          </div>


        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

LaporanPerKabupatenTable.propTypes={
  className: PropTypes.string,
  filteredItems: PropTypes.array.isRequired
};

export default LaporanPerKabupatenTable;
