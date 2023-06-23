import classNames from 'classnames';
import { useGrayStyles, useStyles } from 'modules/writingGuidelines/styles';
import { Box, Grid, Typography } from '@material-ui/core';

const Introduction = () => {
  const grayStyles = useGrayStyles();
  const classes = useStyles();
  const rootClassName = classNames(grayStyles.root);
  const headerClassName = classNames(
    classes.headerTextStyling,
    classes.mainTitleText
  );
  const bodyClassNames = classNames(classes.bodyText, classes.bodyTextStyling);

  return (
    <div className={rootClassName}>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography className={headerClassName} align="center">
              Greenly is the front page of the Green Revolution.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography className={bodyClassNames} align="center">
              Greenly is a selective online environmental publication that
              provides a forum for readers, writers, experts, students, and
              everyone in-between to discuss the topics at the forefront of our
              collective concerns. As a writer, you’ll be able to use Greenly to
              share your knowledge with readers around the world. Your article
              will be reviewed and edited by real environmentalists. So submit
              an article to join the conversation and help shape the future of
              our planet.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Introduction;
