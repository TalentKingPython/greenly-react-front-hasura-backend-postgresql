import { EditorState } from 'draft-js';
import { useState } from 'react';

export const useEditArticle = () => {
  const [articleTitle, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const [category, setCategory] = useState('');
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const [readTime, setReadTime] = useState('');
  const handleReadTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReadTime(event.target.value);
  };

  const [authorName, setAuthorName] = useState('');

  const [headerURL, setHeaderURL] = useState('');

  const [editorStateAbstract, setEditorStateAbstract] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorStateBody, setEditorStateBody] = useState(() =>
    EditorState.createEmpty()
  );

  return {
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
  };
};
