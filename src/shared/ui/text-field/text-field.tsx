import { ChangeEvent, ComponentProps, forwardRef, KeyboardEvent } from 'react';

import { clsx } from 'clsx';

import s from './text-field.module.scss';

import SearchIcon from '@/shared/assets/icons/search.svg';

type Props = {
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  classNameContainer?: string;
  label?: string;
  searchIcon?: boolean;
  type: 'text' | 'search' | 'date';
} & ComponentProps<'input'>;

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { type, classNameContainer, searchIcon, label, name, onChange, onKeyDown, value = '', onEnter, ...rest } = props;

  const classInput = clsx(s.input, s[type]);

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (onEnter && e.key === 'Enter') {
      onEnter(e);
    }
    onKeyDown?.(e);
  };

  return (
    <div className={clsx(s.textField, classNameContainer)}>
      <label className={s.label} htmlFor={name}>
        {label && <span>{label}</span>}
        <div className={classInput}>
          {searchIcon && <SearchIcon />}
          <input
            placeholder={searchIcon ? 'поиск...' : ''}
            id={name}
            value={value}
            onChange={onHandleChange}
            ref={ref}
            type={type}
            name={name}
            onKeyDown={handleKeyDown}
            {...rest}
          />
        </div>
      </label>
    </div>
  );
});

TextField.displayName = 'Input';
