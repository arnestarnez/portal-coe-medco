import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { KabupatenTable, KabupatenAddModi } from '../KabupatenList/components';
import { ModalComponent } from 'components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlDeleteKab, urlKab,urlProv } from '../../kumpulanUrl'
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

const KabupatenList=props => {

  async function getKab() {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(kabupaten);
    setOpen(false);

    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlGetKab=urlKab
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlGetKab, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setkabupaten(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setkabupaten([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }

  const deleteKab = async (id_kabupaten) => {  /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        id_kabupaten: id_kabupaten
      })
    };

    let url=urlDeleteKab
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setkabupaten(data.data);
        setFilteredItems(data.data);
        getKab()
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setkabupaten([]);
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


  const deleteKabupaten=(e) => {
    const selectedkabupaten_string=selectedkabupaten.join("<batas></batas>");
    let kabupaten3=kabupaten.filter(function (entry) {
      return entry&&entry.id&&selectedkabupaten_string.toUpperCase().indexOf(entry.id.toUpperCase())===-1;
    });
    setFilteredItems(kabupaten3)
    setkabupaten(kabupaten3)
    setkabupatenfind('')
    //console.log("groups3",groups3);
    //findData(groupfind)
  }
  
  const classes=useStyles();
  const printPdf=(e) => {
    //alert("dsdsd")
    setkabupatenExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingProvinsi[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#kabupatenExport' })
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
      setkabupatenfind(e.target.value)
      let kabupaten4=kabupaten.filter(function (entry) {
        return entry&&entry.nama_kabupaten&&
          ((entry.nama_kabupaten!==null? entry.nama_kabupaten:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(kabupaten4)? kabupaten4:[kabupaten4]);

    } if (e.target.value.length==0) {
      setFilteredItems(kabupaten);
    }
    setkabupatenfind(e.target.value)

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
    const headers = [["KodeDepdagri", "Nama Provinsi", "Nama kabupaten", "Keterangan", "Dibuat oleh", "Dibuat tanggal", "Terakhir diedit tanggal", "Terakhir diedit oleh"]];

    const data = filteredItems.map(elt=> [elt.KodeDepdagri, elt.nama_provinsi, elt.nama_kabupaten, elt.Keterangan, elt.CreatedBy, elt.Created, elt.LastModified, elt.LastModifiedBy]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("kab.pdf")
  }


  const [kabupaten, setkabupaten]=useState([]);
  // const [provinsiId, setProvinsiId]=useState(getKab());
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowkabupatenSelect, setRowkabupatenSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedkabupaten, setSelectedkabupaten]=useState([]);
  const [kabupatenExport, setkabupatenExport]=useState([]);
  const [kabupatenfind, setkabupatenfind]=useState([]);
  const [add,setAdd]=React.useState([])
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');
  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    getKab();
    // console.log('prov',provinsiId)
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedkabupaten({
      ...setSelectedkabupaten,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmProvinsi, kdProvinsi, status, keyId) => {
    setRowkabupatenSelect({
      ...selectedkabupaten,
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


  const handleOpen=(e, rowKabupaten, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    setRowkabupatenSelect(rowKabupaten);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleDelete=(e,rowkabupatenSelect) => {
    deleteKab(rowkabupatenSelect.id_kabupaten)
    
  };

  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowkabupatenSelect(rowKabupaten);

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
      <ModalComponent getDataBackend={getKab}
        handleChange={handleChange} setData={setData} 
        open={open} setRowSelect={setRowkabupatenSelect} rowSelect={rowkabupatenSelect}
        title={title} datas={filteredItems} handleClose={handleClose} 
        ComponenAddModi={componenPopup}>
         </ModalComponent>

    )
  }


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }} className="font-poppins">Kabupaten</h5>
      {/*}
      <kabupatenToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={kabupatenfind} deleteProvinsi={deleteProvinsi}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        kabupaten={kabupaten}
      />
  {*/}
      <div className={classes.content}>
        <KabupatenTable
          handleOpenViewMap={handleOpenViewMap}
          handleDelete={handleDelete}
          onChange={onChangefind}
          kabupatenExport={kabupatenExport}
          // deleteProv={deleteProv}
          // deleteProvinsi={deleteProvinsi}
          kabupatenfind={kabupatenfind}
          filteredItems={filteredItems}
          selectedkabupaten={selectedkabupaten} 
          kabupatenfind={kabupatenfind}
          handleOpen={handleOpen}
          setSelectedkabupaten={setSelectedkabupaten}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}
          ExportPDF={ExportPDF}

        />


      {popupComponen(KabupatenAddModi)}

      </div>

    </div>

  );
};

export default KabupatenList;