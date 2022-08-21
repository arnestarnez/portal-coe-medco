import React, {Component} from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Box, Typography, withStyles } from '@material-ui/core';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Swal from 'sweetalert2';
import { Rtif } from '../../Utils/Rtif';
import Container from '@material-ui/core/Container';
import Copyright from '../../Base/Global/Copyright';
import logo from '../../../assets/img/brand/title-login3.png';
import offshore from '../../../assets/img/loginz.PNG';
import dataUser from '../../Commons/jsonFile/user.json';

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url('/assets/img/bg3.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    form: {
        marginTop: '30px'
    },
    paper: {
        margin: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            fields: {
                username: "",
                password: "",
                remember_me: false
            },
            errors: {},
            blocking: false,
            user: dataUser,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //username
        if(!fields["username"]){
           formIsValid = false;
           errors["username"] = true;
        }

        if(typeof fields["username"] !== "undefined"){
            // let lastAtPos = fields["username"].lastIndexOf('@');
            // let lastDotPos = fields["username"].lastIndexOf('.');

            // if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["username"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["username"].length - lastDotPos) > 2)) {
            //   formIsValid = false;
            //   errors["username"] = true;
            // }
            // if(fields["username"] !== 'admin' && fields["username"] !== 'BP' && fields["username"] !== 'BPL' && fields["username"] !== 'BPP' && fields["username"] !== 'BPK' && fields["username"] !== 'KPA') {
            //   formIsValid = false;
            //   errors["username"] = true;
            // }
        }  
        
        //Password
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = true;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleChange(e, field){         
        let fields = this.state.fields;
        const errors = this.state.errors;
        switch (field) {
            case 'remember_me':
                fields[field] = e.target.checked;   
                break;
            case 'username':
                fields[field] = e.target.value;
                errors["username"] = false;
                this.setState({errors: errors});   
                break;
            case 'password':
                fields[field] = e.target.value;
                errors["password"] = false;
                this.setState({errors: errors});   
                break;
            default:
                fields[field] = e.target.value;
                break;
        }
        this.setState({fields});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({blocking: true});

        if(this.handleValidation()){
            localStorage.clear();
            const username = this.state.fields.username
            const password = this.state.fields.password
            let level = ''
            if (username && password) {
                var x = 0
                var job = ''
                var dept = ''
                var name = ''
                this.state.user.forEach(row => {
                    if(username === row.user && password === row.password){
                        level = row.level
                        job = row.job
                        dept = row.dept
                        name = row.name
                        x++;
                    }
                });
                if (x > 0) {
                    Swal.fire({
                        title: 'Sukses!',
                        icon: 'success',
                        text: 'Login Berhasil.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    .then(() => {
                        localStorage.setItem('token', username + password);
                        localStorage.setItem('level', level);
                        localStorage.setItem('username', username);
                        localStorage.setItem('job', job);
                        localStorage.setItem('dept', dept);
                        localStorage.setItem('name', name);
                        this.props.history.push('/home');
                    })
                } else {
                    Swal.fire({  
                        title: 'Peringatan',  
                        icon: 'warning',
                        text: 'ID atau password anda salah!',  
                    });
                    this.setState({blocking: false});
                }
            } else {
                Swal.fire({  
                    title: 'Peringatan',  
                    icon: 'warning',
                    text: 'Masukkan ID dan password anda.',  
                });
                this.setState({blocking: false});
            }
            // const form = {
            //     username: this.state.fields.username,
            //     password: this.state.fields.password,
            //     remember_me: this.state.fields.remember_me
            // }
            // this.setState({blocking: false});
            // localStorage.setItem('token', this.state.fields.username);
            // this.props.history.push('/home');
        }else{
            Swal.fire({  
                title: 'Warning',  
                icon: 'warning',
                text: 'Login Failed.',  
            });
            this.setState({blocking: false});
        }
    }

    render() {
        const { classes } = this.props;
        const { fields } = this.state;
        const styleImg = {
            // backgroundImage: `url(${imgrepeat})`,
            marginTop: '0px',
            paddingTop: '0px',
            backgroundImage: 'linear-gradient(to bottom, #a3bded, #6991c7)',
            height: '100vh',
        };
        return (
            <BlockUi tag="div" blocking={this.state.blocking} message="Please wait">
                <div style={styleImg}>
                    <div className="d-none d-sm-block" style={{height:'20px'}}></div>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className="lgn">
                            <img src={offshore} alt='' style={{width:'calc(100% + 82px)', height: '237px', marginTop: '-2px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}/>
                            <div className='titleBgLogin'>
                                <img src={logo} alt=''/>
                            </div>                            
                            {/* <Typography component="h1" variant="h5" className="welcome">
                                Welcome
                            </Typography> */}
                            {/* <Typography className="fs12b" style={{marginTop:'10px'}}>
                                Please login with your credential account.
                            </Typography> */}
                            <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
                                <TextField
                                    onChange={(e) => this.handleChange(e, 'username')}
                                    value={fields["username"]}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    error={this.state.errors["username"]}
                                    style={{background: 'white'}}
                                />
                                <Rtif boolean={this.state.errors["username"]}>
                                    <div className='error_input'><i className="icon-cancel-circle2"></i></div>
                                </Rtif>
                                <TextField
                                    onChange={(e) => this.handleChange(e, 'password')}
                                    value={fields["password"]}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={this.state.errors["password"]}
                                    style={{background: 'white'}}
                                />
                                <Rtif boolean={this.state.errors["password"]}>
                                    <div className='error_input'><i className="icon-cancel-circle2"></i></div>
                                </Rtif>
                                <FormControlLabel className="fs12"
                                    control={<Checkbox onChange={(e) => this.handleChange(e, 'remember_me')} value={fields["remember_me"]} name="remember_me" color="primary"/>}
                                    label={<Typography className="smallCheck">Remember Me</Typography>}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    // color="primary"
                                    // className={classes.submit}
                                    className="btnLogin"
                                >
                                LOGIN <i className="icon-arrow-right8" style={{marginTop: '3px', fontSize: '12px', marginLeft: '10px'}}></i>
                                </Button>
                                <Box className="d-block d-sm-none" style={{marginTop: '30px', height:'calc(100vh - 648px)'}}>
                                    <Copyright nclass={"ftr"}/>
                                </Box>
                                <Box className="d-none d-sm-block" style={{marginTop: '30px'}}>
                                    <Copyright nclass={""}/>
                                </Box>
                            </form>
                        </div>
                    </Container>
                </div>
            </BlockUi>
        )
    }
}

export default  withStyles(styles, { withTheme: true})(Login); 