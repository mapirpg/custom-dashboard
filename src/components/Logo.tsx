import SqrLogo from '@assets/logo_sqr.png';
import RectLogo from '@assets/logo_rct.png';
import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IIstance } from '@data/interfaces/instance';

interface LogoProps {
  type?: 'rct' | 'sqr';
  size?: string | number;
}

export const Logo = ({ type, size = '50px' }: LogoProps) => {
  const queryClient = useQueryClient();

  const instance = queryClient.getQueryData(['instance']) as IIstance;

  const source = useMemo(() => {
    if (instance?.theme?.logo) {
      return instance.theme.logo;
    }

    return type === 'rct' ? RectLogo : SqrLogo;
  }, [instance, type]);

  return <img src={source} width={size} height={type === 'sqr' ? size : undefined} alt="Logo" />;
};
