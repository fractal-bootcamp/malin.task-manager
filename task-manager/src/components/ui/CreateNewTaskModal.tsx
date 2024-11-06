import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TaskProps, TaskStatus } from "@/types/types"
import { useTaskStore } from "@/app/store/TaskStore"
import type { TaskCardProps, CreateTaskCard } from "@/types/types";  // Import the type

export function CreateNewTaskModal() {  // Use the imported type

  const { createTask, isCreateModalOpen, setCreateModalOpen } = useTaskStore(); // Get modal state and setter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      title: (document.getElementById('title') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLTextAreaElement).value,
      status: (document.getElementById('status') as HTMLSelectElement).value as TaskStatus
    }
    createTask(newTask);
  }

  return (
    <Dialog
      open={isCreateModalOpen} // if open is true, modal is visible
      onOpenChange={setCreateModalOpen} // effectively calls setCreateModalOpen(false)
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Create a new task. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input id="title" defaultValue={""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                defaultValue={""}
                className="col-span-3 min-h-[100px] w-full text-sm rounded-md border border-input px-3 py-2" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select
                id="status"
                defaultValue={"Pending"}
                className="col-span-3 w-full rounded-md border border-input px-3 py-2"
              >
                <option value="Pending">Pending</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}