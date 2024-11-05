import { create } from 'zustand'
import type { TaskProps, TaskStatus } from '@/types/types'
import { dummyTasks } from '@/lib/utils/dummyData'

type TaskState = {
  tasks: TaskProps[]
  createTask: (task: TaskProps) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updatedTaskData: TaskProps) => void;
  updateTaskStatus: (taskId: string, newTaskStatus: TaskStatus) => void;
}

export const TaskStore = create<TaskState>((set) => ({
  tasks: dummyTasks,  // Initialize empty array
  createTask: (task: TaskProps) => set(
    (state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (taskId: string) => set(
    (state) => ({ tasks: state.tasks.filter(task => task.id !== taskId) })),
  updateTask: (taskId: string, updatedTaskData: TaskProps) => set(
    (state) => ({ tasks: state.tasks.map(
      (task) => (task.id === taskId ? updatedTaskData : task)) })),
  updateTaskStatus: (taskId: string, newTaskStatus: TaskStatus) => set(
    (state) => ({ tasks: state.tasks.map(
      (task) => (task.id === taskId ? { ...task, status: newTaskStatus } : task)) }))
}));