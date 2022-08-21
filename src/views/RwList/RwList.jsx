
import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { RwTable, RwAddModi } from '../RwList/components';
import { ModalComponent } from 'components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlDeleteRw, urlRw,urlshowRw } from '../../kumpulanUrl'
import '../../assets/vendor/dist/css/datatable.css';
import '../../assets/vendor/dist/css/datatable1.css';
import axios from 'axios';

//import Modal from "@material-ui/core/Modal";
//import Backdrop from "@material-ui/core/Backdrop";
//import Fade from "@material-ui/core/Fade";

const useStyles=makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: '#fff',
  },
  content: {
    marginTop: theme.spacing(2)
  },
  yogi: {
    marginTop: theme.spacing(300)
  }
}));

const RwList=props => {
  
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }

  async function getRw() {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(rw);
    setOpen(false);

    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlGetRw=urlRw
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlGetRw, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setrw(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setrw([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }

  const deleteRw = async (id_rw) => {  /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        id_rw: id_rw
      })
    };

    let url=urlDeleteRw
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setrw(data.data);
        setFilteredItems(data.data);
        getRw()
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setrw([]);
        setFilteredItems([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  const csvData=() => {
    const tempCsv=[];
    const tempCsvItem=[];

    //];

    SettingRw[0].HeaderData.map(headCell => {
      tempCsvItem.push(
        headCell.label
      )
    });
    tempCsv.push(tempCsvItem)



    return tempCsv
  }

  
  const classes=useStyles();
  const printPdf=(e) => {
    //alert("dsdsd")
    setrwExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingRw[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#rwExport' })
      var posis_x=(doc.previousAutoTable.width-(SettingRw[0].TitleModule).length)/2
      doc.text(SettingRw[0].TitleModule, posis_x, 6);

      doc.save('rw.pdf')
    }, 2000);
    return () => clearTimeout(timer);


  }
  const getStatus=(status_prm) => {
    let status="";
    if (status_prm==='A')
      status='Active'
    else
      status='Inactive'
    return status;
  }
  const onChangefind=(e) => {
    // return;
    if (e.target.value.length>=1) {
      setrwfind(e.target.value)
      let rw4=rw.filter(function (entry) {
        return entry&&entry.nama_rw&&
          ((entry.nama_rw!==null? entry.nama_rw:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(rw4)? rw4:[rw4]);

    } if (e.target.value.length==0) {
      setFilteredItems(rw);
    }
    setrwfind(e.target.value)

    //console.log("user1", users1);
  }
  const Export=({ onExport }) => (
    <Button onClick={e => onExport(e.target)}>Export</Button>
  );


  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter=',';
    const lineDelimiter='\n';
    const keys=Object.keys(array[0]);
    result='';
    result+=keys.join(columnDelimiter);
    result+=lineDelimiter;

    array.forEach(item => {
      let ctr=0;
      keys.forEach(key => {
        if (ctr>0) result+=columnDelimiter;

        result+=item[key];

        ctr++;
      });
      result+=lineDelimiter;
    });

    return result;
  }

  function downloadCSV(e) {
    const link=document.createElement('a');
    let csv=convertArrayOfObjectsToCSV(filteredItems);
    if (csv==null) return;

    const filename='export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv=`data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  const ExportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Kabupaten Di Indonesia";
    const headers = [["KodeDepdagri", "Nama Provinsi", "Nama kabupaten", "Nama Kecamatan", "Nama Kelurahan", "Nama Rw", "Keterangan", "Dibuat oleh", "Dibuat tanggal", "Terakhir diedit tanggal", "Terakhir diedit oleh"]];

    const data = filteredItems.map(elt=> [elt.KodeDepdagri, elt.nama_provinsi, elt.nama_kabupaten, elt.nama_kecamatan, elt.nama_kelurahan, elt.nama_rw, elt.Keterangan, elt.CreatedBy, elt.Created, elt.LastModified, elt.LastModifiedBy]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("rw.pdf")
  }


  const [rw, setrw]=useState([]);
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowrwSelect, setRowrwSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedrw, setSelectedrw]=useState([]);
  const [rwExport, setrwExport]=useState([]);
  const [rwfind, setrwfind]=useState([]);
  const [add,setAdd]=React.useState([])
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');

  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    getRw();
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedrw({
      ...setSelectedrw,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmRw, kdRw, status, keyId) => {
    setRowrwSelect({
      ...selectedrw,
      [field1]: value1,

      [field2]: value2,
      ['kdRw']: kdRw,
      ['nmRw']: nmRw,
      ['status']: status,
      ['keyId']: keyId,
    });

    /**/
    //alert(field1+" "+value);
    //alert()

  };


  const handleOpen=(e, rowRw, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    setRowrwSelect(rowRw);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleDelete=(e,rowrwSelect) => {
    deleteRw(rowrwSelect.id_rw)
    
  };

  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowrwSelect(rowRw);

    //setCompPopup("Map")
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  /**/
  //openPopup
  const handleClose=() => {
    setOpen(false);
  };


  function popupComponen(componenPopup) {
    return (
      <ModalComponent getDataBackend={getRw}
        handleChange={handleChange} setData={setData}
        open={open} setRowSelect={setRowrwSelect} rowSelect={rowrwSelect}
        title={title} datas={filteredItems} handleClose={handleClose} 
        ComponenAddModi={componenPopup}>
         </ModalComponent>

    )
  }


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }}>rw</h5>
      {/*}
      <rwToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={rwfind} deleteRw={deleteRw}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        rw={rw}

      />
  {*/}
      <div className={classes.content}>
        <RwTable
          handleOpenViewMap={handleOpenViewMap}
          handleDelete={handleDelete}
          onChange={onChangefind}
          RwExport={rwExport}
          // deleteProv={deleteProv}
          // deleteRw={deleteRw}
          rwfind={rwfind}
          filteredItems={filteredItems}
          selectedrw={selectedrw} 
          handleOpen={handleOpen}
          setSelectedrw={setSelectedrw}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}
          ExportPDF={ExportPDF}

        />


      {popupComponen(RwAddModi)}

      </div>

    </div>

  );
};

export default RwList;
