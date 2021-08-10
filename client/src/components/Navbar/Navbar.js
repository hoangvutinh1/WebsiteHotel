import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import { useContext } from 'react';
import { RoomContext } from '../../context';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.down("xs")]: { flexGrow: 1 }

    },
    headerOptions: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end'
    },

}));
const NavBar = (props) => {
    const context = useContext(RoomContext);
    const { removeUserSession, user } = context
    const { history ,location} = props;
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"))
   /*  useEffect(() => {

        setUser(sessionStorage.getItem('user'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]) */
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (pageUrl) => {
        history.push(pageUrl)
        setAnchorEl(null);
    };
    const handleLogout = () => {
        removeUserSession();
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Nhà nghỉ Kim Vui
                    </Typography>
                    {auth && (
                        <>
                            {isMobile ? (
                                <>
                                    <IconButton onClick={handleMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={() => setAnchorEl(null)}
                                    >
                                        <MenuItem onClick={() => handleMenuClick('/')}>Trang chủ</MenuItem>
                                        <MenuItem >
                                            <Link to="/rooms" style={{ color: 'black' }}>Danh sách phòng</Link>
                                        </MenuItem>
                                        {
                                            !user && <MenuItem onClick={() => handleMenuClick('/login')}>Đăng nhập</MenuItem>
                                        }
                                        
                                        {user &&
                                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                        }
                                    </Menu>
                                </>) :
                                <div className={classes.headerOptions}>
                                    <Button variant="contained" className={classes.menuButton} onClick={() => handleMenuClick('/')}>
                                        Trang chủ
                                    </Button>
                                    <Button variant="contained" className={classes.menuButton} onClick={() => handleMenuClick('/rooms')}>
                                        Danh sách phòng
                                    </Button>
                                    {!user && <Button variant="contained" className={classes.menuButton} onClick={() => handleMenuClick('/login')}>
                                        Đăng nhập
                                    </Button>
                                    
                                    }
                                    {
                                        user && <Button variant="contained" className={classes.menuButton} onClick={handleLogout}>
                                           Đăng xuất
                                        </Button>
                                    }
                                   
                                </div>}

                        </>

                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default withRouter(NavBar);