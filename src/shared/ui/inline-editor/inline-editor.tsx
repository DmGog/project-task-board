import { ChangeEvent, useEffect, useState } from 'react';
import s from './inline-editor.module.scss';

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  setEditMode: (editMode: boolean) => void;
};

export const InlineEditor = function ({ value, onChange, setEditMode }: Props) {
  const [title, setTitle] = useState(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(value);
  }, [value]);

  console.log(error);
  const activateViewMode = () => {
    setEditMode(false);
    if (title.length > 40) {
      setError('Title must be 40 characters or less');
    } else {
      onChange(title);
      setError(null);
    }
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setTitle(newValue);

    if (newValue.length > 40) {
      setError('Title must be 40 characters or less');
    } else if (newValue.length > 30) {
      setError('Title is longer than recommended 30 characters');
    } else {
      setError(null);
    }
  };

  return <input maxLength={45} className={s.inlineEditor} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />;
};
