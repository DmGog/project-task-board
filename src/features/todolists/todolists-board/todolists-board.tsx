import { Card, Typography } from 'antd';
import { useGetTodoListsQuery } from '@/features';
import { formatDate } from '@/shared';
import s from './todolists-board.module.scss';
import { PATH } from '@/app';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

export const TodolistsBoard = () => {
  const { data: todolists } = useGetTodoListsQuery();
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(PATH.TODOLIST_BOARD_PAGE.replace(':id', id));
  };

  return (
    <Card title="Мои проекты" className={s.cardWrapper}>
      {todolists?.map(todolist => (
        <Card.Grid key={todolist.id} className={s.gridStyle} onClick={() => handleNavigate(todolist.id)}>
          <Title>{todolist.title}</Title>
          <Text>Начало проекта: </Text>
          <Text>{formatDate(todolist.addedDate)}</Text>
          <Text>Окончание проекта: </Text>
          <Text>{formatDate(todolist.endDate) === '' ? 'дата не указана' : formatDate(todolist.endDate)}</Text>
        </Card.Grid>
      ))}
    </Card>
  );
};
