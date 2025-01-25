import s from './card.module.scss';
import { PropsWithChildren, ReactNode } from 'react';
import HappyIcon from '@/shared/assets/icons/happy-alt.svg';
import SmileIcon from '@/shared/assets/icons/smile.svg';
import UpsideIcon from '@/shared/assets/icons/upside-down.svg';
import GhostIcon from '@/shared/assets/icons/ghost.svg';
import { Button } from '@/shared';

type Icon = 'happy' | 'smile' | 'upside' | 'ghost';

const iconMap: Record<Icon, ReactNode> = {
  happy: <HappyIcon />,
  smile: <SmileIcon />,
  upside: <UpsideIcon />,
  ghost: <GhostIcon />,
};

type Props = {
  iconVariant: Icon;
  title: string;
  buttonVariant?: 'iconButton' | 'textButton';
  onClick?: () => void;
};

export const Card = ({ title, buttonVariant, iconVariant, children, onClick }: PropsWithChildren<Props>) => {
  return (
    <div className={s.card}>
      <div className={s.cardHeader}>
        <div className={s.titleWrapper}>
          {iconVariant && iconMap[iconVariant]}
          <h2 className={s.title}>{title}</h2>
        </div>
        {buttonVariant === 'iconButton' && <Button onlyIcon variant="outlined" iconVariant="delete" onClick={onClick} />}
        {buttonVariant === 'textButton' && <Button variant="outlined" onClick={onClick} title="+ Добавить" />}
      </div>
      <ul className={s.containerCardChild}>{children}</ul>
    </div>
  );
};
