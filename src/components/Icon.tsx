import HomeIcon from '@mui/icons-material/Home';
import TocIcon from '@mui/icons-material/Toc';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Event from '@mui/icons-material/Event';
import { SvgIconProps } from '@mui/material';

export type IconName = 'home' | 'table' | 'keyboard' | 'eventCalendar';

interface IIconProps extends Omit<SvgIconProps, 'name'> {
  name?: IconName;
}

const Icon = (props: IIconProps) => {
  const { name, ...rest } = props;

  const options = {
    home: <HomeIcon {...rest} />,
    table: <TocIcon {...rest} />,
    keyboard: <KeyboardIcon {...rest} />,
    eventCalendar: <Event {...rest} />,
  };

  return name ? options[name] : null;
};

export default Icon;
