import React from 'react';
import PropTypes from 'prop-types';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from '@material-ui/styles';
import { Button } from "@material-ui/core";


const useStyles=makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    left: '10%',
    justifyContent: "center",
    overflow: 'scroll',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "80%",
    height: "90%",
    overflow: 'scroll'
  }
}));


const ModalComponent=props => {
  const { datas,
    handleChange, getProv, getDataBackend, setData2, setData,
    setRowSelect, users, groups, roles, className, style, open, setOpen, title, rowSelect,
    ComponenAddModi, ViewMap, handleClose, AnggotaKK, setAnggotaKK,
    auditTrailsfind, ...rest }=props;
  const classes=useStyles();
  //alert("open="+open);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      //onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        {/* */}

        <div className={classes.paper}>
          <h2 id="transition-modal-title">&nbsp;</h2>
          <ComponenAddModi getProv={getProv} getDataBackend={getDataBackend}
            setData2={setData2}
            handleChange={handleChange} setData={setData}
            setOpen={setOpen} setAnggotaKK={setAnggotaKK} 
            AnggotaKK={AnggotaKK}
            setRowSelect={setRowSelect} datas={datas} users={users} groups={groups}
            roles={roles} rowSelect={rowSelect} title={title} handleClose={handleClose}
            auditTrailsfind={auditTrailsfind}
          ></ComponenAddModi>

          {/*}          <UserAddModi rowUsersSelect={rowUsersSelect} title={title} handleClose={handleClose}></UserAddModi>

{*/}        </div>

        {/**/}


      </Fade>
    </Modal>
  );
};
ModalComponent.propTypes={
  className: PropTypes.string,
  handleClose: PropTypes.func,
  open: PropTypes.func,
  style: PropTypes.object
};

export default ModalComponent;
