import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { KecamatanTable, KecamatanAddModi } from '../KecamatanList/components';
import { ModalComponent } from 'components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlKec,urlDeleteKec } from '../../kumpulanUrl'
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

const KecamatanList=props => {
  //  componentWillMount() {
  //    alert("fdfdf")
  //  }
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }

  async function getKec() {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(kecamatan);
    setOpen(false);

    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlgetKec=urlKec
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlgetKec, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setkecamatan(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setkecamatan([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }

  const deleteKec = async (id_kecamatan) => {  /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        id_kecamatan: id_kecamatan
      })
    };

    let url=urlDeleteKec
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setkecamatan(data.data);
        setFilteredItems(data.data);
        getKec()
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setkecamatan([]);
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
  
  const classes=useStyles();
  const printPdf=(e) => {
    //alert("dsdsd")
    setkecamatanExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingProvinsi[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#kecamatanExport' })
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
      let kecamatan4=kecamatan.filter(function (entry) {
        return entry&&entry.nama_kecamatan&&
          ((entry.nama_kecamatan!==null? entry.nama_kecamatan:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(kecamatan4)? kecamatan4:[kecamatan4]);

    } if (e.target.value.length==0) {
      setFilteredItems(kecamatan);
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

    const title = "Kabupaten Di Indonesia";
    const headers = [["KodeDepdagri", "Nama Provinsi", "Nama kabupaten", "Nama Kecamatan", "Keterangan", "Dibuat oleh", "Dibuat tanggal", "Terakhir diedit tanggal", "Terakhir diedit oleh"]];

    const data = filteredItems.map(elt=> [elt.KodeDepdagri, elt.nama_provinsi, elt.nama_kabupaten,elt.nama_kecamatan, elt.Keterangan, elt.CreatedBy, elt.Created, elt.LastModified, elt.LastModifiedBy]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("kec.pdf")
  }


  const [kecamatan, setkecamatan]=useState([]);
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowkecamatanSelect, setRowkecamatanSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedkecamatan, setSelectedkecamatan]=useState([]);
  const [kecamatanExport, setkecamatanExport]=useState([]);
  const [provinsifind, setProvinsifind]=useState([]);
  const [add,setAdd]=React.useState([])
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');

  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    getKec();
    //   alert(setOpen) 
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedkecamatan({
      ...setSelectedkecamatan,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmProvinsi, kdProvinsi, status, keyId) => {
    setRowkecamatanSelect({
      ...selectedkecamatan,
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
    setRowkecamatanSelect(rowProvinsi);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleDelete=(e,rowkecamatanSelect) => {
    deleteKec(rowkecamatanSelect.id_kecamatan)
    
  };

  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowkecamatanSelect(rowProvinsi);

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
      <ModalComponent getDataBackend={getKec}
        handleChange={handleChange} setData={setData}
        open={open} setRowSelect={setRowkecamatanSelect} rowSelect={rowkecamatanSelect}
        title={title} datas={filteredItems} handleClose={handleClose} 
        ComponenAddModi={componenPopup}>
         </ModalComponent>

    )
  }


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }}>Kecamatan</h5>
      {/*}
      <kecamatanToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={provinsifind} deleteProvinsi={deleteProvinsi}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        kecamatan={kecamatan}
      />
  {*/}
      <div className={classes.content}>
        <KecamatanTable
          handleOpenViewMap={handleOpenViewMap}
          handleDelete={handleDelete}
          onChange={onChangefind}
          kecamatanExport={kecamatanExport}
          // deleteProv={deleteProv}
          // deleteProvinsi={deleteProvinsi}
          provinsifind={provinsifind}
          filteredItems={filteredItems}
          selectedkecamatan={selectedkecamatan} 
          handleOpen={handleOpen}
          setSelectedkecamatan={setSelectedkecamatan}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}
          ExportPDF={ExportPDF}

        />


      {popupComponen(KecamatanAddModi)}

      </div>

    </div>

  );
};

export default KecamatanList;