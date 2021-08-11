import React from "react";
import  Container  from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer>
            <Box
                px={{ xs: 3, sm: 10 }}
                py={{xs:5,sm:10}}
                bgcolor="text.secondary"
                color="white">
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1} style={{ fontSize: '1.5rem' }}>Về chúng tôi</Box>
                            <Box>
                                Comming soon
                            </Box>
                            
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1} style={{fontSize:'1.5rem' }}>Đường dẫn</Box>
                            <Box>
                                <Link to='/'>
                                    Trang chủ
                                </Link>
                            </Box>
                            <Box>
                                <Link to='/rooms'>
                                    Danh sách phòng
                                </Link>
                            </Box>
                            <Box>
                                <Link to='/login'>
                                   Đăng nhập
                                </Link>
                            </Box>
                            <Box>
                                <Link to='/singup'>
                                    Đăng ký
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1} style={{ fontSize: '1.5rem' }}>Thông tin liên hệ</Box>
                            <Box>
                                Địa chỉ:Thị trấn Tứ Hạ, Thừa Thiên Huế
                            </Box>
                            <Box >
                               Số điện thoại: 037 341 7528
                            </Box>
                           
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        </footer>

    );
}

export default Footer;