import HomeIcon from '@mui/icons-material/Home';
import TocIcon from '@mui/icons-material/Toc';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { SvgIconProps } from '@mui/material';

export type IconName = 'home' | 'table' | 'keyboard';

interface IIconProps extends Omit<SvgIconProps, 'name'> {
  name?: IconName;
}

const Icon = (props: IIconProps) => {
  const { name, ...rest } = props;

  const options = {
    home: <HomeIcon {...rest} />,
    table: <TocIcon {...rest} />,
    keyboard: <KeyboardIcon {...rest} />,
  };

  return name ? options[name] : null;
};

export default Icon;
