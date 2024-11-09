import { create } from 'zustand'
import type { TaskProps, TaskStatus } from '@/types/types'
import { Epic, Epics, EpicStore, Task } from '@/types/schemas';
import { dummyTasks } from '@/lib/utils/dummyData'
import { createId } from '@paralleldrive/cuid2';
import { z } from "zod"

interface TaskStore {
  tasks: Task[]
  createTask: (taskData: Omit<TaskProps, 'id'>) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updatedTaskData: TaskProps) => void;
  updateTaskStatus: (taskId: string, newTaskStatus: TaskStatus) => void;
  isCreateModalOpen: boolean; // Tracks if modal is visible (true) or hidden (false)
  setCreateModalOpen: (open: boolean) => void; // Function to change modal visibility
}

export const useTaskStore = create<TaskStore>((set) => ({
  // task related actions
  tasks: dummyTasks,
  createTask: (taskData: Omit<TaskProps, 'id'>) => set(
    (state) => ({ 
      tasks: [...state.tasks, {
        ...taskData,
        id: createId()
      }]
    })),
  deleteTask: (taskId: string) => set(
    (state) => ({ tasks: state.tasks.filter(task => task.id !== taskId) })),
  updateTask: (taskId: string, updatedTask: TaskProps) => set(
    (state) => ({
      tasks: state.tasks.map(task => (task.id === taskId ? updatedTask : task))
    })),
  updateTaskStatus: (taskId: string, newTaskStatus: TaskStatus) => set(
    (state) => ({ 
      tasks: state.tasks.map(
        (task) => (task.id === taskId ? { ...task, status: newTaskStatus } : task)
      ) 
    })),
  isCreateModalOpen: false, // Modal is closed by default
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }), //Update the state of the modal
}));