import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { ProvinsisToolbar, ProvinsisTable, ProvinsiAddModi, ViewMap } from './components';
import { ModalComponent } from 'components';
import mockData from './dataPropinsi';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import mockDataSettingProvinsi from './dataSettingprovinsi';
import { urlProv,urlDeleteProv } from 'kumpulanUrl';
import Swal from 'sweetalert2';


import '../../assets/vendor/dist/css/datatable.css';
import '../../assets/vendor/dist/css/datatable1.css';
import axios from 'axios';
import { async } from 'validate.js';

//import Modal from "@material-ui/core/Modal";
//import Backdrop from "@material-ui/core/Backdrop";
//import Fade from "@material-ui/core/Fade";

const getMockData=() =>{
  mockData.map(mock => {
    return(
      <h4>{mock}</h4>

    )
  })
  // console.log(mockData)

  
}

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

const ProvinsiList=props => {
  //  componentWillMount() {
  //    alert("fdfdf")
  //  }
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }

  async function getProv() {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(provinsis);
    setOpen(false);

    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlgetProv=urlProv
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlgetProv, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setProvinsis(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setProvinsis([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }



  const deleteProv = async (id_provinsi) => {  /* */
    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        id_provinsi: id_provinsi
      })
    };

    let url=urlDeleteProv
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setProvinsis(data.data);
        setFilteredItems(data.data);
        getProv()
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setProvinsis([]);
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


  

  const deleteProvinsi=async (e, id) => {
    const selectedProvinsis_string=selectedProvinsis.join("<batas></batas>");
    let provinsis3=provinsis.filter(function (entry) {
      return entry&&entry.id&&selectedProvinsis_string.toUpperCase().indexOf(entry.id.toUpperCase())===-1;
    });

    let url=urlDeleteProv
    if (url === 200) {
      // thisClickedFunda.closest("tr").remove();
      // console.log(url.data.message)
    }

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
        return entry&&entry.nama_provinsi&&
          ((entry.nama_provinsi!==null? entry.nama_provinsi:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
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

    const title = "Provinsi Di Indonesia";
    const headers = [["Provinsi ID", "KodeDepdagri", "Nama Provinsi", "Keterangan", "Dibuat oleh", "Dibuat tanggal", "Terakhir diedit tanggal", "Terakhir diedit oleh"]];

    const data = filteredItems.map(elt=> [elt.id_provinsi, elt.KodeDepdagri, elt.nama_provinsi, elt.Keterangan, elt.CreatedBy, elt.Created, elt.LastModified, elt.LastModifiedBy]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("prov.pdf")
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
  const SettingProvinsi=useState(mockDataSettingProvinsi);
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');

  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    getProv();
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

  const handleDelete=(e,rowProvinsisSelect) => {
    deleteProv(rowProvinsisSelect.id_provinsi).then(Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data Berhasil Dihapus',
      showConfirmButton: false,
      timer: 1000
    }))
    
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


  function popupComponen(componenPopup) {
    return (
      <ModalComponent getDataBackend={getProv}
        handleChange={handleChange} setData={setData}
        open={open} setRowSelect={setRowProvinsisSelect} rowSelect={rowProvinsisSelect}
        title={title} datas={filteredItems} 
        ComponenAddModi={componenPopup}>
         </ModalComponent>
    )
  }


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }}>Provinsi</h5>
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
        <ProvinsisTable
          handleOpenViewMap={handleOpenViewMap}
          getMockData={getMockData}
          provinsis = {provinsis}
          handleDelete={handleDelete}
          onChange={onChangefind}
          deleteProvinsi={deleteProvinsi}
          SettingProvinsi={SettingProvinsi}
          provinsisExport={provinsisExport}
          // deleteProv={deleteProv}
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

        />


      {popupComponen(ProvinsiAddModi)}

      </div>

    </div>

  );
};

export default ProvinsiList;
