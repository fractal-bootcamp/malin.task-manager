import { create } from 'zustand'
import { Epic, Epics, EpicStore } from '@/types/schemas';
import { dummyTasks } from '@/lib/utils/dummyData'
import { createId } from '@paralleldrive/cuid2';
import { z } from "zod"

const dummyEpics: Epics = [
  {id: "01",
  description: "the first epic",
  tasks: [dummyTasks[0].id, dummyTasks[1].id, dummyTasks[2].id]
},
{id: "02",
  description: "the second epic",
  tasks: [dummyTasks[3].id, dummyTasks[4].id, dummyTasks[5].id]
}]

export const useEpicStore = create<EpicStore>((set) => ({
  epics: dummyEpics,
  createEpic: (epicData) => set((state) => ({ 
    epics: [...state.epics, {
      ...epicData,
      id: createId()
    }]
  })),
  deleteEpic: ({ id }) => set((state) => ({ 
    epics: state.epics.filter(epic => epic.id !== id) 
  })),
  addTaskToEpic: ({ id: epicId }, { id: taskId }) => set((state) => ({
    epics: state.epics.map(epic => 
      epic.id === epicId 
        ? { ...epic, tasks: [...epic.tasks, taskId] }
        : epic
    )
  })),
  removeTaskFromEpic: ({ id: epicId }, { id: taskId }) => set((state) => ({
    epics: state.epics.map(epic =>
      epic.id === epicId
        ? { ...epic, tasks: epic.tasks.filter(id => id !== taskId) }
        : epic
    )
  }))
}));