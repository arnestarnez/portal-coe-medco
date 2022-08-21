import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import AddIcon from '@material-ui/icons/AddBoxOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteSweepOutlined';
// npm install --save-dev @iconify/react @iconify/icons-mdi
import { Icon, InlineIcon } from '@iconify/react';
import IconRoom from '@material-ui/icons/Room';

import fileExcel from '@iconify/icons-mdi/file-excel';
//import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { CSVLink } from "react-csv";

const useStyles=makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));


const ProvinsisToolbar=props => {
  const { className, handleOpenViewMap, textfind, provinsis, csvData2, csvData, printPdf, deleteProvinsi, ProvinsisTable,
    handleOpen, ...rest }=props;
  //const { className, onChange, style, ...rest }=props;

  const classes=useStyles();
//   <Button
//   color="primary"
//   //variant="contained"
//   style={{ paddingLeft: 0, paddingRight: 0, marginLeft: "0%" }}

//   id="Add_Provinsi"
//   onClick={(e) => handleOpen(e, [], "Add Provinsi")}

// >
//   <AddIcon />
// </Button>
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <span className={classes.spacer} />

      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button color="primary" className={classes.importButton} onClick={(e) => printPdf(e, [])}>
        <img src="/img/pdf.jpeg" />
        </Button>
        <CSVLink data={csvData()} className={classes.importButton}>
        <img src="/img/xls.jpeg" />

        </CSVLink>

        <Button
          color="primary"
          //variant="contained"
          style={{ paddingLeft: 0, paddingRight: 0, marginLeft: -4 }}

          id="Lihat_Peta_Povinsi"
          onClick={(e) => handleOpenViewMap(e, "Lihat Peta Povinsi")}

        >
          <IconRoom />
        </Button>



        &nbsp;



      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search Provinsi"
          textfind={textfind}
        />
      </div>
    </div>
  );
};

ProvinsisToolbar.propTypes={
  className: PropTypes.string
};

export default ProvinsisToolbar;
