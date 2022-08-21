import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { ProvinsisToolbar, KelurahansTable, KelurahanAddModi, ViewMap } from './components';
import { ModalComponent } from 'components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import mockDataSettingKelurahan from './dataSettingkelurahan';
import { urlKel, urlAddKel, urlEditKel, urlDeleteKel} from '../../kumpulanUrl'
import '../../assets/vendor/dist/css/datatable.css';
import '../../assets/vendor/dist/css/datatable1.css';
import axios from 'axios';
import { async } from 'validate.js';
import { get } from 'underscore';

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

const KelurahanList=props => {
  //  componentWillMount() {
  //    alert("fdfdf")
  //  }
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }

  async function getKel() {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(kelurahans);
    setOpen(false);

    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlgetKel=urlKel
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlgetKel, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKelurahans(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setKelurahans([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }

  const deleteKel = async (id_kelurahan) => {  /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        id_kelurahan: id_kelurahan
      })
    };

    let url=urlDeleteKel
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKelurahans(data.data);
        setFilteredItems(data.data);
        getKel()
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setKelurahans([]);
        setFilteredItems([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }


  const csvData=() => {
    const tempCsv=[];
    const tempCsvItem=[];

    //];

    SettingKelurahan[0].HeaderData.map(headCell => {
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
    setKelurahansExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingKelurahan[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#kelurahanExport' })
      var posis_x=(doc.previousAutoTable.width-(SettingKelurahan[0].TitleModule).length)/2
      doc.text(SettingKelurahan[0].TitleModule, posis_x, 6);

      doc.save('kelurahan.pdf')
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
    if (e.target.value.length>=3) {
      setKelurahanfind(e.target.value)
      let kelurahans4=kelurahans.filter(function (entry) {
        return entry&&entry.nama_kelurahan&&
          ((entry.nama_kelurahan!==null? entry.nama_kelurahan:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(kelurahans4)? kelurahans4:[kelurahans4]);

    } if (e.target.value.length==0) {
      setFilteredItems(kelurahans);
    }
    setKelurahanfind(e.target.value)

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
    const headers = [["KodeDepdagri", "Nama Provinsi", "Nama kabupaten", "Nama Kecamatan", "Nama Kelurahan", "Keterangan", "Dibuat oleh", "Dibuat tanggal", "Terakhir diedit tanggal", "Terakhir diedit oleh"]];

    const data = filteredItems.map(elt=> [elt.KodeDepdagri, elt.nama_provinsi, elt.nama_kabupaten, elt.nama_kecamatan, elt.nama_kelurahan, elt.Keterangan, elt.CreatedBy, elt.Created, elt.LastModified, elt.LastModifiedBy]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("kec.pdf")
  }


  const [kelurahans, setKelurahans]=useState([]);
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowKelurahansSelect, setRowKelurahanSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedKelurahans, setSelectedKelurahans]=useState([]);
  const [kelurahansExport, setKelurahansExport]=useState([]);
  const [kelurahanfind, setKelurahanfind]=useState([]);

  const SettingKelurahan=useState(mockDataSettingKelurahan);
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');

  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    getKel();
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedKelurahans({
      ...setSelectedKelurahans,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmKelurahan, kdKelurahan, status, keyId) => {
    setRowKelurahanSelect({
      ...selectedKelurahans,
      [field1]: value1,

      [field2]: value2,
      ['kdKelurahan']: kdKelurahan,
      ['nmKelurahan']: nmKelurahan,
      ['status']: status,
      ['keyId']: keyId,
    });

    /**/
    //alert(field1+" "+value);
    //alert()

  };


  const handleOpen=(e, rowKelurahan, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    setRowKelurahanSelect(rowKelurahan);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };
  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowKelurahanSelect(rowKelurahan);

    //setCompPopup("Map")
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleDelete=(e, rowKelurahansSelect)=>{
    deleteKel(rowKelurahansSelect.id_kelurahan)
    
  }

  /**/
  //openPopup
  const handleClose=() => {
    setOpen(false);
  };


  function popupComponen(componenPopup) {
    return (
      <ModalComponent getDataBackend={getKel}
        handleChange={handleChange} setData={setData}
        open={open} setRowSelect={setRowKelurahanSelect} rowSelect={rowKelurahansSelect}
        title={title} datas={filteredItems} handleClose={handleClose}
        ComponenAddModi={componenPopup}></ModalComponent>

    )
  }


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }}>Kelurahan</h5>
      {/*}
      <ProvinsisToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={kelurahanfind} deleteKelurahan={deleteKelurahan}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        kelurahans={kelurahans}
      />
  {*/}
      <div className={classes.content}>
        <KelurahansTable
          handleOpenViewMap={handleOpenViewMap}
          kelurahans = {kelurahans}
          onChange={onChangefind}
          handleDelete={handleDelete}
          SettingKelurahan={SettingKelurahan}
          kelurahansExport={kelurahansExport}
          filteredItems={filteredItems}
          selectedKelurahans={selectedKelurahans} 
          handleOpen={handleOpen}
          setSelectedKelurahans={setSelectedKelurahans}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}
          ExportPDF={ExportPDF}

        />


        {popupComponen(KelurahanAddModi)}

      </div>

    </div>

  );
};

export default KelurahanList;