'use client';

import { TaskCard } from "@/components/ui/TaskCard"
import { useTaskStore } from "@/app/store/TaskStore";
import { Droppable } from '@hello-pangea/dnd';
import { TaskProps, TaskStatus } from "@/types/types";

type TaskListProps = {
  byStatus: string;
  bgColor?: string;
}

interface AllTasksProps {
  tasks: TaskProps[];
  onStatusChange: (taskId: number, newStatus: string) => void;
  onDelete: (taskId: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ byStatus, bgColor = 'bg-gray-200' }) => {
  const { tasks, createTask, deleteTask, updateTask, updateTaskStatus } = useTaskStore()

  const tasksOfThisStatus = tasks.filter(task => task.status === byStatus)

  return (
    <div className={`h-fit flex-col my-2 ${bgColor} p-4 rounded-2xl min-w-[18rem] max-w-[18rem]`}>
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

export const AllTasks = () => {
  const { tasks, deleteTask, updateTask } = useTaskStore();

  return (
    <div className="flex flex-col gap-4 p-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
          <p className="text-gray-500 text-xs mt-1">Status: {task.status}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => updateTask(task.id, task)}
              className="text-blue-500 text-sm"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
