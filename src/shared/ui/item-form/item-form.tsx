import s from './item-form.module.scss';
import { Button, TextField } from '@/shared';

export const ItemForm = () => {
  return (
    <div className={s.itemForm}>
      <div className={s.textFieldGroup}>
        <TextField type="date" label="Начало:" />
        <TextField type="date" label="Окончание:" />
        <TextField type="text" label="Описание:" />
      </div>
      <div className={s.btnWrapper}>
        <Button onClick={() => {}} onlyIcon iconVariant="cancel" />
        <Button onClick={() => {}} onlyIcon iconVariant="done" />
      </div>
    </div>
  );
};
