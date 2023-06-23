import { forwardRef, useMemo, useState } from "react";
import { makeStyles, Theme, Button } from "@material-ui/core";
import { Typography } from "@mui/material";
import { IButtonProps } from "../LikeButton/LikeButton";
import { styles } from "./styles";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "modules/firebase/provider/authProvider";
import { ClapBorder, Clap } from "../Icons";
import {
  GET_CLAPS,
  INSERT_CLAPS,
  DELETE_CLAPS,
  GET_CLAPS_COUNT,
} from "./query";
import { uuidv4 } from "uiCore/utils/uuidv4";
import { AuthModal } from "../AuthModal";

const useStyles = makeStyles<Theme, IButtonProps>(styles);

export const ClapButton = forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    const { userId, articleId } = props;
    const classes = useStyles(props);
    const user = useAuth();
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    
    const { loading, error: clapsError, data, refetch } = useQuery(GET_CLAPS, {
      variables: { userId: String(userId), articleId: String(articleId) },
    });
    
    const { data: allClapsData, refetch: refetchAllClaps, loading: clapsLoading } = useQuery(
      GET_CLAPS_COUNT,
      {
        variables: { articleId: String(articleId) },
      }
      );
    
    const [clapped, setClapped] = useState(!!data?.claps?.length)
      
    const count = useMemo(() => {
      return allClapsData?.claps?.length;
    }, [allClapsData]);

    const [insertClaps] = useMutation(INSERT_CLAPS, {
      onCompleted: (data) => {
        if (data.insert_claps.affected_rows) {
          refetch();
          refetchAllClaps();
        }
      },
      onError: (err) => setError(err.message),
    });

    const [deleteClaps] = useMutation(DELETE_CLAPS, {
      onCompleted: (data) => {
        if (data.delete_claps.affected_rows) {
          refetch();
          refetchAllClaps();
        }
      },
      onError: (err) => setError(err.message),
    });

    const handleClapAction = () => {
      if (clapped) {
        setClapped(false);
        deleteClaps({
          variables: { userId: String(userId), articleId: String(articleId) },
        });
      } else {
        setClapped(true);
        insertClaps({
          variables: {
            userId: String(userId),
            articleId: String(articleId),
            id: uuidv4(),
          },
        });
      }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (loading || error || clapsError) {
      return (
        <Button
          role="button"
          className={classes.root}
          aria-controls="simple-menu-ren"
          aria-haspopup="true"
          onClick={() => {}}
        >
          <ClapBorder />{" "}
          <Typography variant="caption" className={classes.clapCount}>
            {count}
          </Typography>
        </Button>
      );
    }

    if (userId === undefined || user === null) {
      return (
        <AuthModal
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={open}
        >
          <ClapBorder />
          <Typography variant="caption" className={classes.clapCount}>
            {count}
          </Typography>
        </AuthModal>
      );
    }

    return (
      <Button
        role="button"
        className={classes.root}
        aria-controls="simple-menu-rendered"
        aria-haspopup="true"
        onClick={handleClapAction}
        disabled={clapsLoading}
      >
        {clapped ? <Clap /> : <ClapBorder />}
        <Typography variant="caption" className={classes.clapCount}>
          {count}
        </Typography>
      </Button>
    );
  }
);
