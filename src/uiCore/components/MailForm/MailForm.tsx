import React, { forwardRef } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { styles } from "./styles";
import classnames from "classnames";
import { Button } from "../Button";
import MailchimpSubscribe, { EmailFormFields } from "react-mailchimp-subscribe";
import { Box } from "@mui/material";

const useStyles = makeStyles<Theme, IMailFormProps>(styles);

export interface IMailFormProps {
  variant: "primary" | "secondary";
}

const url =
  "https://greenly.us1.list-manage.com/subscribe/post?u=5fd908e5506fc0c7c6f52b8b4&amp;id=6c25891393";

export interface FormProps {
  status: string | null;
  // should probably not be any
  message: any;
  onValidated: any;
}

export const MailForm = forwardRef<HTMLElement, IMailFormProps>(
  (props, ref) => {
    const classes = useStyles(props);
    const rootClassName = classnames(classes.root);
    const formInputClassName = classnames(
      classes.formInputStyling,
      classes.formInputText
    );
    const formContainerClassName = classes.formContainer;
    const inputContainerClass = classes.inputContainer;
    const submitButton = classes.submitButton;

    const CustomForm = ({ status, message, onValidated }: FormProps) => {
      let email: HTMLInputElement | null;
      const submit = () =>
        email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
          EMAIL: email.value,
        });

      return (
        <div>
          <Box className={formContainerClassName}>
            <Box className={inputContainerClass}>
              {status === "sending" && (
                <div style={{ color: "blue" }}>sending...</div>
              )}
              {status === "error" && (
                <div
                  style={{ color: "red" }}
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              )}
              {status === "success" && (
                <div
                  style={{ color: "green" }}
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              )}
              <input
                className={formInputClassName}
                ref={(node) => (email = node)}
                type="email"
                placeholder="Enter your email for our weekly digest"
              />
            </Box>
            <Box className={submitButton}>
              <Button
                onClick={submit}
                variant="primary"
                label="Submit"
                component="button"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </div>
      );
    };

    return (
      <div className={rootClassName}>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              message={message}
              onValidated={(formData: EmailFormFields) => subscribe(formData)}
            />
          )}
        />
      </div>
    );
  }
);
