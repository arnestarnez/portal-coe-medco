import React, { useEffect, useState } from 'react';
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
import { urlProv, urlShowKab } from '../../../../kumpulanUrl';
import DataTable from 'react-data-table-component';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import {
  rowSelect,
  Card,
  CardActions,
  CardContent,
  Avatar,
  TextField,
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

const useStyles = makeStyles(theme => ({
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
  fontFamily: {
    fontFamily: 'font-poppins'
  },
  actions: {
    justifyContent: 'flex-end'
  }, importButton: {
    marginRight: theme.spacing(1)
  },
}));
const LaporanKabupatenTable = props => {
  const {
    kab,
    setKab,
    className, handleDelete,
    textfind, kabupatenfind,
    order, orderBy,
    provinsisExport, filteredItems, handleOpen, selectedkabupaten,
    setselectedkabupaten,
    Export, ExportPDF,
    convertArrayOfObjectsToCSV,
    downloadCSV,
    rowSelect,
    setRowSelect,
    // setFormState,
    onChangeFind

    , ...rest } = props;


  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [laporKab, setLaporKab] = useState([])
  const [prov, setProv] = useState([]);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });




  const handleSearch = (event) => {
    const userId = localStorage.getItem('user_id');
    let url = urlAddKec;
    if (rowSelect.id_kecamatan === undefined) {
      url = urlShowKab;
    }

    //console.log(body);

    const requestOptions = {
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "KodeDepdagri": rowSelect.KodeDepdagri,
        "id_kecamatan": rowSelect.id_kecamatan,
        "id_kabupaten": rowSelect.id_kabupaten,
        "nama_kabupaten": rowSelect.nama_kabupaten,
        "IsActive": rowSelect.IsActive,
      })
    };


    ///let urlGetData=urlPostLogin
    alert(url);
    const response = fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })/**/

      .then(res => {
        //console.log(res)
        //console.log(res.data)
        alert(res.message)

        handleClose();
        getDataBackend();
        //alert("Sukses")
        const data = res;
      })
      .catch((e) => {

        swal("Gagal Login!", "Gagal Login", "error", null, '200x200')

        return false;


      });


  }





  const customStyles = {
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


  const handleChangeProvinsi = event => {
    handleChange(event)
    alert('kabupaten')
    showKab(event.target.value)
  }
  const handleChange = event => {

    //    event.persist();

    // const errors=validate(rowSelect, schema);

    setFormState(formState => ({
      ...rowSelect,
      // isValid: errors? false:true,
      // errors: errors||{}
    }));


    setRowSelect({
      ...rowSelect,
      [event.target.name]: event.target.value
    });
    // showKab(event.target.value)
  }


  async function getLaporanKab() {
    const requestOptions = {
      method: 'get',
      // mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url = urlShowKab
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        setLaporKab(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        alert(e);
        setLaporKab([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }




  async function getProv() {
    /* */
    const requestOptions = {
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url = urlProv
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        setProv(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        alert("Network Error");
        setProv([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }
  useEffect(() => {
    getProv()
    // alert('ini prov')
  }, [rowSelect])
  const columns = [
    // {
    //   name: 'Kode Depdagri',
    //   selector: 'KodeDepdagri',
    //   sortable: true,
    // },
    {
      name: 'Kabupaten',
      selector: 'Nama_Kabupaten',
      font: 'Poppins',
      sortable: true,
    },
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
      name: 'Jumlah Rw',
      selector: 'Jumlah_RW',
      sortable: true,
    }, {
      name: 'Jumlah Rt',
      selector: 'Jumlah_RT',
      sortable: true,
    },
  ];
  // const filteredItems=provinsis.filter(item => item.nama_provinsi&&item.nama_provinsi.toLowerCase().includes(filterText.toLowerCase()));
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
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

  const handleSelectAll = event => {

    //const { groups }=props;
    //setSelectedUsers
    let selectedkabupaten_var;

    if (event.target.checked) {
      selectedkabupaten_var = provinsis.map(provinsi => provinsi.id);
    } else {
      selectedkabupaten_var = [];
    }

    setselectedkabupaten(selectedkabupaten_var);
  };

  const handleSelectOne = (event, id) => {

    const selectedIndex = selectedkabupaten.indexOf(id);
    let newselectedkabupaten = [];

    if (selectedIndex === -1) {
      newselectedkabupaten = newselectedkabupaten.concat(selectedkabupaten, id);
    } else if (selectedIndex === 0) {
      newselectedkabupaten = newselectedkabupaten.concat(selectedkabupaten.slice(1));
    } else if (selectedIndex === selectedkabupaten.length - 1) {
      newselectedkabupaten = newselectedkabupaten.concat(selectedkabupaten.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedkabupaten = newselectedkabupaten.concat(
        selectedkabupaten.slice(0, selectedIndex),
        selectedkabupaten.slice(selectedIndex + 1)
      );
    }

    setselectedkabupaten(newselectedkabupaten);
    //console.log(selectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
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
              font="Poppins"
              title={rowSelect.nama_provinsi == undefined ? "Jumlah Wilayah" : "Jumlah Wilayah Di " + rowSelect.nama_provinsi}
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

LaporanKabupatenTable.propTypes = {
  className: PropTypes.string,
  filteredItems: PropTypes.array.isRequired
};

export default LaporanKabupatenTable;
