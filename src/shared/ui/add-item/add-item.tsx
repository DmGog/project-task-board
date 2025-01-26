import { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './add-item.module.scss';
import clsx from 'clsx';

type Props = {
  addItem: (title: string) => void;
  placeholder?: string;
  className?: string;
};
export const AddItem = function ({ addItem, placeholder = 'What needs to be done?', className }: Props) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() === '') {
      setError('Title is required');
    } else if (title.length > 40) {
      setError('Title must be 40 characters or less');
    } else {
      addItem(title);
      setTitle('');
      setError(null);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    if (error) {
      setError(null);
    }
    if (e.currentTarget.value.length > 30) {
      setError('Title is longer than recommended 30 characters');
    } else {
      setError(null);
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === 'Enter') {
      addItemHandler();
    }
  };

  return (
    <div className={clsx(s.addItem, className)}>
      <input maxLength={45} value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler} placeholder={placeholder} />
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
};
