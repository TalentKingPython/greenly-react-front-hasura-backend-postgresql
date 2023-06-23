import React, { forwardRef } from 'react';
import {
  TextField,
  Grid,
  LinearProgress,
  Card,
  CardMedia,
  CardContent,
  Box,
  Container,
  makeStyles,
  Theme,
  Typography,
  Link,
} from '@material-ui/core';
import { styles } from './styles';
import { useQuery, useMutation } from '@apollo/client';
import clsx from 'clsx';
import { ArticleCard } from '../ArticleCard/index';
import { Button } from '../Button/index';
import Modal from 'react-modal';
import { ProfileFooter } from '../ProfileFooter';
import { getStorage, ref, StorageReference } from 'firebase/storage';
import {
  deleteFileByReference,
  getFilesByReference,
  getFileUrl,
  uploadFile,
} from 'modules/firebase/services/storage/storage';
import {
  GET_WRITTEN_ARTICLES,
  UPDATE_USER,
  UPDATE_USER_IMAGE,
} from './queries';
import { IArticle } from 'modules/home/Articles';
import useProfile from 'modules/hooks/useProfile';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { EditOutlined } from '@material-ui/icons';

interface Users {
  id: String;
  name: String;
  role: String;
  profileLink: String;
  username: String;
}

export interface IUserProfileBodyProps {
  currentUser: firebase.User | null;
  profileData: {
    id: string;
    name: String;
    bio: string;
    follows?: String[];
    profilePicture: string;
    role: String;
    savedArticles?: String[];
    likedArticles?: String[];
    profileLink?: String;
    username: String;
  };
  userId: string;
  link: string;
  linkData: Users[];
}

const useStyles = makeStyles<Theme, IUserProfileBodyProps>(styles);

