import { forwardRef } from 'react';
import { makeStyles, Theme, Box, Grid, Typography } from '@material-ui/core';
import { styles } from './styles';
import classnames from 'classnames';
import { MailForm } from '../MailForm';

const useStyles = makeStyles<Theme, IMailFormFooterProps>(styles);

export interface IMailFormFooterProps {
  variant?: 'primary' | 'secondary';
}

export const MailFormFooter = forwardRef<HTMLElement, IMailFormFooterProps>(
  (props, _) => {
    const classes = useStyles(props);
    const rootClassName = classnames(classes.root);
    const headerClassName = classnames(
      classes.headerText,
      classes.headerTextStyling
    );

    return (
      <div className={rootClassName}>
        <Box display="flex" justifyContent="center">
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography className={headerClassName} align="center">
                Stay ahead of the curve!
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box ml="auto">
                <MailForm variant="primary" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
);
