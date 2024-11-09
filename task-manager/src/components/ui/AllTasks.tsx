import { useState } from "react";
import { useTaskStore } from "@/app/store/TaskStore";
import { TaskProps, TaskStatus } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { EditTaskModal } from "./EditTaskSubView";

export const AllTasks = () => {
  const { tasks, deleteTask, updateTask } = useTaskStore();

  const statuses = ["All", "Pending", "In-Progress", "Completed", "Archived"];
  const epics = ["All", "Getting a Puppy", "01"]; // You might want to fetch these from your epic store

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedEpic, setSelectedEpic] = useState("All");

  const [editingTask, setEditingTask] = useState<TaskProps | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = selectedStatus === "All" || task.status === selectedStatus;
    const epicMatch = selectedEpic === "All" || task.epic === selectedEpic;
    return statusMatch && epicMatch;
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status: {selectedStatus}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Epic: {selectedEpic}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {epics.map((epic) => (
              <DropdownMenuItem
                key={epic}
                onClick={() => setSelectedEpic(epic)}
              >
                {epic}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onUpdate={updateTask}
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
        />
      )}

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow w-[75%]"
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
          <p className="text-gray-500 text-xs mt-1">Status: {task.status}</p>
          {task.epic && (
            <p className="text-gray-500 text-xs mt-1">Epic: {task.epic}</p>
          )}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setEditingTask(task);
                setIsEditModalOpen(true);
              }}
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