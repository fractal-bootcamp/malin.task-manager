export type TaskStatus = 'Pending' | 'In-Progress' | 'Completed' | 'Archived';

export type TaskProps = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  // createdAt: Date;
  // updatedAt: Date;
  //dueDate: Date | null;
}

export type TaskCardProps = {
  task: TaskProps
  title: string;
  description: string;
  status: TaskStatus;
  id: string;  // new prop needed for draggable
  index: number;  // new prop needed for draggable
  onEdit: () => void;
  onDelete: () => void;
  onUpdate: (taskId: string, updatedTask: TaskProps) => void;
  onUpdateStatus: (newStatus: TaskStatus) => void;
}

export type CreateTaskCard = {
  title: string;
  description: string;
  status: TaskStatus;
  id: string;  // new prop needed for draggable
  onCreate: (newTask: Omit<TaskProps, 'id'>) => void;
}