import { makeStyles, Theme } from '@material-ui/core/styles';
import { styles } from './styles';
import classnames from 'classnames';
import Logo from './logo.png';

const useStyles = makeStyles<Theme, IGreenlyLogoProps>(styles);

export interface IGreenlyLogoProps {
  variant?: 'primary' | 'secondary';
}

export const GreenlyLogo = (props: IGreenlyLogoProps) => {
  const classes = useStyles(props);
  const rootClassName = classnames(classes.root);
  const logoClassName = classes.logo;

  return (
    <div className={rootClassName}>
      <img alt="greenly-logo" className={logoClassName} src={Logo} />
    </div>
  );
};
