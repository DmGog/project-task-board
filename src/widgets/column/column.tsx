import s from './column.module.scss';
import { ReactNode, useState } from 'react';
import HappyIcon from '@/shared/assets/icons/happy-alt.svg';
import SmileIcon from '@/shared/assets/icons/smile.svg';
import UpsideIcon from '@/shared/assets/icons/upside-down.svg';
import GhostIcon from '@/shared/assets/icons/ghost.svg';
import { Button, ItemForm } from '@/shared';
import { Task, TaskResponse, useCreateTaskMutation, useDeleteTaskMutation } from '@/features';
import { useDroppable } from '@dnd-kit/core';

export type IconColumns = 'happy' | 'smile' | 'upside' | 'ghost';

const iconMap: Record<IconColumns, ReactNode> = {
  happy: <HappyIcon />,
  smile: <SmileIcon />,
  upside: <UpsideIcon />,
  ghost: <GhostIcon />,
};

export type ColumnType = {
  id: number;
  title: string;
  iconVariant: IconColumns;
  buttonVariant?: 'iconButton' | 'textButton';
};

type Props = {
  column: ColumnType;
  tasks: TaskResponse[];
  todolistId: string;
};

export const Column = ({ column, tasks, todolistId }: Props) => {
  const { id, title, buttonVariant, iconVariant } = column;
  const { setNodeRef } = useDroppable({ id });
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [itemForm, setItemForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    description: '',
  });
  const handleAddTask = async (id: string) => {
    try {
      await createTask({
        id,
        order: 0,
        title: formData.description,
        startDate: new Date(formData.startDate).toISOString(),
        deadline: new Date(formData.endDate).toISOString(),
        status: 0,
        priority: 1,
        description: '',
      }).unwrap();
    } catch (error) {
      console.error('Failed to add task', error);
    } finally {
      setItemForm(false);
      setFormData({ startDate: '', endDate: '', description: '' });
    }
  };

  const handleDeleteTasks = async (id: string) => {
    const tasksToDelete = tasks?.filter(task => task.status === 3);
    for (const task of tasksToDelete) {
      try {
        await deleteTask({ id, taskId: task.id });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleClickCancel = () => {
    setItemForm(false);
    setFormData({ startDate: '', endDate: '', description: '' });
  };

  const handleClickAdd = () => {
    setItemForm(true);
  };
  return (
    <div className={s.card}>
      <div className={s.cardHeader}>
        <div className={s.titleWrapper}>
          {iconVariant && iconMap[iconVariant]}
          <h2 className={s.title}>{title}</h2>
        </div>
        {buttonVariant === 'iconButton' && (
          <Button onlyIcon variant="outlined" iconVariant="delete" onClick={() => handleDeleteTasks(todolistId)} />
        )}
        {buttonVariant === 'textButton' && <Button variant="outlined" onClick={handleClickAdd} title="+ Добавить" />}
      </div>
      <div className={s.containerCardChild} ref={setNodeRef}>
        {itemForm && (
          <ItemForm
            onClickDone={() => handleAddTask(todolistId)}
            onClickCancel={handleClickCancel}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {tasks?.map(t => {
          return <Task key={t.id} task={t} />;
        })}
      </div>
    </div>
  );
};
