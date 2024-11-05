'use client';

import { TaskCard } from "@/components/ui/TaskCard"
import { taskStore } from "@/app/store/TaskStore";

type TaskListProps = {
  byStatus: string;
  bgColor?: string;
}

export const TaskList: React.FC<TaskListProps> = ({ byStatus, bgColor = 'bg-gray-200' }) => {
  const { tasks, deleteTask, updateTask } = taskStore()

  const tasksOfThisStatus = tasks.filter(task => task.status === byStatus)

  return (
    <div className={`flex-1 flex-col mx-2 my-2 ${bgColor} p-4 rounded-2xl`}>
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