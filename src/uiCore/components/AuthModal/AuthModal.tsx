import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, Button } from "@material-ui/core";
import { Box, Typography, Modal, Link } from "@mui/material";
import { styles } from "./styles";
import { forwardRef } from "react";

const useStyles = makeStyles<Theme, IAuthModalProps>(styles);

export interface IAuthModalProps {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
  children: React.ReactNode;
}

const AuthModal = forwardRef<HTMLDivElement, IAuthModalProps>((props, ref) => {
  const classes = useStyles(props);
  const { handleClose, handleOpen, open, children } = props;

  return (
    <>
      <Button
        role="button"
        className={classes.root}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        {children}
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={classes.modalBox}>
          <Typography variant="h5" component="h5" sx={{ textAlign: "center" }}>
            You must be signed in to use this feature
          </Typography>
          <Button variant="contained" className={classes.loginButton}>
            <Link
              component={RouterLink}
              to={"/auth"}
              underline="none"
              color="inherit"
            >
              Login
            </Link>
          </Button>
        </Box>
      </Modal>
    </>
  );
});

export { AuthModal };
