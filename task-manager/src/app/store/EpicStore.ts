import { create } from 'zustand'
import { Epic, Epics, EpicStore, Task } from '@/types/schemas';
import { dummyTasks } from '@/lib/utils/dummyData'
import { createId } from '@paralleldrive/cuid2';
import { useTaskStore } from './TaskStore';

const dummyEpics: Epics = [
  {id: "01",
  description: "the first epic",
  tasks: [dummyTasks[0].id, dummyTasks[1].id, dummyTasks[2].id]
},
{id: "02",
  description: "the second epic",
  tasks: [dummyTasks[3].id, dummyTasks[4].id, dummyTasks[5].id]
}]

export const useEpicStore = create<EpicStore>((set, get) => ({
  epics: dummyEpics,
  createEpic: (epicData) => {
    const newId = createId();
    const { updateTask, tasks } = useTaskStore.getState();
    
    epicData.tasks.forEach(taskId => {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        updateTask(taskId, {
          ...task,
          epic: newId
        });
      }
    });

    set((state) => ({ 
      ...state,
      epics: [...state.epics, {
        ...epicData,
        id: newId
      }]
    }));
  },
  deleteEpic: ({ id }) => {
    const { updateTask, tasks } = useTaskStore.getState();
    const epicToDelete = get().epics.find(epic => epic.id === id);
    
    if (epicToDelete) {
      epicToDelete.tasks.forEach(taskId => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          updateTask(taskId, {
            ...task,
            epic: undefined
          });
        }
      });
    }

    set((state) => ({ 
      ...state,
      epics: state.epics.filter(epic => epic.id !== id) 
    }));
  },
  addTaskToEpic: ({ id: epicId }, { id: taskId }) => {
    const { updateTask, tasks } = useTaskStore.getState();
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
      updateTask(taskId, {
        ...task,
        epic: epicId
      });
    }

    set((state) => ({
      ...state,
      epics: state.epics.map(epic => 
        epic.id === epicId 
          ? { ...epic, tasks: [...epic.tasks, taskId] }
          : epic
      )
    }));
  },
  removeTaskFromEpic: ({ id: epicId }, { id: taskId }) => {
    const { updateTask, tasks } = useTaskStore.getState();
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
      updateTask(taskId, {
        ...task,
        epic: undefined
      });
    }

    set((state) => ({
      ...state,
      epics: state.epics.map(epic =>
        epic.id === epicId
          ? { ...epic, tasks: epic.tasks.filter(id => id !== taskId) }
          : epic
      )
    }));
  },
  isCreateModalOpen: false,
  setCreateModalOpen: (open) => set((state) => ({ 
    ...state,
    isCreateModalOpen: open 
  })),
}));