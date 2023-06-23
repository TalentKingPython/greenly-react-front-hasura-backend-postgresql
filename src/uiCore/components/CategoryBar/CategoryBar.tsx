import React, { forwardRef, useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import classnames from 'classnames';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { IMenuItem, MENU_ITEMS, ICategoryBarProps } from './constants';

const useStyles = makeStyles<Theme, ICategoryBarProps>(styles);

export const CategoryBar = forwardRef<HTMLElement, ICategoryBarProps>(
  (props, _) => {
    const [activeItem, setActiveItem] = useState<string>('');
    const location = useLocation();
    const classes = useStyles(props);
    const rootClassName = classnames(classes.root);
    const titleClassName = classnames(classes.title);
    const scrolledClassName = classnames(classes.scrolledBox);
    const headerClassName = classnames(classes.header);

    useEffect(() => {
      const currentMenuItem = MENU_ITEMS.find(
        (item) => item.link === location.pathname
      );
      if (currentMenuItem) {
        setActiveItem(currentMenuItem.label);
      }
    }, [location.pathname]);

    const handleMenuItemClick = (item: IMenuItem) => {
      setActiveItem(item.label);
    };

    return (
      <div className={rootClassName}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Container maxWidth={'xl'}>
            <Box className={scrolledClassName}>
              <Box className={headerClassName}>
                {MENU_ITEMS.map((item) => (
                  <Typography
                    key={JSON.stringify(item)}
                    variant="h6"
                    className={titleClassName}
                  >
                    <Link
                      className={classnames({
                        [classes.active]:
                          activeItem === item.label ||
                          location.pathname === item.link,
                      })}
                      color="inherit"
                      to={item.link}
                      component={RouterLink}
                      onClick={() => handleMenuItemClick(item)}
                    >
                      {item.label}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Box>
          </Container>
        </AppBar>
      </div>
    );
  }
);
