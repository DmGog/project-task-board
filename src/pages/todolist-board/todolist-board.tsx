import { Card } from '@/shared';
import s from './tasks-board.module.scss';
import { useParams } from 'react-router';
import { Task, useCreateTaskMutation, useGetTasksQuery } from '@/features/tasks';

export const TodolistBoard = () => {
  const { id } = useParams();
  const { data: tasks } = useGetTasksQuery(id ?? '');
  const [createTask] = useCreateTaskMutation();

  console.log(tasks);
  const groupTasksByStatus = (status: number) => tasks?.filter(task => task.status === status);

  const handleAddTask = async (id: string) => {
    try {
      await createTask({
        id,
        order: 0,
        title: 'new task',
        startDate: new Date().toISOString(),
        deadline: new Date().toISOString(),
        status: 3,
        priority: 1,
        description: 'Task description',
      }).unwrap();
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  return (
    <div className={s.todolistBoard}>
      <Card iconVariant="happy" title="To Do" buttonVariant="textButton" onClick={() => handleAddTask(id ?? '')}>
        {groupTasksByStatus(0)?.map(task => (
          <Task key={task.id} title={task.title} startDate={task.startDate} endDate={task.addedDate} status={task.status} />
        ))}
      </Card>
      <Card iconVariant="smile" title="In Progress">
        {groupTasksByStatus(1)?.map(task => (
          <Task key={task.id} title={task.title} startDate={task.startDate} endDate={task.addedDate} status={task.status} />
        ))}
      </Card>
      <Card iconVariant="upside" title="Review">
        {groupTasksByStatus(2)?.map(task => (
          <Task key={task.id} title={task.title} startDate={task.startDate} endDate={task.addedDate} status={task.status} />
        ))}
      </Card>
      <Card iconVariant="ghost" title="Done" buttonVariant="iconButton">
        {groupTasksByStatus(3)?.map(task => (
          <Task key={task.id} title={task.title} startDate={task.startDate} endDate={task.addedDate} status={task.status} />
        ))}
      </Card>
    </div>
  );
};
