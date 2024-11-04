import { create } from 'zustand'

type TaskState = {
  tite: string;
  description: string;
  state: 'pending' | 'in-progress' | 'completed' | 'archive';
}

export const PendingStore = create((set) => ({
  
}))


export const TaskStore = create<TaskState>((set) => ({
  
}))