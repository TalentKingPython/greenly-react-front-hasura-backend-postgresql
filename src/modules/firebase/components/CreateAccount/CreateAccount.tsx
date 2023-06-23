import React, { forwardRef } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, Container, TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import { Button } from "../../../../uiCore/components/Button/index";
import clsx from "clsx";

export const CreateAccount = forwardRef<HTMLElement>((props, ref) => {
  const classes = useStyles();

  const [username, setUsername] = React.useState("");
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const [password, setPassword] = React.useState("");
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Box className={clsx(classes.root)}>
      <Container>
        <p> Login Page </p>
        <div className={clsx(classes.inputBox)}>
          <TextField
            id="outlined-multiline-f-full-width"
            label="Username"
            multiline
            fullWidth
            rowsMax={3}
            value={username}
            onChange={handleUsernameChange}
            variant="outlined"
          />
        </div>
        <div className={clsx(classes.inputBox)}>
          <TextField
            id="outlined-multiline-f-full-width"
            label="Password"
            multiline
            fullWidth
            rowsMax={3}
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
          />
        </div>
        <div className={clsx(classes.buttonBox)}>
          <Button variant="primary" label="Submit" component="button">
            Login
          </Button>
        </div>
      </Container>
    </Box>
  );
});
