
import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { LaporanKbPerkabTable, LaporanKbSearch} from './components';
import { ModalComponent } from 'components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlRealisasiPerkab, urlShowLaporanSensusPerKab,urlRealisasiKBPerKab } from '../../kumpulanUrl'
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

const LaporanKbPerKab=props => {

  async function showLaporanSensusPerKab(rowsensusIDSelect) {
    // const userId=localStorage.getItem('Periode Sensus');
    /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
        body: JSON.stringify({
          "Periode_Sensus": rowsensusIDSelect.Periode_Sensus,
          "id_kabupaten": rowsensusIDSelect.id_kabupaten,
          // "id_sensusID": rowsensusIDSelect.id_sensusID,
        }),
      
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlRealisasiKBPerKab
    // eslint-disable-next-line no-useless-concat
    // alert()
    const response=await fetch(url, requestOptions)
      .then(res => {

        return res.json();
        
      })

      .then(resJson => {
        const data=resJson;
        setSensus(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        setSensus([]);
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


  const deletesensus=(e) => {
    const selectedsensus_string=selectedsensus.join("<batas></batas>");
    let sensus3=sensus.filter(function (entry) {
      return entry&&entry.id&&selectedsensus_string.toUpperCase().indexOf(entry.id.toUpperCase())===-1;
    });
    setFilteredItems(sensus3)
    setSensus(sensus3)
    setSensusfind('')
    //console.log("groups3",groups3);
    //findData(groupfind)
  }
  
  const classes=useStyles();
  const printPdf=(e) => {
    //alert("dsdsd")
    setSensusExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingProvinsi[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#sensusExport' })
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
  const comboBox=(e) =>{
    if (e.targer.value.length>=3) {
      
    }
  }
  const onChangefind=(e) => {
    // return;
    if (e.target.value.length>=3) {
      setSensusfind(e.target.value)
      let sensus4=sensus.filter(function (entry) {
        return entry&&entry.Nama_Kecamatan&&
          ((entry.Nama_Kecamatan!==null? entry.Nama_Kecamatan:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(sensus4)? sensus4:[sensus4]);

    } if (e.target.value.length==0) {
      setFilteredItems(sensus);
    }
    setSensusfind(e.target.value)

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

    const title = "Laporan Target KB Perkabupaten";
    const headers = [["Nama Kecamatan", "Alat Kontrasepsi", "Jumlah Pemakaian"]];

    const data = filteredItems.map(elt=> [elt.nama_kecamatan, elt.alat_kb, elt.Jumlah_Pemakai]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Laporan.pdf")
  }


  const [sensus, setSensus]=useState([]);
  const [kab, setKab]=useState([]);
  // const [provinsiId, setProvinsiId]=useState(getKab());
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowsensusSelect, setRowsensusSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedsensus, setSelectedsensus]=useState([]);
  const [sensusExport, setSensusExport]=useState([]);
  const [sensusfind, setSensusfind]=useState([]);
  const [add,setAdd]=React.useState([])
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');
  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    // getKab();
    // console.log('prov',provinsiId)
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedsensus({
      ...setSelectedsensus,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmProvinsi, kdProvinsi, status, keyId) => {
    setRowsensusSelect({
      ...selectedsensus,
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

  // async function showKab(id_provinsi) {
  //   /* */
  //   const requestOptions={
  //     method: 'POST',
  //     //mode: "cors",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       "id_provinsi": id_provinsi,
  //     })
  //   };

  //   let urlShow=urlShowKab
  //   // eslint-disable-next-line no-useless-concat
  //   const response=await fetch(urlShow, requestOptions)
  //     .then(res => {
  //       return res.json();
  //     })

  //     .then(resJson => {
  //       const data=resJson;
  //       console.log('sensus =',data.data)
  //       setSensus(data.data);
  //       //return false;
  //     })
  //     .catch(e => {
  //       //console.log(e);
  //       alert("Nextwork Error");
  //       setSensus([]);
  //       //this.setState({ ...this.state, isFetching: false });
  //     });
  // } 


  const handleOpen=(e, rowsensus, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    setRowsensusSelect(rowsensus);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowsensusSelect(rowsensus);

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
      <h5 style={{ color: 'black' }} className="font-poppins"></h5>
      {/*}
      <sensusToolbar
        handleOpenViewMap={handleOpenViewMap}
        deleteProvinsi={deleteProvinsi}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        sensus={sensus}

      />
  {*/}<LaporanKbSearch
        getDataBackend={showLaporanSensusPerKab}
        setSensus={setSensus}
        handleChange={handleChange} setData={setData}
        open={open} setRowSelect={setRowsensusSelect} 
        rowSelect={rowsensusSelect}
        title={title} datas={filteredItems}
      />
      <div className={classes.content}>
        <LaporanKbPerkabTable
          handleOpenViewMap={handleOpenViewMap}
          rowSelect={rowsensusSelect}
          sensus={sensus}
          getDataBackend={showLaporanSensusPerKab}
        // textfind={sensusfind} 
          onChange={onChangefind}
          // showKab={showKab}
          sensusExport={sensusExport}
          sensusfind={sensusfind}
          filteredItems={filteredItems}
          setRowSelect={setRowsensusSelect} rowSelect={rowsensusSelect}
          selectedsensus={selectedsensus} 
          sensusfind={sensusfind}
          handleOpen={handleOpen}
          setSelectedsensus={setSelectedsensus}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}
          ExportPDF={ExportPDF}

        />


      </div>

    </div>

  );
};

export default LaporanKbPerKab;
