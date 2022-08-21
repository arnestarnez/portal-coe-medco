import React, { useState, useEffect } from 'react';
//import '../../assets/vendor/dist/css/datatable1.css';
//import { ImportScript } from '../components';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { VuserToolbar, KelompokDataTable, KelompokDataAddModi, V, KelompokDataAddModiiewMap } from './components';
import { ModalComponent } from 'components';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { urlKab,urlGetVuser,urlGetKelompokData, urlDeleteKelompokData } from '../../kumpulanUrl'

import '../../assets/vendor/dist/css/datatable.css';
import '../../assets/vendor/dist/css/datatable1.css';
import axios from 'axios';
import { async } from 'validate.js';
import Swal from 'sweetalert2';

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

const KelompokDataList=props => {
  //  componentWillMount() {
  //    alert("fdfdf")
  //  }
  const { history }=props;
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/beranda');

  }

  async function getKelompokData() {
    const userId=localStorage.getItem('user_id');
    setFilteredItems(Vuser);
    setOpen(false);

    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlGetKelompokData
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setVuser(data.data);
        setFilteredItems(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setVuser([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }



  async function deleteKelompokData(Id_kelompok_data) {
    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Id_kelompok_data: Id_kelompok_data
      })
    };

    let url=urlDeleteKelompokData
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setVuser(data.data);
        setFilteredItems(data.data);
        getKelompokData()
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setVuser([]);
        setFilteredItems([]);
        setOpen(false);
        //this.setState({ ...this.state, isFetching: false });
      });

    setOpen(false);
  }

  const csvData=() => {
    const tempCsv=[];
    const tempCsvItem=[];

    //];

    SettingVuser[0].HeaderData.map(headCell => {
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
    setVuserExport(flteredItems);
    const doc=new jsPDF()

    const timer=setTimeout(() => {
      doc.setProperties({ title: SettingVuser[0].TitleModule });
      doc.viewerPreferences({ 'DisplayDocTitle': true });
      doc.autoTable({ html: '#VuserExport' })
      var posis_x=(doc.previousAutoTable.width-(SettingVuser[0].TitleModule).length)/2
      doc.text(SettingVuser[0].TitleModule, posis_x, 6);

      doc.save('Vuser.pdf')
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
      setVuserfind(e.target.value)
      let Vuser4=Vuser.filter(function (entry) {
        return entry&&entry.UserName&&
          ((entry.UserName!==null? entry.UserName:'').toUpperCase().indexOf(e.target.value.toUpperCase())!==-1);
      });
      setFilteredItems(Array.isArray(Vuser4)? Vuser4:[Vuser4]);

    } if (e.target.value.length==0) {
      setFilteredItems(Vuser);
    }
    setVuserfind(e.target.value)

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

    const title = "kelompok Data";
    const headers = [["Nama Kelompok Data", "Dibuat oleh", "Dibuat tanggal", "Terakhir diedit tanggal", "Terakhir diedit oleh"]];

    const data = filteredItems.map(elt=> [elt.nama_kelompok_data, elt.CreatedBy, elt.Created, elt.LastModified, elt.LastModifiedBy]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Kelompok.pdf")
  }


  const [Vuser, setVuser]=useState([]);
  const [filteredItems, setFilteredItems]=useState([]);
  const [rowVuserSelect, setRowVuserSelect]=useState({});
  const [open, setOpen]=React.useState(false);
  const [title, setTitle]=React.useState(false);
  const [selectedVuser, setSelectedVuser]=useState([]);
  const [VuserExport, setVuserExport]=useState([]);
  const [Vuserfind, setVuserfind]=useState([]);
  const [add,setAdd]=React.useState([])
  // const SettingVuser=useState(mockDataSettingVuser);
  const [order, setOrder]=React.useState('asc');
  const [orderBy, setOrderBy]=React.useState('keyId');

  const [compPopup, setCompPopup]=useState(null);

  useEffect(() => {
    getKelompokData();
    //   alert(setOpen)
  }, [order, orderBy]);
  // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {
    //setData(event.target.name, event.target.value);


    setSelectedVuser({
      ...setSelectedVuser,
      [event.target.name]: event.target.value[0]
    });

  };


  const setData=(field1, value1, field2, value2, nmVuser, kdVuser, status, keyId) => {
    setRowVuserSelect({
      ...selectedVuser,
      [field1]: value1,

      [field2]: value2,
      ['kdVuser']: kdVuser,
      ['nmVuser']: nmVuser,
      ['status']: status,
      ['keyId']: keyId,
    });

    /**/
    //alert(field1+" "+value);
    //alert()

  };


  const handleOpen=(e, rowVuser, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    setRowVuserSelect(rowVuser);
    //setCompPopup("NonMap")
    //console.log("rowgroup", rowgroup)


  };

  const handleDelete=(e,rowVuserSelect) => {
    deleteKelompokData(rowVuserSelect.Id_kelompok_data).then( Swal.fire( {position: 'center',
    icon: 'success',
    title: 'Sukses Menambah Data',
    showConfirmButton: false,
    timer: 1000}))
    
  };

  /* */
  const handleOpenViewMap=(e, MessageButton) => {
    setOpen(true);
    setTitle(MessageButton);
    //    alert(title)
    //setRowVuserSelect(rowVuser);

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
      <ModalComponent getDataBackend={getKelompokData}
        handleChange={handleChange} setData={setData}
        open={open} setRowSelect={setRowVuserSelect} rowSelect={rowVuserSelect}
        title={title} datas={filteredItems} handleClose={handleClose} 
        ComponenAddModi={componenPopup}>
         </ModalComponent>

    )
  }


  return (
    <div className={classes.root}>
      <h5 style={{ color: 'black' }}>Kelompok Data</h5>
      {/*}
      <VuserToolbar
        handleOpenViewMap={handleOpenViewMap}
        textfind={Vuserfind} deleteVuser={deleteVuser}
        csvData={csvData} printPdf={printPdf} onChange={onChangefind}
        handleOpen={handleOpen}
        Vuser={Vuser}
      />
  {*/}
      <div className={classes.content}>
        <KelompokDataTable
          handleOpenViewMap={handleOpenViewMap}
          getMockData={getMockData}
          Vuser = {Vuser}
          handleDelete={handleDelete}
          onChange={onChangefind}
          // SettingVuser={SettingVuser}
          VuserExport={VuserExport}
          // deleteProv={deleteProv}
          // deleteVuser={deleteVuser}
          Vuserfind={Vuserfind}
          filteredItems={filteredItems}
          selectedVuser={selectedVuser} 
          handleOpen={handleOpen}
          setSelectedVuser={setSelectedVuser}
          Export={Export}
          convertArrayOfObjectsToCSV={convertArrayOfObjectsToCSV}
          downloadCSV={downloadCSV}
          ExportPDF={ExportPDF}

        />


      {popupComponen(KelompokDataAddModi)}

      </div>

    </div>

  );
};

export default KelompokDataList;
