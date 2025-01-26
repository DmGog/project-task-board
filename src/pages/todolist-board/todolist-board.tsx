import { Card, ItemForm } from '@/shared';
import s from './todolist-board.module.scss';
import { useParams } from 'react-router';
import { Task, useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery } from '@/features/tasks';
import { useState } from 'react';

export const TodolistBoard = () => {
  const { id } = useParams();
  const { data: tasks } = useGetTasksQuery(id ?? '');
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [showItemForm, setItemForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    description: '',
  });
  console.log(tasks);
  const groupTasksByStatus = (status: number) => tasks?.filter(task => task.status === status);
  const handleClickAdd = () => {
    setItemForm(true);
  };

  const handleClickCancel = () => {
    setItemForm(false);
    setFormData({ startDate: '', endDate: '', description: '' });
  };

  const handleDeleteTasks = async (id: string) => {
    const tasksToDelete = groupTasksByStatus(3) || [];
    for (const task of tasksToDelete) {
      try {
        await deleteTask({ id, taskId: task.id });
      } catch (error) {
        console.error(error);
      }
    }
  };

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

  return (
    <div className={s.todolistBoard}>
      <Card iconVariant="happy" title="To Do" buttonVariant="textButton" onClick={handleClickAdd}>
        {showItemForm && (
          <ItemForm
            onClickDone={() => handleAddTask(id ?? '')}
            onClickCancel={handleClickCancel}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {groupTasksByStatus(0)?.map(task => (
          <Task key={task.id} title={task.title} startDate={task.startDate} endDate={task.deadline} status={task.status} />
        ))}
      </Card>
      <Card iconVariant="smile" title="In Progress">
        {groupTasksByStatus(1)?.map(task => (
          <Task key={task.id} title={task.title} startDate={task.startDate} endDate={task.deadline} status={task.status} />
        ))}
      </Card>
      <Card iconVariant="upside" title="Review">
        {groupTasksByStatus(2)?.map(task => (
          <Task key={task.id} title={task.title} startDate={task.startDate} endDate={task.deadline} status={task.status} />
        ))}
      </Card>
      <Card iconVariant="ghost" title="Done" buttonVariant="iconButton" onClick={() => handleDeleteTasks(id ?? '')}>
        {groupTasksByStatus(3)?.map(task => (
          <Task key={task.id} title={task.title} startDate={task.startDate} endDate={task.deadline} status={task.status} />
        ))}
      </Card>
    </div>
  );
};
