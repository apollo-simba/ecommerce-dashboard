import React from 'react';
import styles from '../styles/Home.module.css';

type TaskType = {
  id: number;
  title: string;
  description: string;
  dueDateTime: Date;
};

type TaskProps = {
  task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  const { title, description, dueDateTime } = task;

  return (
    <div className={styles.task}>
      <h2 className={styles.taskTitle}>{title}</h2>
      <p className={styles.taskDescription}>{description}</p>
      <p className={styles.taskDue}>Due Date: {dueDateTime.toLocaleString()}</p>
    </div>
  );
};

export default Task;