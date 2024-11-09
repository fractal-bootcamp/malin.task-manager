'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskList } from "@/components/ui/TaskList";
import { useTaskStore } from "@/app/store/TaskStore";
import { TaskStatus } from '@/types/schemas';

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
        <div className="w-[75%] grid grid-cols-3 gap-4">
          <TaskList byStatus="Pending" bgColor="bg-blue-100" />
          <TaskList byStatus="In-Progress" bgColor="bg-indigo-100" />
          <TaskList byStatus="Completed" bgColor="bg-purple-100" />
        </div>
      </div>
    </DragDropContext>
  );
}