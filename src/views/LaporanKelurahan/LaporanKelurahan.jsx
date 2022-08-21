
import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { LaporanKelurahanTable, KelurahanSearchModi } from './components';
import { ModalComponent } from 'components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlKel,urlAddKel,urlEditKel,urlLaporanKel,urlShowKel } from '../../kumpulanUrl'
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

const LaporanKelurahan=props => {
  //  componentWillMount() {
  //    alert("fdfdf")
  //  }
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }

  async function getKel() {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(kelurahan);
    setOpen(false);

    /* */
    const requestOptions={
      method: 'post',
      // mode: "cors",

      headers: { 'Content-Type': 'application/json' },
    };

    let urlgetKel=urlLaporanKel
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlgetKel, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setkelurahan(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setkelurahan([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }

  async function showKel(rowkelurahanSelect) {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(kelurahan);
    setOpen(false);
    /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
        body: JSON.stringify({
          "id_kecamatan": rowkelurahanSelect.id_kecamatan,
        }),
      
      headers: { 'Content-Type': 'application/json' },
    };

    let urlgetKel=urlLaporanKel
    // alert(urlgetKel)
    // eslint-disable-next-line no-useless-concat
    // alert()
    const response=await fetch(urlgetKel, requestOptions)
      .then(res => {

        return res.json();
        
      })

      .then(resJson => {
        const data=resJson;
        setkelurahan(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setkelurahan([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }



  const deleteProv = async (id) => {
    // let url = urlDeleteProv;
    // try {
    //   let response = await axios.delete(url+`${id}`);
    // } catch {
    //   e=>{
    //     alert("error")
    //   }
    // }
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


  const deleteKelurahan=(e) => {
    const selectedkelurahan_string=selectedkelurahan.join("<batas></batas>");
    let kelurahan3=kelurahan.filter(function (entry) {
      return entry&&entry.id&&selectedkelurahan_string.toUpperCase().indexOf(entry.id.toUpperCase())===-1;
    });
    setFilteredItems(kelurahan3)
    setkelurahan(kelurahan3)
    setProvinsifind('')
    //console.log("groups3",groups3);
    //findData(groupfind)
  }
  
  const classes=useStyles();
  const printPdf=(e) => {
    //alert("dsdsd")
    setkelurahanExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingProvinsi[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#kelurahanExport' })
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
      let kelurahan4=kelurahan.filter(function (entry) {
        return entry&&entry.nama_provinsi&&
          ((entry.nama_provinsi!==null? entry.nama_provinsi:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(kelurahan4)? kelurahan4:[kelurahan4]);

    } if (e.target.value.length==0) {
      setFilteredItems(kelurahan);
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

    const title = "Laporan kelurahan";
    const headers = [["Nama Kelurahan", "Jumlah RW", "Jumlah RT"]];

    const data = filteredItems.map(elt=> [elt.Nama_Kelurahan, elt.Jumlah_RW, elt.Jumlah_RT]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Laporan.pdf")
  }


  const [kelurahan, setkelurahan]=useState([]);
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowkelurahanSelect, setRowkelurahanSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedkelurahan, setSelectedkelurahan]=useState([]);
  const [kelurahanExport, setkelurahanExport]=useState([]);
  const [provinsifind, setProvinsifind]=useState([]);
  const [add,setAdd]=React.useState([])
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');

  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    // getKel();
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedkelurahan({
      ...setSelectedkelurahan,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmProvinsi, kdProvinsi, status, keyId) => {
    setRowkelurahanSelect({
      ...selectedkelurahan,
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
    setRowkelurahanSelect(rowProvinsi);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleDelete=(e,rowProvinsi, MessageButton) => {
    setTitle(MessageButton);
    deleteProv()
    setRowkelurahanSelect(rowProvinsi);
  };

  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowkelurahanSelect(rowProvinsi);

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
      <ModalComponent getDataBackend={getKel}
        handleChange={handleChange} setData={setData}
        open={open} setRowSelect={setRowkelurahanSelect} rowSelect={rowkelurahanSelect}
        title={title} datas={filteredItems} 
        ComponenAddModi={componenPopup}>
         </ModalComponent>
    )
  }


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }}>Kelurahan</h5>
      {/*}
      <kelurahanToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={provinsifind} deleteProvinsi={deleteProvinsi}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        kelurahan={kelurahan}

      />
  {*/}
      <div className={classes.content}>
        <KelurahanSearchModi
          getDataBackend={showKel}
          handleChange={handleChange} setData={setData}
          open={open} setRowSelect={setRowkelurahanSelect} rowSelect={rowkelurahanSelect}
          title={title} datas={filteredItems}
        />
        <LaporanKelurahanTable
          handleOpenViewMap={handleOpenViewMap}
          handleDelete={handleDelete}
          onChange={onChangefind}
          kelurahanExport={kelurahanExport}
          // deleteProv={deleteProv}
          // deleteProvinsi={deleteProvinsi}
          provinsifind={provinsifind}
          filteredItems={filteredItems}
          selectedkelurahan={selectedkelurahan} 
          provinsifind={provinsifind}
          handleOpen={handleOpen}
          setSelectedkelurahan={setSelectedkelurahan}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}
          ExportPDF={ExportPDF}

        />


      {popupComponen(KelurahanSearchModi)}

      </div>

    </div>

  );
};

export default LaporanKelurahan;
