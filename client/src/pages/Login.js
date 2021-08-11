import React, { useState } from 'react'
import axios from 'axios';
import styles from './styles';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Button, TextField, Card, CardContent, Typography, withStyles } from '@material-ui/core';
import {
    useContext
} from 'react';
import { RoomContext } from '../context';
function LoginPage(props) {
    const [loading, setLoading] = useState(false);
    const context = useContext(RoomContext);
    const { setUserSession } = context
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const useStyle = makeStyles(styles)
    const classes = useStyle();
    const handleLogin = () => {

        setError(null);
        setLoading(true);

        axios.post('http://localhost:4000/login', { username: username, password: password }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push("/")

        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) alert(error.response.data.message);
            else alert("Something went wrong. Please try again later.");
        });
    }

    return (
        <>  <div className='log-in'></div>
            <div className={classes.background}>
                <div className={classes.login}>
                    <Dialog open={true} >
                        <Card className={classes.form}>
                            <CardContent>

                                <div className="text-xs-center pb-xs">
                                    <Typography variant="h5">Đăng nhập</Typography>
                                </div>
                                <TextField
                                    id="email"
                                    label="Tên đăng nhập"
                                    className={classes.TextField}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => {

                                        setUserName(e.target.value)
                                    }}
                                >

                                </TextField>
                                <TextField
                                    id="password"
                                    label="Mật khẩu"
                                    className={classes.TextField}
                                    margin="normal"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}

                                >

                                </TextField>
                                <Button
                                    variant='contained'
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    onClick={handleLogin}
                                    value={loading ? 'Loading...' : 'Login'}
                                >
                                    Đăng nhập
                                </Button>
                                <div className="pt-1 " display="flex" >
                                    <Link to='/signup'>
                                        <Button
                                            variant='contained'
                                            style={{
                                                marginTop: 10,

                                                width: '50%'
                                            }}>Đăng ký tài khoản</Button>
                                    </Link>


                                    <Link to='/'>
                                        <Button
                                            variant='contained'
                                            style={{
                                                width: '50%',
                                                marginTop: 10,
                                            }}>Về trang chủ
                                        </Button>
                                    </Link>

                                </div>

                            </CardContent>
                        </Card>
                    </Dialog>
                </div>
            </div>
        </>
    )
}


export default withStyles(styles)(LoginPage)