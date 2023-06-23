import { StyleRulesCallback, Theme } from '@material-ui/core';
import { IUserProfileBodyProps } from './UserProfileBody';

export const styles: StyleRulesCallback<Theme, IUserProfileBodyProps> = (
  theme: Theme
) => ({
  UserProfileBodyRoot: {
    display: 'flex',
    fontFamily: 'Avenir Next',
  },
  background: {
    backgroundColor: '#efefef',
    paddingTop: 36,
    width: '100%',
  },
  card: {
    backgroundColor: 'transparent',
  },
  cardTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    borderRadius: '50%',
    height: '90px',
    width: '90px',
    margin: 'auto',
    marginTop: 15,
    marginBottom: 25,
  },
  profileImageModal: {
    borderRadius: '50%',
    height: '90px',
    width: '90px',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 10,
  },
  textHeader: {
    color: '#07C25E',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  textPrimary: {
    fontFamily: 'Avenir Next',
    color: '#002d15',
    fontSize: '48px',
  },
  textSecondary: {
    color: '#4f4f4f',
    fontSize: '28px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#dedede',
    position: 'relative',
    borderRadius: 5,
    border: '2px solid white',
    padding: 0,
    overflowWrap: 'break-word',
    textAlign: 'center',
    marginBottom: 60,
    maxWidth: '60%',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '100%',
    },
  },
  articleHolder: {
    paddingTop: 48,
  },
  imageHolder: {
    border: '1px solid black',
    overflow: 'hidden',
    borderRadius: '50%',
    width: 100,
    height: 100,
  },
  white: {
    color: theme.palette.white,
  },
  green: {
    color: theme.palette.green.category,
  },
  articleText: {
    marginBottom: 0,
  },
  text: {
    fontFamily: 'AvenirNext-DemiBold',
  },
  upper: {
    textTransform: 'uppercase',
  },
  infoBar: {
    textAlign: 'left',
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    color: theme.palette.green.icon,
  },
  infoContainer: {
    justifyContent: 'space-between',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    background: 'white',
  },
  modal: {
    border: '1px solid black',
    textAlign: 'center',
    position: 'absolute',
    top: '10%',
    bottom: '10%',
    left: '10%',
    right: '10%',
    borderRadius: '15px',
    backgroundColor: '#dfdfdf',
    display: 'flex',
    overflow: 'scroll',
  },
  inputBox: {
    //marginBottom: "15px",
  },
  inputBoxBio: {
    float: 'left',
    width: '100%',
    marginTop: '30px',
  },
  inputBoxButton: {
    float: 'left',
    width: '100%',
    paddingTop: '30px',
  },
  inputText: {
    marginTop: '20px',
  },
  inputBoxLeft: {
    float: 'left',
    width: '45%',
  },
  inputBoxRight: {
    float: 'right',
    width: '45%',
  },
  headerText: {
    marginBottom: '25px',
  },
  modalTitle: {
    paddingTop: '20px',
  },
});
