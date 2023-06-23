import { useParams } from 'react-router-dom';
import { UserProfileBody } from 'uiCore/components/UserProfileBody/index';
import { Container, LinearProgress, Typography } from '@material-ui/core';
import { AuthContext } from 'modules/firebase/context/authContext';
import { useContext } from 'react';
import ReviewQueue from 'modules/review/Review';
import useProfile, { ProfileUser, param } from 'modules/hooks/useProfile';
import { gql, useQuery } from '@apollo/client';
import { withTopBar } from 'modules/decorators/withTopBar';

const GET_ALL_PROFILE_LINK = gql`
  query GET_ALL_PROFILE_LINK {
    users {
      id
      name
      profileLink
      username
      role
    }
  }
`;

function UserProfile() {
  const params: param = useParams();

  const userId = params.userId || '';

  const link = params.link || '';

  const currentUser = useContext(AuthContext);
  const { error, loading, data } = useProfile(userId, link);

  const { data: linkData } = useQuery(GET_ALL_PROFILE_LINK);

  const isCurrentUserProfile =
    userId === currentUser?.uid || currentUser?.uid === data?.users[0]?.id;

  if (error) {
    console.error(error);
    return (
      <Container maxWidth="sm">
        <Typography> Something went wrong please try again. </Typography>
      </Container>
    );
  }

  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  if (!data) {
    return (
      <div>
        <Typography>
          {' '}
          The user you are looking for does not exist. Please try a new one.{' '}
        </Typography>
      </div>
    );
  }

  const getCurrentUserProfile = (users: ProfileUser[]) => {
    return users.filter((user) => {
      return user.id === currentUser?.uid;
    });
  };

  if (isCurrentUserProfile && data?.users.length > 0) {
    const currentUserProfile = getCurrentUserProfile(data?.users);
    return (
      <div>
        {
          <UserProfileBody
            currentUser={currentUser}
            userId={currentUserProfile[0].id}
            profileData={currentUserProfile[0]}
            link={link}
            linkData={linkData?.users}
          />
        }
        {currentUserProfile[0]?.role === 'ADMIN' && isCurrentUserProfile && (
          <ReviewQueue />
        )}
      </div>
    );
  } else {
    return (
      <div>
        {data.users[0] && (
          <UserProfileBody
            currentUser={currentUser}
            userId={data.users[0]?.id}
            profileData={data.users[0]}
            link={link}
            linkData={linkData?.users}
          />
        )}
        {data?.users[0]?.role === 'ADMIN' && isCurrentUserProfile && (
          <ReviewQueue />
        )}
      </div>
    );
  }
}

export default withTopBar(UserProfile);
