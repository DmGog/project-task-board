import { useGetTodoListsQuery } from '@/features';
import { formatDate } from '@/shared';
import s from './todolists-board.module.scss';
import { PATH } from '@/app';
import { useNavigate } from 'react-router';

export const TodolistsBoard = () => {
  const { data: todolists } = useGetTodoListsQuery();
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(PATH.TODOLIST_BOARD_PAGE.replace(':id', id));
  };

  return (
    <div className={s.container}>
      <h2 className={s.titleContainer}>Мои проекты</h2>
      <hr className={s.line} />
      <div className={s.todolistsWrapper}>
        {todolists?.map(todolist => (
          <div key={todolist.id} className={s.todolistCard} onClick={() => handleNavigate(todolist.id)}>
            <h2 className={s.todoTitle}>{todolist.title}</h2>
            <div className={s.dataInfo}>
              <span>
                Начало проекта: <span>{formatDate(todolist.addedDate)}</span>
              </span>
              <span>
                Окончание проекта: <span>{formatDate(todolist.endDate) === '' ? 'дата не указана' : formatDate(todolist.endDate)}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
