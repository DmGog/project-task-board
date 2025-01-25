import { Button, formatDate } from '@/shared';
import s from './task.module.scss';

type Props = {
  title: string;
  startDate: string;
  endDate: string;
  status: number;
  onClick?: () => void;
};

export const Task = ({ endDate, startDate = 'дата не указана', status = 0, title, onClick }: Props) => {
  return (
    <li className={s.task}>
      <div className={s.infoWrapper}>
        <span>
          Начало: <span className={s.descriptionText}>{formatDate(startDate)}</span>
        </span>
        <span>
          Окончание: <span className={s.descriptionText}>{formatDate(endDate)}</span>
        </span>
        <span>
          Описание: <span className={s.descriptionText}>{title}</span>
        </span>
      </div>
      {status === 0 && <Button onlyIcon iconVariant="edit" onClick={onClick} />}
    </li>
  );
};
