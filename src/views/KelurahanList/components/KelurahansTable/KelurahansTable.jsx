import React, { useState } from 'react';
//import styled from 'styled-components';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SearchInput } from 'components';
import { urlDeleteKel } from 'kumpulanUrl';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/styles';
import DataTable from 'react-data-table-component';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

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
import { async } from 'validate.js';
// import { array } from 'yargs';

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
const KelurahansTable =props => {
  const {
    handleOpenViewMap,
    className,
    handleDelete,
    textfind,
    order, orderBy, SettingKelurahan,
    provinsisExport, filteredItems, handleOpen, selectedKelurahans,
    setSelectedKelurahans,
    Export,ExportPDF,
    convertArrayOfObjectsToCSV,
    downloadCSV

    , ...rest }=props;

  const [filterText, setFilterText]=React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle]=React.useState(false);
  const classes=useStyles();

  const [rowsPerPage, setRowsPerPage]=useState(10);
  const [page, setPage]=useState(0);

const deleteKel = async (e,selectedKelurahans) => {
  let url = urlDeleteKel;
  let response = axios.delete(url + `/${selectedKelurahans.id_kelurahan}`)
  console.log(selectedKelurahans.id_kelurahan)

  if (response === 200) {
    thisClickedFunda.closest(columns).remove();
    console.log(response.data.data)
  }
  


}

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
      name: 'Kode Depdagri',
      selector: 'KodeDepdagri',
      sortable: true,
    },
    {
      name:'Nama Provinsi',
      selector:'nama_provinsi',
      sortable:true,
    },    {
      name:'Nama Kabupaten',
      selector:'nama_kabupaten',
      sortable:true,
    },
    {
      name:'Nama Kecamatan',
      selector:'nama_kecamatan',
      sortable:true,
    },
    {
      name: 'Nama Kelurahan',
      selector: 'nama_kelurahan',
      sortable: true, 
    },
    {
      name: 'Keterangan',
      selector: 'IsActive',
      sortable: true,
      cell: row => row.IsActive==1? "Aktiv":"Non Aktiv"
    },
    {
      name: 'CreatedBy',
      selector: 'CreatedBy',
      sortable: true,
    },
    {
      name: 'Created',
      selector: 'Created',
      sortable: true,
    },
    {
      name: 'LastModified',
      selector: 'LastModified',
      sortable: true,
    },
    {
      name: 'LastModifiedBy',
      selector: 'LastModifiedBy',
      sortable: true,
    },
    {
      name: 'Edit Kelurahan',
      button: true,
      cell: row =>
        <Button color="primary" id="edit"
          onClick={(e) => handleOpen(e, row, "Ubah Kelurahan")}  ><EditIcon /></Button>
      ,
    },
    {
      name: 'Hapus Kelurahan',
      button: true,
      cell: row =>
        <Button color="primary" id="delete"
          onClick={(e) => handleDelete(e, row, "Hapus Kelurahan")}  ><DeleteIcon /></Button>
      ,
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
        <Button className="btn btn-sm btn-primary" id="add" onClick={(e) => handleOpen(e,[], "Tambah Kelurahan")}>
        <AddIcon />
        </Button>

      </div>

      <div class="col-md-6">
        <SearchInput
          className={classes.searchInput}
          placeholder="Search Kelurahan"
          textfind={textfind}
        />
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
    let selectedKelurahans_var;

    if (event.target.checked) {
      selectedKelurahans_var=provinsis.map(provinsi => id);
    } else {
      selectedKelurahans_var=[];
    }

    setSelectedKelurahans(selectedKelurahans_var);
  };

  const handleSelectOne=(event, id) => {

    const selectedIndex=selectedKelurahans.indexOf(id);
    let newSelectedKelurahans=[];

    if (selectedIndex===-1) {
      newSelectedKelurahans=newSelectedKelurahans.concat(selectedKelurahans, id);
    } else if (selectedIndex===0) {
      newSelectedKelurahans=newSelectedKelurahans.concat(selectedKelurahans.slice(1));
    } else if (selectedIndex===selectedKelurahans.length-1) {
      newSelectedKelurahans=newSelectedKelurahans.concat(selectedKelurahans.slice(0, -1));
    } else if (selectedIndex>0) {
      newSelectedKelurahans=newSelectedKelurahans.concat(
        selectedKelurahans.slice(0, selectedIndex),
        selectedKelurahans.slice(selectedIndex+1)
      );
    }

    setSelectedKelurahans(newSelectedKelurahans);
    //console.log(selectedUsers);
  };

  const handlePageChange=(event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange=event => {
    setRowsPerPage(event.target.value);
  };
  //  const filteredItems=provinsis;
  //const actionsMemo=React.useMemo(() => <Export onExport={() => downloadCSV()} />, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>

          <div className={classes.inner}>
            <DataTable
              title="Kelurahan List"
              customStyles={customStyles}
              columns={columns}
              data={filteredItems}
              keyField="nama_kelurahan"
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

KelurahansTable.propTypes={
  className: PropTypes.string,
  filteredItems: PropTypes.array.isRequired
};

export default KelurahansTable;
