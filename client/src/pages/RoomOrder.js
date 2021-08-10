import defaultBcg from '../images/defaultImg.jpg'

import { Link } from 'react-router-dom'
import { RoomContext } from '../context'
import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios';
import styles from './styles';
import { Dialog, TextField, Card, CardContent, Typography, withStyles } from '@material-ui/core';
class RoomOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg,
            startDate: "2021-08-10",
            endDate: "2021-08-10"
        }
    }
    static contextType = RoomContext;
    setName = (value) => {
        this.setState({
            name: value
        })
    }
    setEndDate = (value) => {
        console.log(value)
        this.setState({
            endDate: value
        })
    }
    setStartDate = (value) => {
        this.setState({
            startDate: value
        })
        console.log(this.state.startDate, "startDate")
    }


    render() {
        const { classes } = this.props;
        const { getRoom, setUserSession, user, token } = this.context;
        console.log(JSON.parse(user).username)
        const room = getRoom(this.state.slug)
        const handleOrder = () => {
            if (this.state.startDate > this.state.endDate) {
                alert('Thời gian đặt phòng không hợp lệ')
                return;
            }
            axios.post(`http://localhost:4000/order/${this.state.slug}`,
                {
                    name: JSON.parse(user).name,
                    username: JSON.parse(user).username,
                    phone: JSON.parse(user).phone,
                    roomNumber: room.name,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                }, {
                headers: {
                    'authorization': `${token}`
                }
            }).then(response => {
                alert(response.data.message)

                if (response.data.error === false)
                    this.props.history.push("/rooms")
                return;
            }).catch(error => {
                console.log(error)
            })
        }

        return (
            <>
                <div className="log-in"></div>
                < div className={classes.background} >
                    <div className={classes.login}>
                        <Dialog open={true} >
                            <Card className={classes.form}>
                                <CardContent>
                                    <div className="text-xs-center pb-xs">
                                        <Typography variant="h5" style={{
                                            padding: 10,

                                        }}>Nhập thông tin đặt phòng</Typography>
                                    </div>
                                    <br></br>
                                    <TextField
                                        id="name"
                                        variant="outlined"
                                        label="Họ và tên"
                                        className={classes.TextField}
                                        fullWidth
                                        defaultValue={JSON.parse(user).name}
                                        onChange={(e) => {
                                            this.setName(e.target.value)
                                        }}
                                        style={{
                                            padding: 10,
                                            paddingTop: 20
                                        }}
                                    >
                                    </TextField>
                                    <TextField
                                        id="phone"
                                        variant="outlined"
                                        label="Số điện thoại"
                                        className={classes.TextField}

                                        fullWidth
                                        defaultValue={JSON.parse(user).phone}
                                        style={{
                                            padding: 10,

                                        }}
                                    >
                                    </TextField>

                                    <Typography variant='h6' margin="normal" style={{
                                        padding: 10,

                                    }}>Loại phòng: {room.type}</Typography>
                                    <Typography variant='h6' margin="normal"
                                        style={{
                                            padding: 10,

                                        }}>Số phòng: {room.name}</Typography>
                                    <Typography variant='h6' margin="normal"
                                        style={{
                                            padding: 10,

                                        }}>Giá: {room.price}</Typography>
                                    <TextField
                                        id="date"
                                        variant="outlined"
                                        label="Ngày đặt phòng"
                                        type="date"
                                        margin="normal"
                                        defaultValue="2021-08-10"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{
                                            padding: 10,

                                        }}
                                        onChange={(e) => {
                                            this.setStartDate(e.target.value)
                                        }}
                                    />

                                    <TextField
                                        id="date"
                                        variant="outlined"
                                        label="Ngày trả phòng"
                                        type="date"
                                        margin="normal"
                                        defaultValue="2021-08-10"
                                        className={classes.textField}
                                        style={{
                                            padding: 10,

                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {
                                            this.setEndDate(e.target.value)
                                        }}
                                    />

                                    <Button
                                        variant='contained'
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                        onClick={handleOrder}
                                    >
                                        Đặt phòng ngay
                                    </Button>

                                    <div className="pt-1 text-md-center">
                                        <Link to='/'>
                                            <Button>Quay về trang chủ</Button>
                                        </Link>

                                    </div>
                                </CardContent>
                            </Card>
                        </Dialog>
                    </div>
                </div >
            </>)
    }
}

export default withStyles(styles)(RoomOrder)