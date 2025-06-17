import HomeIcon from '@mui/icons-material/Home';
import { SvgIconProps } from '@mui/material';

export type IconName = 'home';

interface IIconProps extends Omit<SvgIconProps, 'name'> {
  name?: IconName;
}

const Icon = (props: IIconProps) => {
  const { name, ...rest } = props;

  const options = {
    home: <HomeIcon {...rest} />,
  };

  return name ? options[name] : null;
};

export default Icon;
