import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 60
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    cursor: 'pointer'
  },
}));

export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    history.push(path);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    sessionStorage.removeItem('user');
    setLoggedInUser({});
  };

  return (

    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title} >
          <span onClick={() => history.push('/home')} className={classes.logo}>
            Room Finder
          </span>
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
            {loggedInUser.username && <Typography variant="subtitle1" className={classes.title} >
              {loggedInUser.username}
            </Typography>}
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
            onClose={handleClose}
          >
            {
              loggedInUser.username &&
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            }
            {
              !loggedInUser.username &&
              <MenuItem onClick={() => handleClose('/login')}>Login</MenuItem>
            }
            {
              !loggedInUser.username &&
              <MenuItem onClick={() => handleClose('/register')}>Register</MenuItem>
            }
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
