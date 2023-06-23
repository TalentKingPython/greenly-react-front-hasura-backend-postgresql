import { makeStyles, Box, Grid, Typography, Theme } from '@material-ui/core';
import { styles } from './styles';
import classnames from 'classnames';

const useStyles = makeStyles<Theme, IAboutDescriptionProps>(styles);

export interface IAboutDescriptionProps {
  variant: 'primary' | 'secondary';
}

export const AboutDescription = (props: IAboutDescriptionProps) => {
  const classes = useStyles(props);
  const rootClassName = classnames(classes.root);
  const headerClassName = classnames(
    classes.headerText,
    classes.headerTextStyling
  );
  const bodyClassNames = classnames(classes.bodyText, classes.bodyTextStyling);

  return (
    <div className={rootClassName}>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography className={headerClassName} align="center">
              About Us
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography className={bodyClassNames} align="center">
              Greenly is designed for environmentalists and climate change
              activists to come together and discuss the future of our planet.
              Whether you’re here to read, write, or join in on the
              conversation, all are welcome. Greenly is a place where great
              minds of the present can chat with the budding young leaders of
              the future. Come join the Green Revolution.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
