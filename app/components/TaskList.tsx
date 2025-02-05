import React from 'react';
import Task from './Task';

type TaskType = {
  id: number;
  title: string;
  description: string;
  dueDateTime: Date;
};

type TaskListProps = {
  tasks: TaskType[];
  removeTask: (id: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, removeTask }) => {
  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <Task task={task} />
          {<button onClick={() => removeTask(task.id)}>Removetask</button>}
        </div>

      ))}
    </div>
  );
};

export default TaskList;
