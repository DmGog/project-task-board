import { useParams } from 'react-router';
import { TaskResponse, useGetTasksQuery, useUpdateTaskMutation } from '@/features';
import { Column, ColumnType } from '@/widgets';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import s from './todolist-board.module.scss';

const COLUMNS: ColumnType[] = [
  {
    id: 0,
    title: 'To Do',
    iconVariant: 'happy',
    buttonVariant: 'textButton',
  },
  { id: 1, title: 'In Progress', iconVariant: 'smile' },
  { id: 2, title: 'Review', iconVariant: 'upside' },
  {
    id: 3,
    title: 'Done',
    iconVariant: 'ghost',
    buttonVariant: 'iconButton',
  },
];

export const TodolistBoard = () => {
  const { id } = useParams();
  const { data: tasks } = useGetTasksQuery(id ?? '');
  const [updateTask] = useUpdateTaskMutation();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskResponse['status'];

    console.log(taskId, newStatus);

    const task = tasks?.find(t => t.id === taskId);
    if (!task) return;
    await updateTask({
      id,
      taskId: task.id,
      title: task.title,
      startDate: task.startDate,
      deadline: task.deadline,
      status: newStatus,
    });
  };

  return (
    <div className={s.todolistBoard}>
      <div className={s.wrapperColumns}>
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map(column => {
            return (
              <Column
                column={column}
                tasks={tasks?.filter(task => task.status === column.id) || []}
                key={column.id}
                todolistId={id ?? ''}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};
