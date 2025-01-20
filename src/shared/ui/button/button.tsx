import clsx from 'clsx';
import s from './button.module.scss';
import DeleteIcon from '@/shared/assets/icons/trash.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import DoneIcon from '@/shared/assets/icons/check.svg';
import CancelIcon from '@/shared/assets/icons/cross.svg';
import { ReactNode } from 'react';

type Icon = 'delete' | 'edit' | 'done' | 'cancel';

type Props = {
  onlyIcon?: boolean;
  iconVariant?: Icon;
  variant?: 'filled' | 'outlined';
  onClick?: () => void;
  title?: string;
};

const iconMap: Record<Icon, ReactNode> = {
  delete: <DeleteIcon />,
  edit: <EditIcon />,
  done: <DoneIcon />,
  cancel: <CancelIcon />,
};

export const Button = ({ iconVariant, onClick, onlyIcon, variant = 'filled', title }: Props) => {
  const styleButton = clsx(s.button, s[variant]);
  const styleIcon = clsx(onlyIcon && s.onlyIcon);

  return (
    <button className={clsx(styleButton, styleIcon)} onClick={onClick}>
      {onlyIcon && iconVariant && iconMap[iconVariant]}
      {title}
    </button>
  );
};
