'use client';

import { TaskCard } from "@/components/ui/TaskCard"
import { useTaskStore } from "@/app/store/TaskStore";
import { Droppable } from '@hello-pangea/dnd';
import { TaskProps, TaskStatus } from "@/types/types";

type TaskListProps = {
  byStatus: string;
  bgColor?: string;
}

export const TaskList: React.FC<TaskListProps> = ({ byStatus, bgColor = 'bg-gray-200' }) => {
  const { tasks, createTask, deleteTask, updateTask, updateTaskStatus } = useTaskStore()

  console.log('All tasks in store:', tasks);
  const tasksOfThisStatus = tasks.filter(task => task.status === byStatus)
  console.log(`Tasks with status ${byStatus}:`, tasksOfThisStatus);

  return (
    <div className={`flex-1 flex-col  my-2 ${bgColor} p-4 rounded-2xl max-w-[18rem]`}>
      <p className="flex text-lg font-bold my-2 justify-start">{byStatus}</p>
      <Droppable droppableId={byStatus}>
        {(provided) => (
          <div
            className="flex flex-col space-y-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasksOfThisStatus.map((task, index) => (
              <TaskCard
                task={task}
                key={task.id}
                id={task.id}
                index={index}
                title={task.title}
                description={task.description}
                status={task.status}
                onEdit={() => updateTask(task.id, task)}
                onDelete={() => deleteTask(task.id)}
                onUpdate={(taskId: string, updatedTask: TaskProps) => updateTask(taskId, updatedTask)}
                onUpdateStatus={(newTaskStatus: TaskStatus) => updateTaskStatus(task.id, newTaskStatus)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}