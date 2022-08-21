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
const AnggotasTable=props => {
  const {
    handleOpenViewMap,
    className,handleDelete,
    textfind,kabupatenfind,
    order, orderBy,
    provinsisExport, filteredItems, handleOpen, selectedkabupaten,
    setselectedkabupaten,
    Export,
    convertArrayOfObjectsToCSV,
    downloadCSV

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
  const [AnggotaKK,setAnggotaKK] = React.useState([])

  const statKel = [
    {
      value : '0',
      label : 'Kepala Keluarga',
    },
    {
      value : '1',
      label : 'Istri',
    },
    {
      value : '2',
      label : 'Anak',
    },
    {
      value : '3',
      label : 'Ibu',
    },
  ]

  const cariStatKel = (val) => {
    let value = val
    let result = [];
    // alert(value)
    result = statKel.filter((entry) => {
      return entry&&entry.value &&(entry.value == value) 
    });
    // console.log("result =",val)
    // alert("result = " + result[0].nama_provinsi)
    // return result[0]
  }
  const stats = JSON.parse(localStorage.getItem("status_dalam_keluarga"))
  const religi = JSON.parse(localStorage.getItem("agama"))
  const gawe = JSON.parse(localStorage.getItem("pekerjaan"))
  const smart = JSON.parse(localStorage.getItem("pendidikan"))
  const columns=[

    {
      name: 'Periode Sensus',
      selector: 'periode_sensus',
      sortable: true,
    },
    {
      name: 'Nama Anggota KK',
      selector: 'nama_anggota',
      sortable : true,
    },
    {
      name: 'NIK ',
      selector: 'NIK',
      sortable: true,
    },
    {
      name: 'Jenis Kelamin',
      selector: 'jenis_kelamin',
      sortable: true,
      cell: row => row.jenis_kelamin== 0 ? "Perempuan":"Laki-laki"
    },
    {
      name: 'Tempat Lahir',
      selector: 'tempat_lahir',
      sortable: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: 'tanggal_lahir',
      sortable: true,
    },
    {
      name: 'Agama',
      selector: 'agama',
      sortable: true,
      cell: row => {
        return  religi[row.agama].nama
      }
    },
    {
      name: 'Pendidikan',
      selector: 'pendidikan',
      sortable: true,
      cell: row => {
        return  smart[row.pendidikan].nama
      }
    },    {
      name: 'Jenis Pekerjaan',
      selector: 'jenis_pekerjaan',
      sortable: true,
      cell: row => {
        return  gawe[row.jenis_pekerjaan].nama
      }
    },
    {
      name: 'Status Nikah',
      selector: 'status_nikah',
      sortable: true,
      cell: row => row.status_nikah==1? "Menikah":"Belum Menikah"
    },
    {
      name: 'Tanggal Pernikahan',
      selector: 'tanggal_pernikahan',
      sortable: true,
      cell: row => row.tanggal_pernikahan== null ? '-' : row.tanggal_pernikahan
    },
    {
      name: 'Status Dalam Keluarga',
      selector: 'agama',
      sortable: true,
      cell: row => {
        return  stats[row.status_dalam_keluarga].nama
      }
      
    },
    {
      name: 'Kewarganegaraan',
      selector: 'kewarganegaraan',
      sortable: true,
      cell: row => row.kewarganegaraan == 0 ? "WNA" : 'WNI'
    },
    {
      name: 'Nomor Paspor',
      selector: 'no_paspor',
      sortable: true,
      cell : row => row.no_paspor == null ? "-" : row.no_paspor
    },    {
      name: 'Nomor Kitas',
      selector: 'no_katas',
      sortable: true,
      cell : row => row.no_katas == null ? "-" : row.no_katas
    },    {
      name: 'Nama Ayah',
      selector: 'nama_ayah',
      sortable: true,
    },    {
      name: 'Nama Ibu',
      selector: 'nama_ibu',
      sortable: true,
    },

    {
      name: 'CreatedBy',
      selector: 'create_by',
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
        <Button onClick={(e) => handleOpen(e, [], "Tambah Kabupaten")}>
          <AddIcon/>
        </Button>

      </div>

      <div class="col-md-6">
        <SearchInput
          className={classes.searchInput}
          placeholder="Search Kabupaten"
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
    let selectedkabupaten_var;

    if (event.target.checked) {
      selectedkabupaten_var=provinsis.map(provinsi => provinsi.id);
    } else {
      selectedkabupaten_var=[];
    }

    setselectedkabupaten(selectedkabupaten_var);
  };

  const handleSelectOne=(event, id) => {

    const selectedIndex=selectedkabupaten.indexOf(id);
    let newselectedkabupaten=[];

    if (selectedIndex===-1) {
      newselectedkabupaten=newselectedkabupaten.concat(selectedkabupaten, id);
    } else if (selectedIndex===0) {
      newselectedkabupaten=newselectedkabupaten.concat(selectedkabupaten.slice(1));
    } else if (selectedIndex===selectedkabupaten.length-1) {
      newselectedkabupaten=newselectedkabupaten.concat(selectedkabupaten.slice(0, -1));
    } else if (selectedIndex>0) {
      newselectedkabupaten=newselectedkabupaten.concat(
        selectedkabupaten.slice(0, selectedIndex),
        selectedkabupaten.slice(selectedIndex+1)
      );
    }

    setselectedkabupaten(newselectedkabupaten);
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
              title=""
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

AnggotasTable.propTypes={
  className: PropTypes.string,
  filteredItems: PropTypes.array.isRequired
};

export default AnggotasTable;