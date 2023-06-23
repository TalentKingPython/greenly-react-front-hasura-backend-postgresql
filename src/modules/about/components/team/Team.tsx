import {
  makeStyles,
  Theme,
  LinearProgress,
  Container,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import { styles } from './styles';
import classnames from 'classnames';
import { AuthorCard } from 'uiCore/components/AuthorCard';
import { gql, useQuery } from '@apollo/client';

export const GET_TEAM_MEMBERS = gql`
  query getTeamMembers {
    users(where: { role: { _eq: ADMIN } }, limit: 4) {
      id
      bio
      username
      profilePicture
      name
      profileLink
    }
  }
`;

const useStyles = makeStyles<Theme, ITeamProps>(styles);

export interface ITeamProps {
  variant: 'primary' | 'secondary';
}

export interface Author {
  name: string;
  bio: string;
  id: number;
  username: string;
  profilePicture: string;
  profileLink: string;
}

export const Team = (props: ITeamProps) => {
  const classes = useStyles(props);
  const headerClassName = classnames(
    classes.headerText,
    classes.headerTextStyling
  );
  const membersClassName = classnames(classes.members);

  const { loading, error, data } = useQuery(GET_TEAM_MEMBERS);
  if (error) {
    console.log(error);
    return <p> Error fetching team members </p>;
  }
  if (loading) {
    return <LinearProgress color="secondary" />;
  }
  const teamData = data.users;
  const teamMembers = teamData.map((author: Author) => {
    return (
      <AuthorCard key={author.id} variant="primary" size={6} data={author} />
    );
  });

  const bodyClassNames = classnames(classes.bodyText, classes.bodyTextStyling);

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Container maxWidth="xl">
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography className={headerClassName} align="center">
                Our Team
              </Typography>
            </Grid>
            <Grid>
              <Typography className={bodyClassNames} align="center">
                Greenly was started by a group of Wesleyan University alumni in
                2020. Concerned about the direction the climate change
                conversation was heading in, we realized there wasn’t a singular
                platform where people could discuss the future of our planet. We
                decided to change that. What started out as a group of four
                passionate friends we hope will one day expand to millions of
                people across the globe.
              </Typography>
            </Grid>
            <Grid container className={membersClassName} spacing={5}>
              {teamMembers}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};
