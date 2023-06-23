import React, { forwardRef } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link, Box, Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import { useContext } from 'react';
import { AuthContext } from '../../../modules/firebase/context/authContext';
import firebase from 'firebase/compat/app';
import classnames from 'classnames';
import { GreenlyLogo } from '../GreenlyLogo';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import useProfile from 'modules/hooks/useProfile';
import { ButtonBase as Button, IconButton, TextField } from '@mui/material';
import MenuIcon from '@material-ui/icons/Menu';
import { LinkText } from './constants';
import { MENU_ITEMS } from 'uiCore/components/CategoryBar/constants';

const useStyles = makeStyles<Theme, INavbarProps>(styles);

export interface INavbarProps {
  variant?: 'primary' | 'secondary';
}

export const Navbar = forwardRef<HTMLElement, INavbarProps>((props, _) => {
  const history = useHistory();
  const classes = useStyles(props);
  const [anchorElNav, setAnchorElNav] =
    React.useState<null | HTMLElement>(null);

  const rootClassName = classnames(classes.root);
  const appBarContainer = classes.appBarContainer;
  const navbarText = classnames(classes.navbarText, classes.navbarTextStyling);
  const submitButtonText = classnames(
    classes.submitButtonText,
    classes.submitButtonTextStyling
  );
  const submitButtonLink = classnames(classes.submitButtonLink);
  const navbarIcon = classnames(
    classes.floatRight,
    classes.navbarIcon,
    classes.inLineBlock
  );
  const loginText = classnames(
    classes.floatRight,
    classes.loginText,
    classes.inLineBlock,
    classes.loginPadding
  );
  const rightContainer = classes.rightContainer;
  const noPadding = classes.noPadding;
  const dropdownItem = classes.dropdownItem;
  const submitButton = classes.submitButton;
  const mobileVisible = classnames(classes.mobileVisible, classes.navbarIcon);

  const currentUser = useContext(AuthContext);
  const userID = currentUser?.uid;

  const { error, loading, data } = useProfile(userID || '', '');

  const profileLink = data?.users[0]?.profileLink;

  const profileUrl =
    !loading && !error && profileLink ? `/${profileLink}` : `/user/${userID}`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [term, setTerm] = React.useState('');
  const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const DropMenu = () => {
    return (
      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} className={dropdownItem}>
            <Link
              component={RouterLink}
              to={profileUrl}
              underline="none"
              color="inherit"
            >
              {LinkText.profileLinkText}
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} className={dropdownItem}>
            <Link
              component={RouterLink}
              to={'/help'}
              underline="none"
              color="inherit"
            >
              {LinkText.helpLinkText}
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              firebase.auth().signOut();
              setAnchorEl(null);
            }}
            className={dropdownItem}
          >
            {LinkText.logoutLinkText}
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      history.push(`/search/` + term);
    }
  };

  return (
    <div className={rootClassName}>
      <Box>
        <AppBar className={appBarContainer} position="static" color="inherit">
          <Container maxWidth="xl">
            <Toolbar className={noPadding}>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {MENU_ITEMS.map((item) => (
                    <MenuItem key={item.label} onClick={handleCloseNavMenu}>
                      <Typography variant="h6">
                        <Link
                          color="inherit"
                          to={item.link}
                          component={RouterLink}
                        >
                          {item.label}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleClose} className={dropdownItem}>
                    <Link
                      component={RouterLink}
                      to={profileUrl}
                      underline="none"
                      color="inherit"
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} className={dropdownItem}>
                    <Link
                      component={RouterLink}
                      to={'/help'}
                      underline="none"
                      color="inherit"
                    >
                      Help
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => firebase.auth().signOut()}
                    className={dropdownItem}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
              <Link component={RouterLink} color="inherit" to="/">
                <GreenlyLogo />
              </Link>

              <Typography className={navbarText}>
                Front page of the green revolution.
              </Typography>

              <Box className={rightContainer}>
                {history.location.pathname !== '/submit' && (
                  <Link
                    component={RouterLink}
                    to="/submit"
                    color="inherit"
                    underline="none"
                    className={submitButtonLink}
                  >
                    <Typography className={submitButtonText}>
                      Submit an article
                    </Typography>
                  </Link>
                )}

                <Button
                  type="submit"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={() => history.push(`/search/` + term)}
                  className={submitButton}
                >
                  <FiSearch size={30} className={navbarIcon} />
                </Button>
                <TextField
                  label="Search"
                  id="outlined-size-small"
                  value={term}
                  onChange={handleTermChange}
                  onKeyPress={handleSearch}
                  InputProps={{
                    endAdornment: (
                      <FiSearch size={30} className={mobileVisible} />
                    ),
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ '& .MuiOutlinedInput-root': { pr: 0 } }}
                />
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {currentUser && (
                    <div>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <FaRegUserCircle size={30} className={navbarIcon} />
                      </Button>
                      <DropMenu />
                    </div>
                  )}

                  {!currentUser && (
                    <Typography className={loginText}>
                      <Link component={RouterLink} color="inherit" to={'/auth'}>
                        Login
                      </Link>
                    </Typography>
                  )}
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
});
