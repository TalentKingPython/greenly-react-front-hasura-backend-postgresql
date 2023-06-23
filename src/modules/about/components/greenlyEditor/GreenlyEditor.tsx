import { Box, Grid, Link, Typography } from "@material-ui/core";
import classnames from "classnames";
import useStyles from "./styles";

export const GreenlyEditor = () => {
  const classes = useStyles();
  const headerClassNames = classnames(
    classes.headerText,
    classes.headerTextStyling
  );
  const bodyClassNames = classnames(classes.bodyText, classes.bodyTextStyling);
  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Typography className={headerClassNames} align="center">
              Become a Greenly Editor!
            </Typography>
            <Typography className={bodyClassNames} align="center">
              Be a voice for Greenly in your community! This can be as simple as
              a table at a town fair or a flyer at a coffee shop -- read more
              about what it means to be an{" "}
              <Link
                href="https://docs.google.com/document/d/1ngqsoHH2nVx5R1tkAHdjBQgKBUklkYq4zUzDnoAHCTc/edit"
                underline="always"
                color="inherit"
                target="_blank"
              >
                editor
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
