import { Button, formatDate } from '@/shared';
import s from './task.module.scss';
import { TaskResponse } from '@/features';
import { useDraggable } from '@dnd-kit/core';

type Props = {
  task: TaskResponse;
};

export const Task = ({ task }: Props) => {
  const { title, startDate, status, deadline, id } = task;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div className={s.task} style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <div className={s.infoWrapper}>
        <span>
          Начало: <span className={s.descriptionText}>{formatDate(startDate)}</span>
        </span>
        <span>
          Окончание: <span className={s.descriptionText}>{formatDate(deadline)}</span>
        </span>
        <span>
          Описание: <span className={s.descriptionText}>{title}</span>
        </span>
      </div>
      {status === 0 && <Button onlyIcon iconVariant="edit" />}
    </div>
  );
};
