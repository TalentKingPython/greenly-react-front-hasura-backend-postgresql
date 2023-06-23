import { Box, Grid, Typography } from '@material-ui/core';
import classnames from 'classnames';
import {
  useGrayStyles,
  useStyles,
  useWhiteStyles,
} from 'modules/writingGuidelines/styles';
import { useMemo } from 'react';

type Props = {
  title: string;
  body: string;
  tags?: string[];
  isGray: boolean;
};

const GeneralGuidelineItem = ({ title, body, tags, isGray }: Props) => {
  const whiteClasses = useWhiteStyles();
  const grayClasses = useGrayStyles();
  const classes = useStyles();
  const bodyClassNames = classnames(classes.bodyText, classes.bodyTextStyling);
  const titleClassNames = classnames(
    classes.bodyText,
    classes.bodyTextStyling,
    classes.titleText
  );
  const rootClassName = useMemo(() => {
    if (isGray) {
      return classnames(grayClasses.root);
    }

    return classnames(whiteClasses.root);
  }, [isGray, grayClasses, whiteClasses]);

  const tagsContainerClassNames = classnames(classes.tagsContainer);
  const tagsClassNames = classnames(classes.tag);

  return (
    <div className={rootClassName}>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Grid item xs={12}>
              <Typography className={titleClassNames} align="center">
                {title}
              </Typography>
              <Typography className={bodyClassNames} align="center">
                {body}
              </Typography>
              {tags && (
                <Grid
                  container
                  justifyContent="center"
                  className={tagsContainerClassNames}
                >
                  {tags.map((tag) => {
                    const tagText = tag.split(' ').map((word) => {
                      return word[0].toUpperCase() + word.slice(1) + ' ';
                    });
                    return (
                      <Typography className={tagsClassNames} align="center">
                        {tagText}
                      </Typography>
                    );
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default GeneralGuidelineItem;
