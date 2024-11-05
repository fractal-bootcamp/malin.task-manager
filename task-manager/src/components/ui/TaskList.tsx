'use client';

import { TaskCard } from "@/components/ui/TaskCard"
import { taskStore } from "@/app/store/TaskStore";

type TaskListProps = {
  byStatus: string;
}

export const TaskList: React.FC<TaskListProps> = ({ byStatus }) => {
  const { tasks, deleteTask, updateTask } = taskStore()

  const tasksOfThisStatus = tasks.filter(task => task.status === byStatus)

  return (
    <div className="flex flex-col mx-4 my-2 bg-gray-200 p-4 rounded-2xl">
      <p className="flex text-lg font-bold my-2 justify-start">{byStatus}</p>
      <div className="flex flex-col space-y-4">
        {tasksOfThisStatus.map(task => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            onEdit={() => updateTask(task.id, task)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </div>

  )
}