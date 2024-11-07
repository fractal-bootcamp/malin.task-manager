'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskList } from "@/components/ui/TaskList";
import { useTaskStore } from "@/app/store/TaskStore";
import { TaskStatus } from '@/types/types';

export function DragDropTaskList() {
  const { updateTask, tasks } = useTaskStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    const task = tasks.find(t => t.id === draggableId);
    if (!task) return;

    const newStatus = destination.droppableId as TaskStatus;

    updateTask(draggableId, {
      ...task,
      status: newStatus
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full flex">
        <div className="w-[80%] flex space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-4 2xl:space-x-20">
          <TaskList byStatus="Pending" bgColor="bg-blue-100" />
          <TaskList byStatus="In-Progress" bgColor="bg-indigo-100" />
          <TaskList byStatus="Completed" bgColor="bg-purple-100" />
          <TaskList byStatus="Archived" bgColor="bg-violet-100 opacity-40" />
        </div>
      </div>
    </DragDropContext>
  );
}