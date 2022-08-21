
import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { LaporanPerKabupatenTable, PerKabupatenSearchModi } from './components';
import { ModalComponent } from 'components';
//import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlKec,urlAddKec,urlEditKec,urlLaporanKec,urlShowKec,urlLaporanPerKab } from '../../kumpulanUrl'
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

const LaporanPerKabupaten=props => {
  //  componentWillMount() {
  //    alert("fdfdf")
  //  }
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }

  async function getPerKab() {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(perKabupaten);
    setOpen(false);

    /* */
    const requestOptions={
      method: 'get',
      mode: "cors",

      headers: { 'Content-Type': 'application/json' },
    };

    let urlgetKec=urlLaporanKec
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlgetKec, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setPerKabupaten(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setPerKabupaten([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }

  async function showPerKab(rowPerKabupatenSelect) {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(perKabupaten);
    setOpen(false);
    /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
        body: JSON.stringify({
          "id_kabupaten": rowPerKabupatenSelect.id_kabupaten,
        }),
      
      headers: { 'Content-Type': 'application/json' },
    };
// Menggunakan Having Clause Di Back-end
    let urlgetKec=urlLaporanPerKab
    // console.log(urlgetKec)
    // eslint-disable-next-line no-useless-concat
    // alert()
    const response=await fetch(urlgetKec, requestOptions)
      .then(res => {

        return res.json();
        
      })

      .then(resJson => {
        const data=resJson;
        setPerKabupaten(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setPerKabupaten([]);
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


  const deleteKecamatan=(e) => {
    const selectedkecamatan_string=selectedkecamatan.join("<batas></batas>");
    let kecamatan3=perKabupaten.filter(function (entry) {
      return entry&&entry.id&&selectedkecamatan_string.toUpperCase().indexOf(entry.id.toUpperCase())===-1;
    });
    setFilteredItems(kecamatan3)
    setPerKabupaten(kecamatan3)
    setProvinsifind('')
    //console.log("groups3",groups3);
    //findData(groupfind)
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
      let kecamatan4=perKabupaten.filter(function (entry) {
        return entry&&entry.nama_provinsi&&
          ((entry.nama_provinsi!==null? entry.nama_provinsi:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(kecamatan4)? kecamatan4:[kecamatan4]);

    } if (e.target.value.length==0) {
      setFilteredItems(perKabupaten);
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

    const title = "Laporan PerKabupaten";
    const headers = [["Jumlah Kecamatan", "Jumlah Kelurahan", "Jumlah RW", "Jumlah RT"]];

    const data = filteredItems.map(elt=> [elt.Jumlah_Kecamatan, elt.Jumlah_Kelurahan, elt.Jumlah_RW, elt.Jumlah_RT]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Laporan.pdf")
  }


  const [perKabupaten, setPerKabupaten]=useState([]);
  const [kab,setKab] = React.useState([]);
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowPerKabupatenSelect, setRowPerKabupatenSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedkecamatan, setSelectedPerKabupaten]=useState([]);
  const [kecamatanExport, setkecamatanExport]=useState([]);
  const [provinsifind, setProvinsifind]=useState([]);
  const [add,setAdd]=React.useState([])
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');

  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    // getPerKab();
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedPerKabupaten({
      ...setSelectedPerKabupaten,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmProvinsi, kdProvinsi, status, keyId) => {
    setRowPerKabupatenSelect({
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
    setRowPerKabupatenSelect(rowProvinsi);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleDelete=(e,rowProvinsi, MessageButton) => {
    setTitle(MessageButton);
    deleteProv()
    setRowPerKabupatenSelect(rowProvinsi);
  };

  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowPerKabupatenSelect(rowProvinsi);

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
      <ModalComponent getDataBackend={getPerKab}
        handleChange={handleChange} setData={setData}
        open={open} setRowSelect={setRowPerKabupatenSelect} rowSelect={rowPerKabupatenSelect}
        title={title} datas={filteredItems} 
        ComponenAddModi={componenPopup}>
         </ModalComponent>
    )
  }


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }}>Laporan Wilayah Per Kabupaten</h5>
      {/*}
      <kecamatanToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={provinsifind} deleteProvinsi={deleteProvinsi}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        perKabupaten={perKabupaten}

      />
  {*/}
      <div className={classes.content}>
        <PerKabupatenSearchModi
          getDataBackend={showPerKab}
          setKab={setKab}
          handleChange={handleChange} setData={setData}
          open={open} setRowSelect={setRowPerKabupatenSelect} rowSelect={rowPerKabupatenSelect}
          title={title} datas={filteredItems}
        />
        <LaporanPerKabupatenTable
          handleOpenViewMap={handleOpenViewMap}
          setKab={setKab}
          kab={kab}
          handleDelete={handleDelete}
          onChange={onChangefind}
          kecamatanExport={kecamatanExport}
          // deleteProv={deleteProv}
          // deleteProvinsi={deleteProvinsi}
          setRowSelect={setRowPerKabupatenSelect} 
          rowSelect={rowPerKabupatenSelect}
          provinsifind={provinsifind}
          filteredItems={filteredItems}
          selectedkecamatan={selectedkecamatan} 
          handleOpen={handleOpen}
          setSelectedPerKabupaten={setSelectedPerKabupaten}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}
          ExportPDF={ExportPDF}

        />


      {popupComponen(PerKabupatenSearchModi)}

      </div>

    </div>

  );
};

export default LaporanPerKabupaten;
