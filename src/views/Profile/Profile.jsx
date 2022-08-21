import React from "react"
import { ModalComponent } from 'components';
import ProfileAddModi from "./components/ProfileAddModi";
import Swal from "sweetalert2";
import Popup from 'reactjs-popup'
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
    DialogContent
} from '@material-ui/core';
const Profile = () => {


    const [rowSelect, setRowSelect] = React.useState({})
    rowSelect.id = localStorage.getItem('id')

    return (
        <div className=" justify-center text-center mb-96  bg-indigo-700  ">
            <Card>
                <CardHeader
                    subheader=""
                    title={
                        <div className="  font-poppins ">
                            <p className="text-center">{localStorage.getItem("NamaLengkap")}</p>
                        </div>
                    }
                />
                <Divider />
                <CardContent className="bg-blue-900 sm:text-black lg:text-white">
                    <Grid
                        container
                        spacing={0}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <DialogContent

                            >
                                Username : {localStorage.getItem('username')}



                            </DialogContent>
                            <DialogContent>
                                Nama Lengkap : {localStorage.getItem('NamaLengkap')}
                            </DialogContent>
                            <DialogContent

                            >
                                Nomor Induk : {localStorage.getItem('NIK')}



                            </DialogContent>

                        </Grid>
                        <Grid
                            item
                            md={3}
                            xs={12}
                        >
                            <DialogContent

                            >
                                Jabatan : {localStorage.getItem('Jabatan')}



                            </DialogContent>
                            <DialogContent

                            >
                                Alamat : {localStorage.getItem('Alamat')}



                            </DialogContent>


                            <Popup trigger={<button className="btn btn-md bg-green-700 mt-2 ">Ubah Profile</button>}>
                                <ProfileAddModi
                                    rowSelect={rowSelect}
                                    setRowSelect={setRowSelect}
                                />
                            </Popup>


                        </Grid>
                    </Grid>
                </CardContent>


            </Card>

            {/* <div className="row">
                <div className="col-6-lg">
                    Hi
                </div>
                <div className="col-6-lg">Hi</div>
            </div> */}
        </div>


    )
}
export default Profile;