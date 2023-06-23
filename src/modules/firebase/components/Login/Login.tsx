import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Container, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import clsx from 'clsx';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { getUsername } from 'uiCore/utils/getUsername';
import { auth } from 'modules/firebase/firebaseSetup';
import { withTopBar } from 'modules/decorators/withTopBar';

export const Login = withTopBar(
  () => {
    const classes = useStyles();

    const history = useHistory();

    const SUBMIT_USER = gql`
      mutation SUBMIT_USER(
        $id: String!
        $profileLink: String!
        $eMail: String!
        $name: String!
        $profilePicture: String!
        $likedArticles: _varchar!
        $username: String!
      ) {
        insert_users_one(
          object: {
            id: $id
            profileLink: $profileLink
            eMail: $eMail
            name: $name
            profilePicture: $profilePicture
            likedArticles: $likedArticles
            username: $username
          }
        ) {
          freeReads
        }
      }
    `;
    const [submitUser] = useMutation(SUBMIT_USER, {
      onCompleted: (data) => {
        history.push(`/`);
        window.location.reload();
      },
    });

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (
          authResult: firebase.auth.UserCredential
        ): boolean {
          if (authResult.additionalUserInfo?.isNewUser) {
            const user = authResult.user;
            if (user?.photoURL !== null) {
              const variables = {
                id: user?.uid,
                profileLink: `user/${user?.uid}`,
                eMail: user?.email,
                name: user?.displayName,
                profilePicture: user?.photoURL,
                likedArticles: '{1}',
                username: getUsername(user?.displayName || ''),
              };
              submitUser({ variables });
              return false;
            } else {
              const variables = {
                id: user?.uid,
                profileLink: `user/${user?.uid}`,
                eMail: user?.email,
                name: user?.displayName,
                profilePicture: 'https://picsum.photos/1200/850',
                likedArticles: '{1}',
                username: getUsername(user?.displayName || ''),
              };
              submitUser({ variables });
              return false;
            }
          }
          history.goBack();
          return true;
        },
      },
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };

    const elements = (
      <Box className={clsx(classes.root)}>
        <Container maxWidth="lg" className={clsx(classes.buttonBox)}>
          <Typography variant={'h2'} className={clsx(classes.title)}>
            {' '}
            Please Log In or Create an Account Below!{' '}
          </Typography>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </Container>
      </Box>
    );

    return elements;
  },
  { navbar: true, categoryBar: true }
);