export const UserProfileBody = forwardRef<HTMLElement, IUserProfileBodyProps>(
  (props, _) => {
    const { currentUser, userId, profileData, link: currentUserLink } = props;
    const storage = getStorage();
    const history = useHistory();

    const imagePath = `Images/Profile/${currentUser?.uid}/${currentUser?.uid}`;
    const profileImagesRef = ref(storage, imagePath);

    const [isUploading, setIsUploading] = React.useState(false);
    const [newName, setNewName] = React.useState('');
    const [newBio, setNewBio] = React.useState('');
    const [newImg, setNewImg] = React.useState('');
    const [newLink, setNewLink] = React.useState('');
    const [newUsername, setNewUsername] = React.useState('');

    const classes = useStyles(props);

    const [updateUser] = useMutation(UPDATE_USER, {
      onCompleted: () => {
        history.push(`/${newLink}`);
        window.location.reload();
      },
    });
    const [updateUserImage] = useMutation(UPDATE_USER_IMAGE, {
      onCompleted: () => window.location.reload(),
    });

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewName(event.target.value);
    };
    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewBio(event.target.value);
    };
    const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewImg(event.target.value);
    };
    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewLink(event.target.value);
    };
    const handleUsernameChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setNewUsername(event.target.value);
    };

    const deleteExistingProfileImages = async (reference: StorageReference) => {
      const files = await getFilesByReference(reference);
      files.items.forEach((file) => {
        const fileRef = ref(storage, file.fullPath);
        deleteFileByReference(fileRef);
      });
    };

    const handleUpdateProfileImage = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.files) {
        const file = event.target.files[0];
        try {
          setIsUploading(true);
          await deleteExistingProfileImages(profileImagesRef);

          await uploadFile(profileImagesRef, file);

          const url = await getFileUrl(profileImagesRef);

          await updateUserImage({
            variables: {
              id: userId,
              img: url,
            },
          });
        } catch (error) {
          console.log(error);
        }
        setIsUploading(false);
      }
    };

    const { data: userProfileData } = useProfile(userId || '', currentUserLink);
    const profileId = userProfileData?.data?.users[0]?.id;

    const { loading, error, data } = useQuery(GET_WRITTEN_ARTICLES, {
      variables: { authorId: userId || profileId },
    });
    if (error) {
      console.log(error);
      return <p> Theres an error </p>;
    }
    if (loading) {
      return <LinearProgress color="secondary" />;
    }
    const articlesData = data.articles;
    let articles;

    if (articlesData.length !== 0) {
      articles = articlesData.map((article: IArticle) => {
        return <ArticleCard cardData={article} key={article.id} />;
      });
    } else {
      articles = <div />;
    }

    const likedArray = profileData.likedArticles;
    let likedArticles;

    if (likedArray === null || likedArray?.length === 1) {
      likedArticles = <div></div>;
    } else {
      likedArticles = likedArray?.map((id: String) => {
        return <ProfileFooter likedArticle={id} />;
      });
    }

    const openModal = () => {
      setNewName(String(profileData.name));
      setNewBio(String(profileData.bio));
      setNewImg(String(profileData.profilePicture));
      setNewLink(String(userId || currentUserLink));
      setNewUsername(String(profileData.username));
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

    const submitModal = (
      newId: string,
      newName: string,
      newBio: string,
      newImg: string,
      newLink: string,
      newUsername: string
    ) => {
      updateUser({
        variables: {
          id: newId,
          bio: newBio,
          name: newName,
          img: newImg,
          link: newLink,
          username: newUsername,
        },
      });
      setIsOpen(false);
    };

    return (
      <div className={classes.UserProfileBodyRoot}>
        <Box className={clsx(classes.background)}>
          <Modal
            ariaHideApp={false}
            className={clsx(classes.modal)}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Profile Editor"
          >
            <Container maxWidth="xl" className={clsx(classes.outerBox)}>
              <form>
                <Typography variant={'h6'} className={classes.modalTitle}>
                  {' '}
                  Profile Editor{' '}
                </Typography>
                <CardMedia
                  className={classes.profileImageModal}
                  component="img"
                  image={profileData.profilePicture}
                />
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleUpdateProfileImage}
                  disabled={isUploading}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="primary"
                    size="sm"
                    label="change profile picture"
                    component="span"
                    loading={isUploading}
                    disabled={isUploading}
                  >
                    Update Picture
                  </Button>
                </label>
                <div className={clsx(classes.inputBox)}>
                  <div className={clsx(classes.inputBoxLeft)}>
                    <Typography className={clsx(classes.inputText)}>
                      {' '}
                      Enter your name:{' '}
                    </Typography>
                    <TextField
                      id="outlined-multiline-flexibleName"
                      label="Name"
                      multiline
                      fullWidth
                      maxRows={1}
                      value={newName}
                      onChange={handleNameChange}
                      variant="outlined"
                    />
                    <Typography className={clsx(classes.inputText)}>
                      {' '}
                      Enter your username:{' '}
                    </Typography>
                    <TextField
                      id="outlined-multiline-flexibleUsername"
                      label="Username"
                      multiline
                      fullWidth
                      maxRows={1}
                      value={newUsername}
                      onChange={handleUsernameChange}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className={clsx(classes.inputBox)}>
                  <div className={clsx(classes.inputBoxRight)}>
                    <Typography className={clsx(classes.inputText)}>
                      {' '}
                      Enter your profile picture url:{' '}
                    </Typography>
                    <TextField
                      id="outlined-multiline-flexibleURL"
                      label="Profile Image URL"
                      multiline
                      fullWidth
                      maxRows={1}
                      value={newImg}
                      onChange={handleImgChange}
                      variant="outlined"
                    />
                    <Typography className={clsx(classes.inputText)}>
                      {' '}
                      Enter your profile link:{' '}
                    </Typography>
                    <TextField
                      id="outlined-multiline-flexibleLink"
                      label="Profile Link"
                      multiline
                      fullWidth
                      maxRows={1}
                      value={newLink}
                      onChange={handleLinkChange}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className={clsx(classes.inputBoxBio)}>
                  <Typography> Enter your updated bio: </Typography>
                  <TextField
                    id="outlined-multiline-f-full-width"
                    label="New Bio"
                    multiline
                    fullWidth
                    rows={3}
                    value={newBio}
                    onChange={handleBioChange}
                    variant="outlined"
                  />
                </div>
                <div className={clsx(classes.inputBoxButton)}>
                  <Button
                    onClick={closeModal}
                    variant="danger"
                    label="Cancel"
                    component="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      submitModal(
                        userId || profileId,
                        newName,
                        newBio,
                        newImg,
                        newLink,
                        newUsername
                      )
                    }
                    variant="primary"
                    label="Submit"
                    component="button"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Container>
          </Modal>

          <Container className={clsx(classes.paper)} maxWidth="xs">
            <Box m={4}>
              <Card className={classes.card} elevation={0}>
                <CardContent className={classes.cardTitle}>
                  <Typography className={classes.textPrimary} align="center">
                    {profileData.name}
                  </Typography>

                  {currentUser?.uid &&
                    (currentUser?.uid === userId ||
                      currentUser?.uid === profileId) && (
                      <div className={clsx(classes.edit)}>
                        <Button
                          onClick={openModal}
                          variant="primary"
                          label="Edit Profile"
                          component="button"
                        >
                          <EditOutlined />
                        </Button>
                      </div>
                    )}
                </CardContent>

                <CardContent>
                  <Typography className={classes.textSecondary} align="center">
                    <Link color="inherit" href={`/${profileData?.profileLink}`}>
                      {' '}
                      @{profileData.username}{' '}
                    </Link>
                  </Typography>
                </CardContent>

                <CardMedia
                  className={classes.profileImage}
                  component="img"
                  image={profileData.profilePicture}
                />

                <CardContent>
                  <Typography
                    className={classes.textSecondary}
                    variant="body1"
                    align="center"
                  >
                    {profileData.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Container>

          {articlesData.length > 0 ? (
            <>
              <Container maxWidth="sm">
                <Typography
                  className={classes.textPrimary}
                  variant="h6"
                  align="center"
                >
                  Author's Articles{' '}
                  {articlesData !== null && '(' + articlesData.length + ')'}
                </Typography>
              </Container>
              <Container maxWidth="xl" className={classes.articleHolder}>
                <Box pb={6}>
                  <Grid container spacing={3}>
                    {articles}
                  </Grid>
                </Box>
              </Container>
            </>
          ) : null}

          {(currentUser?.uid === userId || currentUser?.uid === profileId) &&
            Boolean(likedArray && likedArray?.length > 0) && (
              <Container maxWidth="sm">
                <Typography
                  className={classes.textPrimary}
                  variant="h6"
                  align="center"
                >
                  Favorite Articles{' '}
                  {likedArray && '(' + (likedArray.length - 1) + ')'}
                </Typography>
              </Container>
            )}

          {(currentUser?.uid === userId || currentUser?.uid === profileId) && (
            <Container maxWidth="xl" className={classes.articleHolder}>
              <Box pb={6}>
                <Grid container spacing={3}>
                  {likedArticles}
                </Grid>
              </Box>
            </Container>
          )}
        </Box>
      </div>
    );
  }
);
