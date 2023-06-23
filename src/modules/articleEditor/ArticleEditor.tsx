import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import clsx from 'clsx';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  MenuItem,
  TextField,
  Container,
  Typography,
  Link,
} from '@material-ui/core';
import { ArticleBody } from 'uiCore/components/ArticleBody/index';
import { Button } from 'uiCore/components/Button/index';
import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from 'modules/firebase/context/authContext';
import { useContext } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import useStyles from './styles';
import { getStorage, ref } from 'firebase/storage';
import {
  getFileUrl,
  uploadFile,
} from 'modules/firebase/services/storage/storage';
import { GET_ARTICLE_BY_ID, SUBMIT_ARTICLE, UPDATE_ARTICLE } from './queries';
import { CATEGORIES, READ_TIMES } from './constants';
import { IArticle } from '../article/types';
import useProfile from 'modules/hooks/useProfile';
import Dialog from 'uiCore/components/Dialog/Dialog';
import { useEditArticle } from './useEditArticle';
import { withTopBar } from 'modules/decorators/withTopBar';

interface BrowseParams {
  id: string;
  userId: string;
}

function ArticleEditor() {
  const params: BrowseParams = useParams();
  const classes = useStyles();

  const currentUser = useContext(AuthContext);

  let history = useHistory();
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogBody, setDialogBody] = useState<string>('');
  const [redirectionLocation, setRedirectionLocation] =
    useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [submitArticle] = useMutation(SUBMIT_ARTICLE, {
    onCompleted: () => {
      setDialogTitle('Article submitted successfully.');
      setDialogBody('Article will be published pending review.');
      setRedirectionLocation('/');
      setIsDialogOpen(true);
    },
  });

  const [updateArticle] = useMutation(UPDATE_ARTICLE, {
    onCompleted: () => {
      setDialogTitle('Article has been updated successfully.');
      setIsDialogOpen(true);
      setRedirectionLocation(`/articles/${params.id}`);
    },
  });

  const {
    articleTitle,
    setTitle,
    handleTitleChange,
    category,
    setCategory,
    handleCategoryChange,
    readTime,
    setReadTime,
    handleReadTimeChange,
    authorName,
    setAuthorName,
    headerURL,
    setHeaderURL,
    editorStateAbstract,
    setEditorStateAbstract,
    editorStateBody,
    setEditorStateBody,
  } = useEditArticle();

  const [isUploading, setIsUploading] = useState(false);

  const previewDate = '2021-04-02';
  const { data } = useProfile(currentUser?.uid || '', '');
  const userProfile = data?.users[0];
  const editingPermitted =
    params?.id &&
    (params?.userId === userProfile?.id || userProfile?.role === 'ADMIN');

  useQuery(GET_ARTICLE_BY_ID, {
    onCompleted: (data) => {
      const articleData = data?.articles?.[0];
      const abstract = JSON.parse(articleData?.abstract || '{}');
      const articleBody = JSON.parse(articleData?.articleBody || '{}');
      const blocksFromBody = convertFromRaw(articleBody);
      const blocksFromAbstract = convertFromRaw(abstract);

      setEditorStateAbstract(EditorState.createWithContent(blocksFromAbstract));
      setEditorStateBody(EditorState.createWithContent(blocksFromBody));
      setCategory(articleData?.categories);
      setTitle(articleData?.title);
      setHeaderURL(articleData?.headerImage);
      setReadTime(articleData?.readTime);
      setAuthorName(articleData?.user.name);
    },
    variables: { id: Number(params?.id) },
    skip: !editingPermitted,
  });

  if (currentUser === null) {
    return (
      <Redirect
        to={{
          pathname: '/auth',
        }}
      />
    );
  }

  const imageExists = (url: string) => {
    const image = new Image();
    image.src = url;
    if (!image.complete) {
      return url;
    }
    return url;
  };

  const styleMap = {
    articleText: {
      fontFamily: 'AvenirNext',
    },
  };

  const submit = () => {
    const variables = {
      title: articleTitle,
      abstract: JSON.stringify(
        convertToRaw(editorStateAbstract.getCurrentContent())
      ),
      articleBody: JSON.stringify(
        convertToRaw(editorStateBody.getCurrentContent())
      ),
      readTime: Number(readTime),
      headerImage: imageExists(headerURL),
      categories: category,
    };

    // TODO: remove this error dialog in favor of inline errors
    if (articleTitle === '') {
      setDialogTitle('Form Error');
      setDialogBody('Please enter a title then try again');
      setIsDialogOpen(true);
      return false;
    } else if (
      JSON.stringify(convertToRaw(editorStateAbstract.getCurrentContent())) ===
      ''
    ) {
      setDialogTitle('Form Error');
      setDialogBody('Please enter an abstract then try again');
      setIsDialogOpen(true);
      return false;
    } else if (
      JSON.stringify(convertToRaw(editorStateBody.getCurrentContent())) === ''
    ) {
      setDialogTitle('Form Error');
      setDialogBody('Please enter an article body then try again');
      setIsDialogOpen(true);
      return false;
    } else if (category === '') {
      setDialogTitle('Form Error');
      setDialogBody('Please choose a category then try again');
      setIsDialogOpen(true);
      return false;
    } else if (readTime === '') {
      setDialogTitle('Form Error');
      setDialogBody('Please set a read time then try again');
      setIsDialogOpen(true);
      return false;
    } else {
      if (editingPermitted) {
        updateArticle({
          variables: {
            ...variables,
            id: Number(params?.id),
          },
        });
      } else {
        submitArticle({
          variables: { ...variables, authorId: currentUser?.uid },
        });
      }
      return true;
    }
  };

  const previewData: IArticle = {
    reviewed: true,
    title: articleTitle,
    abstract: convertToRaw(editorStateAbstract.getCurrentContent()),
    articleBody: convertToRaw(editorStateBody.getCurrentContent()),
    dateCreated: previewDate,
    readTime: Number(readTime),
    headerImage: headerURL,
    views: 0,
    user: {
      id: currentUser.uid,
      name: authorName || currentUser.displayName || 'name',
    },
    id: '0',
    authorId: '123',
    categories: 'technology',
    likes: 0,
  };

  const storage = getStorage();
  const imagePath = `Images/Article/${
    currentUser?.uid
  }/${articleTitle}_${Date.now()}`;
  const articleImagesRef = ref(storage, imagePath);

  const handleUpdateHeaderImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      try {
        setIsUploading(true);
        await uploadFile(articleImagesRef, file);

        const url = await getFileUrl(articleImagesRef);

        setHeaderURL(url);
        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
        console.log(error);
      }
    }
  };

  const handleDialogClose = () => {
    if (redirectionLocation) {
      history.push(redirectionLocation);
      return;
    }

    setIsDialogOpen(false);
    setDialogTitle('');
    setDialogBody('');
    setRedirectionLocation(null);
  };

  return (
    <div className={clsx(classes.root)}>
      <Dialog
        open={isDialogOpen}
        handleClose={handleDialogClose}
        title={dialogTitle}
        body={dialogBody}
      />
      <Container maxWidth="sm" className={clsx(classes.container)}>
        <div className={clsx(classes.headerBox)}>
          <Typography className={clsx(classes.header)} variant={'h1'}>
            {!editingPermitted ? 'Submit an Article' : 'Edit'}
          </Typography>
        </div>

        <div className={clsx(classes.inputBox)}>
          <Typography className={clsx(classes.inputText)}>
            {' '}
            Article Title:{' '}
          </Typography>
          <TextField
            id="outlined-multiline-f-full-width"
            label="Title"
            multiline
            fullWidth
            maxRows={3}
            value={articleTitle}
            onChange={handleTitleChange}
            variant="outlined"
          />
        </div>
        <div className={clsx(classes.inputBox)}>
          <Typography className={clsx(classes.inputText)}>
            {' '}
            Header Image
          </Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleUpdateHeaderImage}
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
              Set Header Image
            </Button>
          </label>
          <br />
          <Link>{headerURL}</Link>
        </div>
        <div className={clsx(classes.inputBox)}>
          <Typography className={clsx(classes.inputText)}>
            {' '}
            Category:{' '}
          </Typography>
          <TextField
            id="filled-select-currency"
            select
            label="Select"
            value={category}
            onChange={handleCategoryChange}
            helperText="Please select your article's category"
            variant="outlined"
          >
            {CATEGORIES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={clsx(classes.inputBox)}>
          <Typography className={clsx(classes.inputText)}>
            {' '}
            Approximate Read Time:{' '}
          </Typography>
          <TextField
            id="filled-select-currency"
            select
            label="Select"
            value={readTime}
            onChange={handleReadTimeChange}
            helperText="Please select your article's read time"
            variant="outlined"
          >
            {READ_TIMES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Typography className={clsx(classes.inputText)}>
          {' '}
          Article Abstract (optional, max 500 words):{' '}
        </Typography>
        <Editor
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'list',
              'textAlign',
              'link',
              'image',
              'remove',
              'history',
            ],
            fontFamily: {
              options: [
                'Avenir Next',
                'Nunito Sans',
                'Helvetica Neue',
                'Helvetica',
                'Arial',
              ],
            },
          }}
          stripPastedStyles={true}
          editorState={editorStateAbstract}
          onEditorStateChange={setEditorStateAbstract}
          wrapperClassName={clsx(classes.wrapper)}
          editorClassName={clsx(classes.editor)}
          toolbarClassName={clsx(classes.toolbar)}
          customStyleMap={styleMap}
          spellCheck
        />
        <Typography className={clsx(classes.inputText)}>
          {' '}
          Article Body (max 3000):{' '}
        </Typography>
        <Editor
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'list',
              'textAlign',
              'link',
              'image',
              'remove',
              'history',
            ],
            fontFamily: {
              options: [
                'Avenir Next',
                'Nunito Sans',
                'Helvetica Neue',
                'Helvetica',
                'Arial',
              ],
            },
          }}
          customStyleMap={styleMap}
          stripPastedStyles={true}
          editorState={editorStateBody}
          onEditorStateChange={setEditorStateBody}
          wrapperClassName={clsx(classes.wrapper)}
          editorClassName={clsx(classes.editor)}
          toolbarClassName={clsx(classes.toolbar)}
          spellCheck
        />
        <Typography className={clsx(classes.inputText)}>
          {' '}
          Article Preview:{' '}
        </Typography>
      </Container>
      <ArticleBody data={previewData} currentUser={currentUser} />
      <div className={clsx(classes.footerBox)}>
        <Button
          onClick={() => submit()}
          variant="primary"
          label="Submit"
          component="button"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default withTopBar(ArticleEditor, { categoryBar: false });
