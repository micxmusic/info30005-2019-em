import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
  AccountCircle,
  Chat,
  Home,
  ShoppingBasket,
  Menu as MenuIcon,
  MoreVert,
  VerticalAlignBottom,
  Notifications,
  Search,
} from '@material-ui/icons';

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
    width: theme.spacing.unit * 9,
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
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
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

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    drawer: false,
    mobileMoreAnchorEl: null,
  };

  toggleDrawer = () => {
    this.setState({ drawer: !this.state.drawer });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, drawer, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isDrawerOpen = Boolean(drawer);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button key="Index" component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Index" />
          </ListItem>
          <ListItem button key="Marketplace" component={Link} to="/marketplace">
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText primary="Marketplace" />
          </ListItem>
          <ListItem button key="Drop" component={Link} to="/drop">
            <ListItemIcon>
              <VerticalAlignBottom />
            </ListItemIcon>
            <ListItemText primary="Drop" />
          </ListItem>
        </List>
      </div>
    );

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose} component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Chat />
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose} component={Link} to="/profile">
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        {/*
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit" component={Link} to="/profile">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        */}
      </Menu>
    );

    const mobileDrawer = (
      <Drawer open={isDrawerOpen} onClose={this.toggleDrawer}>
        <div tabIndex={0} role="button" onClick={this.toggleDrawer} onKeyDown={this.toggleDrawer}>
          {sideList}
        </div>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        {mobileDrawer}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer}
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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                inputProps={{ 'aria-label': 'search for drops' }}
                id="search-bar"
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button component={Link} to="/about">
                About
              </Button>
              <Button component={Link} to="/drops">
                Drops
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
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                aria-label="User Menu"
                color="inherit"
              >
                <MoreVert />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default memo(withStyles(styles)(PrimarySearchAppBar));
