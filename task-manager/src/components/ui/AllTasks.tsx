import { useState } from "react";
import { useTaskStore } from "@/app/store/TaskStore";
import { TaskProps, TaskStatus } from "@/types/schemas";
import { dummyEpics } from "@/app/store/EpicStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { EditTaskModal } from "./EditTaskSubView";
import { CreateNewEpicModal } from "./CreateEpicModal";
import { useEpicStore } from "@/app/store/EpicStore";

export const AllTasks = () => {
  const { tasks, deleteTask, updateTask } = useTaskStore();
  const { setCreateModalOpen, epics } = useEpicStore();

  const statuses = ["All", "Pending", "In-Progress", "Completed", "Archived"];
  const epicDescriptions = ["All", ...epics.map(epic => epic.description)];

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
    <div className="flex flex-col gap-4 p-4 w-[75%]">
      <div className="flex justify-between">
        <div className="flex gap-4 mb-4">
          {/* Status Dropdown */}
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

          {/* Epic Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Epic: {selectedEpic === "All" ? "All" : epics.find(epic => epic.id === selectedEpic)?.description}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                key="all"
                onClick={() => setSelectedEpic("All")}
              >
                All
              </DropdownMenuItem>
              {epics.map((epic) => (
                <DropdownMenuItem
                  key={epic.id}
                  onClick={() => setSelectedEpic(epic.id)}
                >
                  {epic.description}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 bg-rose-100 text-gray-500"
            onClick={() => setCreateModalOpen(true)}
          >
            Create Epic
          </Button>
        </div>
      </div>

      <CreateNewEpicModal />

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
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
          <p className="text-gray-500 text-xs mt-1">Status: {task.status}</p>
          {task.epic && (
            <p className="text-gray-500 text-xs mt-1">Epic:
              {
                epics.find(epic => epic.id === task.epic)?.description
              }
            </p>
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