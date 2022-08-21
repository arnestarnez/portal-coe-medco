
import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import {LaporanTargetTable } from './components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlProv, urlLaporanProv, urlshowRealisasiID } from '../../kumpulanUrl'
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

const LaporanTargetRealisasiID=props => {
  //  componentWillMount() {
  //    alert("fdfdf")
  //  }
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }

  async function showRealisasiID() {
    // const userId=localStorage.getItem('Periode Sensus');
    /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
        body: JSON.stringify({
          "Periode_Sensus": Periode,
          // "id_provinsi": rowsensusIDSelect.id_provinsi,
          // "id_sensusID": rowsensusIDSelect.id_sensusID,
        }),
      
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlshowRealisasiID
    // eslint-disable-next-line no-useless-concat
    // alert()
    const response=await fetch(url, requestOptions)
      .then(res => {

        return res.json();
        
      })

      .then(resJson => {
        const data=resJson;
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setFilteredItems([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  const csvData=() => {
    const tempCsv=[];
    const tempCsvItem=[];

    //];

    SettingProvinsi[0].HeaderData.map(headCell => {
      tempCsvItem.push(
        headCell.label
      )
    });
    tempCsv.push(tempCsvItem)



    return tempCsv
  }


  const deleteProvinsi=(e) => {
    const selectedProvinsis_string=selectedProvinsis.join("<batas></batas>");
    let provinsis3=provinsis.filter(function (entry) {
      return entry&&entry.id&&selectedProvinsis_string.toUpperCase().indexOf(entry.id.toUpperCase())===-1;
    });
    setFilteredItems(provinsis3)
    setProvinsis(provinsis3)
    setProvinsifind('')
    //console.log("groups3",groups3);
    //findData(groupfind)
  }
  
  const classes=useStyles();
  const printPdf=(e) => {
    //alert("dsdsd")
    setProvinsisExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingProvinsi[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#provinsisExport' })
      var posis_x=(doc.previousAutoTable.width-(SettingProvinsi[0].TitleModule).length)/2
      doc.text(SettingProvinsi[0].TitleModule, posis_x, 6);

      doc.save('provinsi.pdf')
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
      setProvinsifind(e.target.value)
      let provinsis4=provinsis.filter(function (entry) {
        return entry&&entry.Nama_Provinsi&&
          ((entry.Nama_Provinsi!==null? entry.Nama_Provinsi:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(provinsis4)? provinsis4:[provinsis4]);

    } if (e.target.value.length==0) {
      setFilteredItems(provinsis);
    }
    setProvinsifind(e.target.value)

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

    const title = "Laporan Target Realisasi Indonesia";
    const headers = [["Nama Provinsi", "Jumlah KK", "Jumlah Realisasi"]];

    const data = filteredItems.map(elt=> [elt.Nama_Provinsi, elt.Jumlah_KK, elt.Jumlah_Realisasi]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Laporan.pdf")
  }


  const [provinsis, setProvinsis]=useState([]);
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowProvinsisSelect, setRowProvinsisSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedProvinsis, setSelectedProvinsis]=useState([]);
  const [provinsisExport, setProvinsisExport]=useState([]);
  const [provinsifind, setProvinsifind]=useState([]);
  const [add,setAdd]=React.useState([])
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');
  const Periode = localStorage.getItem('Periode Sensus');
  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    showRealisasiID();
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedProvinsis({
      ...setSelectedProvinsis,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmProvinsi, kdProvinsi, status, keyId) => {
    setRowProvinsisSelect({
      ...selectedProvinsis,
      [field1]: value1,

      [field2]: value2,
      ['kdProvinsi']: kdProvinsi,
      ['nmProvinsi']: nmProvinsi,
      ['status']: status,
      ['keyId']: keyId,
    });

    /**/
    //alert(field1+" "+value);
    //alert()

  };


  const handleOpen=(e, rowProvinsi, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    setRowProvinsisSelect(rowProvinsi);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)
  };


  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowProvinsisSelect(rowProvinsi);
    //setCompPopup("Map")
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)
  };

  /**/
  //openPopup
  const handleClose=() => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }}>Indonesia</h5>
      {/*}
      <ProvinsisToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={provinsifind} deleteProvinsi={deleteProvinsi}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        provinsis={provinsis}

      />
  {*/}
      <div className={classes.content}>
        <LaporanTargetTable
          handleOpenViewMap={handleOpenViewMap}
          onChange={onChangefind}
          provinsisExport={provinsisExport}
          // getDataBackend={getProv}
          // deleteProvinsi={deleteProvinsi}
          provinsifind={provinsifind}
          filteredItems={filteredItems}
          selectedProvinsis={selectedProvinsis} 
          provinsifind={provinsifind}
          handleOpen={handleOpen}
          setSelectedProvinsis={setSelectedProvinsis}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}
          ExportPDF={ExportPDF}
          Periode={Periode}
        />

      </div>

    </div>

  );
};

export default LaporanTargetRealisasiID
