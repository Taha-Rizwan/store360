import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Drawer,  List,  ListItem, ListItemText} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';
import useStyles from './styles';

const PrimarySearchAppBar = ({ totalItems, categories }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [state, setState] = useState({
    right: false
  })
  const classes = useStyles();
  const location = useLocation();
  const toggleDrawer = (anchor,open) => (event) => {
    if (event.type ==='keydown'  && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open})
  } 
  const list = (anchor) => (
    <div

    className={classes.list}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categories.map((category) => (
          <ListItem button key={category.name} component={Link} to={`/category/${category.slug}`}>
            <ListItemText primary={category.name}></ListItemText>
          </ListItem>
        ))}
      </List>
    </div>

  )
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
            <Typography component={Link} to="/" >
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> 
            </Typography>
          <div className={classes.grow} />
         
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart color="primary"/>
              </Badge>
            </IconButton>
            </div>
           
            <div>
            {['right'].map((anchor, categories ) => (
              <div>
              <React.Fragment key={anchor}>
                <IconButton onClick={toggleDrawer(anchor, true)}>
                  <MenuIcon color="primary"/>
                </IconButton>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} classes={{paper: classes.paper}}>
                  {list(anchor, categories )}
                </Drawer>
              </React.Fragment> 
             </div>
        ))}
          
          </div>
          
         
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
