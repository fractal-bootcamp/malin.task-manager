import { create } from 'zustand'
import type { TaskProps, TaskStatus } from '@/types/types'

type TaskState = {
  tasks: TaskProps[]
  createTask: (task: TaskProps) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, newTaskStatus: TaskStatus) => void;
}

export const TaskStore = create<TaskState>((set) => ({
  tasks: [],  // Initialize empty array
  createTask: (task: TaskProps) => 
    set((state) => ({ 
      tasks: [...state.tasks, task] 
    })),

}))