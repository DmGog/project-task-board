import s from './item-form.module.scss';
import { Button, TextField } from '@/shared';
import { ChangeEvent } from 'react';

type Props = {
  onClickCancel: () => void;
  onClickDone: () => void;
  formData: {
    startDate: string;
    endDate: string;
    description: string;
  };
  setFormData: (data: { startDate: string; endDate: string; description: string }) => void;
};

export const ItemForm = ({ onClickCancel, onClickDone, formData, setFormData }: Props) => {
  const handleChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className={s.itemForm}>
      <div className={s.textFieldGroup}>
        <TextField type="date" label="Начало:" value={formData.startDate} onChange={handleChange('startDate')} />
        <TextField type="date" label="Окончание:" value={formData.endDate} onChange={handleChange('endDate')} />
        <TextField type="text" label="Описание:" value={formData.description} onChange={handleChange('description')} />
      </div>
      <div className={s.btnWrapper}>
        <Button onClick={onClickCancel} onlyIcon iconVariant="cancel" />
        <Button onClick={onClickDone} onlyIcon iconVariant="done" />
      </div>
    </div>
  );
};
