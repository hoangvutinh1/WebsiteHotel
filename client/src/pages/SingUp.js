import React, { useState } from 'react'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';
import { setUserSession } from '../Utils/Common';
import { isEmpty } from 'validator/lib/isEmpty';
import isEmail from "validator/lib/isEmail"
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Button, TextField, Card, CardContent, Typography } from '@material-ui/core';
function SignUp(props) {
    const styles = {
        background: {
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            alignCenter: 'center',
            justifyContent: 'center',

            flex: '1 0 auto'
        },
        form: {
            maxWidth: '50vh',
            justifyContent: 'center',
            margin: '0 auto',

        },
        textLeft: {
            textAlign: 'left'
        }
    }
    const [loading, setLoading] = useState(false);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const useStyle = makeStyles(styles)
    const classes = useStyle();
    const validateAll = () => {
        const msg = {}
        if (name === '') {
            msg.name = "Hãy nhập họ và tên"
        }
        if (password === '') {
            msg.password = "Nhập mật khẩu"
        }
        if (username === '') {
            msg.username = "Nhập tên đăng nhập"
        }
        if (phone === '') {
            msg.phone = "Nhập số điện thoại"
        }
        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    const handleSignUp = async () => {
        const isValidate = validateAll();

        if (!isValidate) return;
        setError(null);
        setLoading(true);
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword)
        axios.post('http://localhost:4000/signup', { name: name, phone: phone, username: username, password: hashedPassword }).then(response => {
            setLoading(false);

            props.history.push('/login');
            alert("Đăng ký tài khoản thành công")
        }).catch(error => {
            setLoading(false);

            if (error.response.status === 401) alert(error.response.data.message);
            else setError("Something went wrong. Please try again later.");

        });
    }
    return (
        <>
            <div className='sign-up'></div>
            <div className={classes.background}>
                <div >
                    <Dialog open={true} >
                        <Card className={classes.form}>
                            <CardContent >
                                <form>
                                    <div className="text-xs-center pb-xs">
                                        <Typography variant="h5">Đăng ký</Typography>
                                    </div>
                                    <TextField
                                        id="name"
                                        label="Họ và tên"
                                        className={classes.TextField}
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}

                                    ></TextField>

                                    <label className={`text-red-400 text-xs italic`} id="text-left">{validationMsg.username}</label>
                                    <TextField
                                        id="phone"
                                        label="Số điện thoại"
                                        className={classes.TextField}
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            setPhone(e.target.value)
                                        }}

                                    ></TextField>
                                    <p className="text-red-400 text-xs italic text-left">{validationMsg.phone}</p>
                                    <TextField
                                        id="username"
                                        label="Tên đăng nhập"
                                        className={classes.TextField}
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            setUserName(e.target.value)
                                        }}

                                    >

                                    </TextField>
                                    <p className="text-red-400 text-xs italic text-left">{validationMsg.username}</p>
                                    <TextField
                                        id="password"
                                        label="Mật khẩu"
                                        className={classes.TextField}
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            setPassword(e.target.value)
                                        }}

                                    >

                                    </TextField>
                                    <p className="text-red-400 text-xs italic text-left">{validationMsg.password}</p>
                                    <Button
                                        variant='contained'
                                        color="primary"
                                        fullWidth
                                        type="button"
                                        onClick={handleSignUp}
                                        value={loading ? 'Loading...' : 'SignUp'}
                                        disabled={loading}
                                        className={{ dislay: 'flex' }}
                                        style={{
                                            marginBottom: 10,

                                        }}
                                    >
                                        Đăng ký tài khoản
                                    </Button>
                                    <div className="pt-1 text-md-center flex">
                                        <Link to='/login'>
                                            <Button
                                                variant='contained'

                                                fullWidth
                                                type="button"
                                            >Đã có tài khoản? Đăng nhập</Button>
                                        </Link>

                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </Dialog>
                </div>
            </div>
        </>)
}


export default SignUp;