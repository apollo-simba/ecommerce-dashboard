"use client";
import React, { useState, useEffect } from 'react';
import TaskList from '@/app/components/TaskList';
import styles from '@/app/styles/Home.module.css'
import Task from '@/app/components/Task';

type Task = {
  id: number,
  title: string,
  description: string,
  dueDateTime: Date,
};

type TaskListProps = {
  tasks: Task[];
  removeTask: (id: number) => void;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [dueTime, setDueTime] = useState<string>('');
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const [count, setCount] = useState<number>(0);

  const addTask = (): void => {
    console.log("add button clicked")
    if (!title || !description || !dueDate || !dueTime) return;
    
    const dueDateTime = new Date(`${dueDate}T${dueTime}:00`);
      
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length, title, description, dueDateTime },
    ]);
    console.log(tasks)
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
    // localStorage.setItem('doc',JSON.stringify())
  };
  useEffect(() => {
    const reminders = tasks.map((task) => {
      const timeDiff = task.dueDateTime.getTime() - Date.now();
      console.log(`the result is ${task.dueDateTime.getTime()},${Date.now()}`);
      console.log(`the value ${completedTasks.has(task.id)}`);
      if (timeDiff > 0) {
        console.log("this content returned");
        return setTimeout(() => {
          alert(`Reminder: ${task.title} is due in 1 minute.`);
          },timeDiff - 6000);
       
    }


    console.log("the null");
      return null;
  });
    return () => {
      console.log("that content retrned");
      reminders.forEach((reminder) => {
      if (reminder) clearTimeout(reminder);
      });
    };

  },[tasks]);
    

  const removeTask = (id: number): void => {
    console.log("add clicked");
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <span className={styles.header}>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20240320180346/gfg(1).png"
          alt="GeeksforGeeks logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Task Reminder App</h1>
      </span>
      <input
        type="text"
        className={styles.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className={styles.input}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className={styles.input}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        type="time"
        className={styles.input}
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
      />
      <button onClick={addTask} className={styles.button}>
        Add Task
      </button>
      <TaskList
        tasks={tasks.sort((a, b) => a.dueDateTime.getTime() - b.dueDateTime.getTime())} removeTask={removeTask}
      />
    </div>
  );
}