import { create } from 'zustand'
import type { TaskProps, TaskStatus } from '@/types/types'
import { dummyTasks } from '@/lib/utils/dummyData'

export type TaskState = {
  tasks: TaskProps[]
  createTask: (task: TaskProps) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updatedTaskData: TaskProps) => void;
  updateTaskStatus: (taskId: string, newTaskStatus: TaskStatus) => void;
}

export const taskStore = create<TaskState>((set) => ({
  tasks: dummyTasks,  // dummy array
  createTask: (task: TaskProps) => set(
    (state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (taskId: string) => set(
    (state) => ({ tasks: state.tasks.filter(task => task.id !== taskId) })),
  updateTask: (taskId: string, updatedTask: TaskProps) => set(
    (state) => {
      console.log('Updating task:', { taskId, updatedTask, currentTasks: state.tasks });
      return { 
        tasks: state.tasks.map(task => (task.id === taskId ? updatedTask : task))
      };
    }),
  updateTaskStatus: (taskId: string, newTaskStatus: TaskStatus) => set(
    (state) => ({ tasks: state.tasks.map(
      (task) => (task.id === taskId ? { ...task, status: newTaskStatus } : task)) }))
}));