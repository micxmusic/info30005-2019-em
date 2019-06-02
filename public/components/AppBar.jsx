import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar as MaterialAppBar,
  Button,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
  AccountCircle,
  Chat,
  ExitToApp,
  Home,
  Menu as MenuIcon,
  MoreVert,
  Notifications,
  PersonAdd,
  PowerSettingsNew,
  Search,
  ShoppingBasket,
  VerticalAlignBottom,
} from '@material-ui/icons';
import { AuthContext } from './AuthContext';

const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    position: 'fixed !important',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    display: 'flex',
    marginLeft: -10,
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '50%',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      left: '50%',
      marginLeft: '-12.5%',
      width: '25%',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

function AppBar(props) {
  const { classes, history } = props;
  const [formData, setFormData] = useState({ searchTerm: '' });
  const { token, setUser, setToken } = useContext(AuthContext);
  const [drawer, setDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isDrawerOpen = Boolean(drawer);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logout = () => {
    handleMenuClose();
    handleMobileMenuClose();
    history.push('/');
    setUser({});
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const sideList = (
    <div className={classes.list}>
      <List>
        <ListItem button key="Index" component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Index" />
        </ListItem>
        {token ? (
          <>
            <ListItem button key="Marketplace" component={Link} to="/marketplace">
              <ListItemIcon>
                <ShoppingBasket />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItem>
            <ListItem button key="New Drop" component={Link} to="/newdrop">
              <ListItemIcon>
                <VerticalAlignBottom />
              </ListItemIcon>
              <ListItemText primary="New Drop" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button key="Login" component={Link} to="/login">
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button key="Register" component={Link} to="/register">
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/account">
        My account
      </MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton color="inherit">
          <Chat />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/profile">
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton color="inherit">
          <PowerSettingsNew />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const mobileDrawer = (
    <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
      <div tabIndex={0} role="button" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
        {sideList}
      </div>
    </Drawer>
  );

  const handleChange = event => {
    setFormData({ [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    history.push(`/search/${formData.searchTerm}`);
  };

  return (
    <div className={classes.root}>
      {mobileDrawer}
      <MaterialAppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Button
            className={classes.title}
            component={Link}
            to="/"
            style={{ textTransform: 'none' }}
          >
            <Typography variant="h5" color="inherit" noWrap>
              Sustineo
            </Typography>
          </Button>
          <div className={classes.grow} />
          {token ? (
            <div className={classes.search}>
              <form onSubmit={handleSubmit}>
                <TextField
                  className={classes.inputRoot}
                  id="searchTerm"
                  name="searchTerm"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChange}
                />
                <input type="submit" value="Search" hidden />
              </form>
            </div>
          ) : (
            <></>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {token ? (
              <>
                <Button component={Link} to="/marketplace">
                  Marketplace
                </Button>
                <Button component={Link} to="/newdrop">
                  New Drop
                </Button>
                <IconButton color="inherit">
                  <Chat />
                </IconButton>
                <IconButton color="inherit">
                  <Notifications />
                </IconButton>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Button component={Link} to="/login">
                  Login
                </Button>
                <Button component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </div>
          {token ? (
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                aria-label="User Menu"
                color="inherit"
              >
                <MoreVert />
              </IconButton>
            </div>
          ) : (
            <></>
          )}
        </Toolbar>
      </MaterialAppBar>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AppBar));
