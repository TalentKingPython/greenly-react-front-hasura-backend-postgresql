import React from 'react';
import {
  Dialog as MDialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Button } from '@material-ui/core';

type Props = {
  open: boolean;
  handleClose(): void;
  title?: string;
  body?: string;
};

const Dialog = ({ open, handleClose, title, body }: Props) => {
  return (
    <MDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      {body && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
      )}
      <Button onClick={handleClose}>Close</Button>
    </MDialog>
  );
};

export default Dialog;
